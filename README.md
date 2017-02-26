# VexDB

Install this package with:

    npm install vexdb

or, if you want to use yarn:

    yarn install vexdb

## Usage
When you `require` the package, you can see the following functions exposed:

    /**
     * @method request
     * Makes a reqest to the vexDB API
     * @method vexdb
     * @param  {String} endpoint The endpoint to request, must be events, teams, matches, rankings, season_rankings, awards, or skills
     * @param  {Object} params   Any URL parameters to specify, in Object form. See the relevant API docs page for more info
     * @return {Promise}
     */
     function request (endpoint, params);


     /**
      * @method get
      * GETs an endpoint based on parameters and resolves the result
      * @method get
      * @param  {String} endpoint The endpoint to GET
      * @param  {Object} params   An object of parameters
      * @return {Promise}
      */
     function get (endpoint, params);


     /**
      * Gets the size of an endpoint with parameters. It performs a nodata request and resolves the number of results
      * @method size
      * @param  {String} endpoint The endpoint to get the size of
      * @param  {Object} params   Any criteria to specify on the endpoint, see relevant vexDB documentation page
      * @return {Promise}
      */
     function size (endpoint, params);
