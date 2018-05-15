const constants = require("./constants");
const cache = require("./cache");
require("isomorphic-fetch");

async function request(endpoint, params = {}) {
  if (await cache.has(endpoint, params)) return cache.resolve(endpoint, params);

  let data = await fetch(
    `${constants.settings.baseURL}/get_${cache.sanitize(endpoint, params)}`,
    {
      headers: constants.settings.headers
    }
  ).then(data => data.json());

  if (data.status) {
    cache(endpoint, params, data);
    return data;
  } else {
    return Promise.reject(Promise.reject(new Error(data.error_text)));
  }
}

async function requestSize(endpoint, params) {
  return request(endpoint, Object.assign({}, params, { nodata: true })).then(
    res => res.size
  );
}

async function requestAll(endpoint, params) {
  // If we're getting a single item, no need to request size
  if (
    Object.keys(params).includes(constants.uniques) &&
    typeof params[constants.uniques] == "string"
  )
    return Promise.all([request(endpoint, params)]);

  return requestSize(endpoint, params)
    .then(items =>
      Promise.all(
        Array(Math.ceil(items / 5000))
          .fill({})
          .map((v, i) =>
            request(
              endpoint,
              Object.assign(params || {}, {
                limit_start: 5000 * i
              })
            )
          )
      )
    )
    .then(result => ({
      status: result[0].status,
      size: result.map(a => a.size).reduce((a, b) => a),
      result: result.map(a => a.result).reduce((a, b) => a.concat(b), [])
    }));
}

function paramSort(params, endpoint) {
  let out = {
    universal: {},
    filters: {},
    permutations: {}
  };

  for (let param in params) {
    if (params.hasOwnProperty(param)) {
      let value = params[param];

      // Applied on the request
      if (
        typeof value === "string" &&
        constants.validParams[endpoint].includes(param)
      ) {
        out.universal[param] = value;
      } else if (
        value instanceof Array &&
        constants.validParams[endpoint].includes(param)
      ) {
        out.permutations[param] = value;
      } else if (value instanceof RegExp) {
        out.filters[param] = (val, obj) => value.test(val);
      } else if (value instanceof Array) {
        out.filters[param] = (val, obj) => value.includes(val);
      } else if (value instanceof Function) {
        out.filters[param] = value;
      } else {
        out.filters[param] = (val, obj) => val == value;
      }
    }
  }

  return out;
}

async function filter(arr, callback) {
  return (await Promise.all(
    arr.map(async item => {
      return (await callback(item)) ? item : undefined;
    })
  )).filter(i => i !== undefined);
}

/**
 * Given a base object and possible permutations, returns the array of all possible values
 * @param {Object} base The base object to work with
 * @param {Object} permutations The permutations to apply
 */
function permutationObject(base, permutations) {
  let lengths = Object.values(permutations).map(a => a.length),
    sizes = [...Array(Object.keys(permutations).length + 1)].map((a, i) =>
      lengths.slice(i).reduce((a, b) => a * b, 1)
    );

  return [...Array(sizes[0])]
    .map((a, i) =>
      sizes
        .slice(1) // Skip the first size, which is just for the structure
        .map(
        cost => (
          (out = Math.floor(i / cost)), // Given our currently available resources, which one can we access? Flooring to ensure we never pass nodes we can't
          (i -= cost * out), // Lose the number of passed nodes
          out
        )
        )
    )
    .map(path =>
      path
        .map((t, i) => ({
          [Object.keys(permutations)[i]]: Object.values(permutations)[i][t]
        }))
        .reduce((a, b) => Object.assign({}, a, b), base)
    );
}

/**
 * Performs a request to the specified endpoint, and resolves the result
 * @param {String} endpoint The endpoint to get
 * @param {Object} params Parameters, see documentation for more information
 *
 */
async function get(endpoint, params) {
  if (!constants.endpoints.includes(endpoint))
    return Promise.reject(
      new RangeError(
        `Endpoint ${endpoint} not know. Valid endpoints are ${constants.endpoints.join(
          ", "
        )}`
      )
    );
  params = Object.assign({}, constants.settings.params, params); // Assign defaults

  // Passed parameters fall into three categories: (1) ones we can pass directly to the request, (2) ones that need to be filtered afterwards, (3) ones that can be satisfied with extra requests
  // We need to sort these, make the extra requests, and do afterwards filtering

  let { universal, filters, permutations } = paramSort(params, endpoint);

  let req = (await Promise.all(
    permutationObject(universal, permutations).map(p =>
      requestAll(endpoint, p).then(data => data.result)
    )
  )).reduce((a, b) => a.concat(b), []); // Combine into unique array

  let keys = req.map(e => JSON.stringify(e));
  return filter(
    req.filter((e, i, a) => keys.indexOf(JSON.stringify(e)) === i), // Uniqify
    async item =>
      (await Promise.all(
        Object.keys(filters).map(key => filters[key](item[key], item))
      )).every(a => a)
  );
}

/**
 * Resolves the number items that fit the specified request (saves data)
 * @param {String} endpoint Endpoint
 * @param {Object} params Parameters, see documentation for more information
 */
async function size(endpoint, params) {
  let { universal, filters, permutations } = paramSort(params, endpoint);

  // If we have post-request filters, then we need to get all the values
  if (Object.values(filters).length > 0) {
    return get(endpoint, params).then(res => res.length);
    // Otherwise, we can stick nodata on everything
  } else {
    return (await Promise.all(
      permutationObject(universal, permutations).map(p =>
        requestSize(endpoint, Object.assign({}, constants.settings.params, p))
      )
    )).reduce((a, b) => a + b, 0); // Sum
  }
}

module.exports = {
  get,
  size,
  request,
  requestAll,
  permutationObject
};
