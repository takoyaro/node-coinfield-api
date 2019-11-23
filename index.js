/* ============================================================
 * node-coinfield-api
 * https://github.com/takoyaro/node-coinfield-api
 * ============================================================
 * Released under the MIT License by Takoyaro
 * ============================================================ */

/**
 * Node Coinfield API
 * @module node-coinfield-api
 * @return {object} instance to class object
 */

 let api = function Coinfield() {

   let Coinfield = this;

   const request = require('request');
   const base = 'https://api.coinfield.com/v1/';
   const default_options = {
        verbose: false
    };
    Coinfield.options = default_options;

    return {

      /**
       * Gets the status of the server
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      status: function(callback = false){
        request(`${base}status`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          callback(JSON.parse(body));
        });
      },

      /**
       * Gets the timestamp of the server
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      timestamp: function(callback = false){
        request(`${base}timestamp`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          callback(JSON.parse(body));
        });
      },

      /**
       * Gets the details of a given symbol(s)
       * @param {(string|string[])} [symbol = null] - the symbol or an array of symbols
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      currencies: function(symbol = null, callback = false){
        if (typeof symbol === 'function') callback = symbol; // backwards compatibility
        request(`${base}currencies`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          let obj = JSON.parse(body);
          if(typeof symbol === 'function'){
            callback(obj)
          }
          else if(typeof symbol === 'string'){
            let result = obj.currencies.find(function(cur){ return cur["id"] === symbol.toLowerCase()});
            callback(result);
          }
          else if(Array.isArray(symbol)){
            let result = [];
            symbol.forEach(symbols=>{
              result.push(obj.currencies.find(function(cur){ return cur["id"] === symbols.toLowerCase()}));
            })
            callback(result);
          }
        });
      },

      /**
       * Get all available markets
       * @param {(string|string[])} [market = null] - the market or an array of markets
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      markets: function(market = null, callback = false){
        if (typeof market === 'function') callback = market; // backwards compatibility
        request(`${base}markets`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          let obj = JSON.parse(body);
          if(typeof market === 'function'){
            callback(obj)
          }
          else if(typeof market === 'string'){
            let result = obj.markets.find(function(marketObj){ return marketObj.id === market.toLowerCase()});
            callback(result);
          }
          else if(Array.isArray(market)){
            let result = [];
            market.forEach(markets=>{
              result.push(obj.markets.find(function(marketObj){ return marketObj.id === markets.toLowerCase()}));
            })
            callback(result);
          }
        });
      },

      /**
       * Get all available markets
       * @param {string} [market = null] - the market or an array of markets
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      tickers: function(market = null, callback = false){
        if (typeof market === 'function') callback = market;
        request(`${base}tickers/${(typeof market === 'string') ? market : ''}`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          let obj = JSON.parse(body);
          callback(obj)
        });
      },

      /**
       * Get orderbook for a specific market
       * @param {string} market - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {(integer|string)} [limit = null] - Number of asks and bids array
       * @param {function} callback - The callback function
       * @return {undefined}
       */
      orderbook: function(market, limit=null, callback = false){
        if (typeof market != 'string') throw Error("Market must be a string");
        if (typeof limit === 'function') callback = limit;
        request(`${base}orderbook/${market}?limit=${(typeof limit === 'function') ? '20' : limit}`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          let obj = JSON.parse(body);
          callback(obj)
        });
      },

      /**
       * Get depth for a specific market
       * @param {string} market - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {(integer|string)} [limit = null] - Limit the number of returned price levels.
       * @param {function} callback - The callback function
       * @return {undefined}
       */
      depth: function(market, limit=null, callback = false){
        if (typeof market != 'string') throw Error("Market must be a string");
        if (typeof limit === 'function') callback = limit;
        request(`${base}depth/${market}?limit=${(typeof limit === 'function') ? '20' : limit}`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          let obj = JSON.parse(body);
          callback(obj)
        });
      },

      /**
       * Get depth for a specific market
       * @param {string} market - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {Object[]} options - The employees who are responsible for the project.
       * @param {(integer|string)} options[].limit - Limit number of candles.
       * @param {(integer|string)} options[].period - Candle periods => Valid range: 1, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 4320, 10080
       * @param {(integer|string)} options[].from  - UNIX epoch timestamp of start time
       * @param {(integer|string)} options[].to - UNIX epoch timestamp of start time
       * @param {function} callback - The callback function
       * @return {undefined}
       */
      ohlc: function(market, options={}, callback = false){
        if (typeof market != 'string') throw Error("Market must be a string");
        if (typeof options === 'function') callback = options;
        request(`${base}ohlc/${market}?${('limit' in options) ? 'limit='+options.limit+'&' : ''}${('period' in options) ? 'period='+options.period+'&' : ''}${('from' in options) ? 'from='+options.from+'&' : ''}${('to' in options) ? 'to='+options.to+'&' : ''}`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          let obj = JSON.parse(body);
          callback(obj)
        });
      },

      /**
       * Get depth for a specific market
       * @param {string} market - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {Object[]} options - The employees who are responsible for the project.
       * @param {(integer|string)} options[].limit - Limit number of candles.
       * @param {(integer|string)} options[].timestamp - An integer represents the seconds elapsed since Unix epoch. If set, only trades executed before the time will be returned
       * @param {(integer|string)} options[].from  - Trade id. If set, only trades done after the specified trade id will be returned
       * @param {(integer|string)} options[].to - Trade id. If set, only trades done before the specified trade id will be returned
       * @param {string} options[].order_by - If set, trades will be sorted in specific order (desc, asc). Default: desc
       * @param {function} callback - The callback function
       * @return {undefined}
       */
      trades: function(market, options={}, callback = false){
        if (typeof market != 'string') throw Error("Market must be a string");
        if (typeof options === 'function') callback = options;
        request(`${base}trades/${market}?${('limit' in options) ? 'limit='+options.limit+'&' : ''}${('timestamp' in options) ? 'timestamp='+options.timestamp+'&' : ''}${('from' in options) ? 'from='+options.from+'&' : ''}${('to' in options) ? 'to='+options.to+'&' : ''}${('order_by' in options) ? 'order_by='+options.order_by : ''}`, function (error, response, body) {
          if(error!=null){
            throw Error(error);
          }
          let obj = JSON.parse(body);
          callback(obj)
        });
      },
    }
 }
 module.exports = api;
