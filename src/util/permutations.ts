import {
  Endpoint,
  RequestObject,
  validParams
} from "../constants/RequestObjects";

/**
 * Determines which requests need to be made given a set of parameters
 * Returns an array of parameter values. Note: this function should be applied
 * before all others, it merely passes on values it doesn't use
 * Does not handle post filtering
 * @param endpoint
 * @param params
 */
export default function permutations(
  endpoint: Endpoint,
  params: RequestObject
) {
  // First, we need to identify which parameters require extra requests.
  // A parameter which generates extra requests, must fulfill the following critera:
  // It must be an array of values that can be passed directly to VexDB
  const permutators = Object.keys(params).filter(
    key => validParams[endpoint].includes(key) && params[key] instanceof Array
  );

  // Now that we have the correct parameters, we need to figure out all permutations
  // lengths stores the number of options in each used key, it is used to calculate the request size
  // sizes represents a tree of permutations, where sizes[0] is the total number of permutations, and each subsequent item is the number of nodes on that row
  const lengths: number[] = permutators.map(key => params[key].length);
  const sizes = new Array(permutators.length + 1)
    .fill(0)
    .map((a, i) => lengths.slice(i).reduce((a, b) => a * b, 1));

  return (
    new Array(sizes[0])
      .fill({})
      .map((a, i) =>
        // Now we generate a "path" to traverse given our index, which is used as a resource measure
        // Basically, for each level of the sizes array, we pick the furthest size given current "resources"
        // Then we subtract for the next level of sizes.
        // Since sizes contains the exact number of permutators + 1, this will generate an array of paths (array of number)
        sizes
          .slice(1) // Skip the first size, which is a meta size (total number of permutations)
          .map(cost => {
            // Given our currently available resources, which one can we access? Flooring to ensure we never pass nodes we can't
            let path = Math.floor(i / cost);
            // Lose the number of passed nodes
            i -= cost * path;
            return path;
          })
      )
      // Now that we have generated our path, we need to use it to generate the appropriate object
      // Basically, go through each item in the path, and convert it to its corresponding key and value based on the current index
      .map(path =>
        path
          .map((t, i) => ({
            [permutators[i]]: Object.values(params)[i][t]
          }))
          .reduce((a, b) => Object.assign({}, a, b), params)
      )
  );
}
