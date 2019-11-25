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

 let api = function Coinfield(options) {

   let Coinfield = this;

   const request = require('request');
   const base = 'https://api.coinfield.com/v1/';
   const default_options = {
        verbose: false
    };
    Coinfield.options = Object.assign({}, default_options, options);
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
       * @param {(number|string)} [limit = null] - Number of asks and bids array
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
       * @param {(number|string)} [limit = null] - Limit the number of returned price levels.
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
       * @param {(number|string)} options[].limit - Limit number of candles.
       * @param {(number|string)} options[].period - Candle periods => Valid range: 1, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 4320, 10080
       * @param {(number|string)} options[].from  - UNIX epoch timestamp of start time
       * @param {(number|string)} options[].to - UNIX epoch timestamp of start time
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
       * @param {Object[]} options - The object of optional parameters
       * @param {(number|string)} options[].limit - Limit number of candles.
       * @param {(number|string)} options[].timestamp - An integer represents the seconds elapsed since Unix epoch. If set, only trades executed before the time will be returned
       * @param {(number|string)} options[].from  - Trade id. If set, only trades done after the specified trade id will be returned
       * @param {(number|string)} options[].to - Trade id. If set, only trades done before the specified trade id will be returned
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

      /****************************************
      *
      * PRIVATE CALLS
      * APIKEY key must be passed to Coinfield for these to work
      *
      ****************************************/

      /**
       * Get my account details
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      account: function(callback = false){
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}account`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get my wallets balances
       * @param {(string|string[])} [wallet = null] - a wallet currency or an array of wallets currency
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      wallets: function(wallets, callback = false){
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        if (typeof wallets === 'function') callback = wallets; // backwards compatibility
        request({
        url: `${base}wallets`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {

        let obj = JSON.parse(body);
        if(typeof wallets === 'function'){
          callback(obj)
        }
        else if(typeof wallets === 'string'){
          let result = obj.wallets.find(function(walletObj){ return walletObj.currency === wallets.toLowerCase()});
          callback(result);
        }
        else if(Array.isArray(wallets)){
          let result = [];
          wallets.forEach(wallet=>{
            result.push(obj.wallets.find(function(walletObj){ return walletObj.currency === wallet.toLowerCase()}));
          })
          callback(result);
        }
      });
      },

      /**
       * Get trading, withdrawal and deposit fees for your account for different currency and markets.
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      fees: function(callback = false){
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}fees`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Place a new order
       * @param {Object[]} params - The object of parameters required to place an order
       * @param {string} params[].market -Market in which to place an order
       * @param {string} options[].type - «bid» if you want to create buy order or «ask» if you want to create sell order
       * @param {string} options[].strategy - The strategy which defines how to match and execute orders. limit|market|stop_limit
       * @param {string} options[].volume - The amount you are willing to buy or sell
       * @param {string} options[].price - The price for each unit
       * @param {string} options[].funds - The amount of money you are willing to spend for purchase. Applicable only to bid market orders. The system will automatically calculate the volume based on the current exchange rates and the value of parameter.
       * @param {string} options[].stop_price - If the strategy is "stop_limit", this value is the price at which stop limit order will be triggered.
       * @param {string} options[].expiry - The time at which order cancellation will be automatically triggered. Applicable only to limit or stop limit orders.
       * @param {string} options[].immediate - If set to «true», limit order will be fully filled immediately or canceled if not possible to fill fully. Applicable only to limit or stop limit orders.
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      placeorder: function(params, callback = false){
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}order`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false,
        method: 'POST',
        form: params
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get order
       * @param {string|number} orderid  - Order ID
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      getorder: function(orderid, callback = false){
        if(typeof orderid === 'function') throw Error("Must pass an orderID");
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}order`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Cancel an order
       * @param {string} orderid  - Order ID
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      deleteorder: function(orderid, callback = false){
        if(typeof orderid === "function") throw Error("Must provide a (string|int) orderid.")
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}order/${orderid}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false,
        method: "DELETE"
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get your orders for a specific market
       * @param {string} market  - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {Object[]} options - The object of optional parameters to be passed
       * @param {number} options[].limit - Limit the number of returned trades - Default value: 50
       * @param {string} options[].state - Filter order by state, defaults to wait (active orders)
       * @param {number} options[].page - Page number of paginated results
       * @param {string} options[].order_by - If set, trades will be sorted in specific order (desc, asc) - Default value: desc
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      getorders: function(market, options=null, callback = false){
        if(typeof market === "function") throw Error("Must provide a (string) MarketID, ex: 'btcxrp'")
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        if(typeof options === "function") callback = options;
        request({
        url: `${base}orders/${market}?${('limit' in options) ? 'limit='+options.limit+'&' : ''}${('state' in options) ? 'state='+options.state+'&' : ''}${('page' in options) ? 'page='+options.page+'&' : ''}${('order_by' in options) ? 'order_by='+options.order_by : ''}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Cancel all your orders for a specific market and specific side (bid|ask)
       * @param {string} market  - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {string} side  - Side of the orders (ask|bid).
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      deleteorders: function(market, side, callback = false){
        if(typeof market === "function") throw Error("Must provide a (string) market identifier e.g. btcxrp")
        if(typeof side === "function") throw Error("Must provide a (string) side of orders to delete e.g. bid")
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}orders/${market}/side/${side}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false,
        method: "DELETE"
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get your trade history
       * @param {string} market  - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {Object[]} options - The object of optional parameters to be passed
       * @param {number} options[].limit - Limit the number of returned trades - Default value: 50
       * @param {number|string} options[].timestamp - An integer represents the seconds elapsed since Unix epoch. If set, only trades executed before the time will be returned
       * @param {number|string} options[].from - Trade id. If set, only trades done after the specified trade id will be returned
       * @param {number|string} options[].to - Trade id. If set, only trades done before the specified trade id will be returned
       * @param {string} options[].order_by - If set, trades will be sorted in specific order (desc, asc) - Default value: desc
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      tradehistory: function(market, options = null, callback = false){
        if(typeof market === "function") throw Error("Must provide a (string) market identifier e.g. btcxrp")
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        if(typeof options === "function") callback = options;
        request({
        url: `${base}trade-history/${market}?${('limit' in options) ? 'limit='+options.limit+'&' : ''}${('timestamp' in options) ? 'timestamp='+options.timestamp+'&' : ''}${('from' in options) ? 'from='+options.from+'&' : ''}${('to' in options) ? 'to='+options.to+'&' : ''}${('order_by' in options) ? 'order_by='+options.order_by : ''}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get wallet address for cryptocurrencies
       * @param {string} currency  - Currency (Cryptocurrency only) identifier e.g. btc or xrp.
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      depositaddresses: function(currency, callback = false){
        if(typeof currency === "function") throw Error("Must provide a valid currency identifier e.g.: btc");
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}deposit-addresses/${currency}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get your deposit history for cryptocurrencies or fiat
       * @param {Object[]} options - The object of optional parameters to be passed
       * @param {string} options[].currency - Currency identifier e.g. btc or cad. If not set all currencies will be returned
       * @param {number} options[].limit - Limit the number of returned deposits - Default value: 50
       * @param {string} options[].state - Filter results based on the state of the deposit. The following states for deposits are available: submitted, canceled, rejected, accepted
       * @param {string} options[].txid - Filter based on a specific transaction ID on the Blockchain. If this value is set, limit and state fields are ignored.
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      deposits: function(options, callback = false){
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        if(typeof options === "function") callback = options;
        request({
        url: `${base}deposits/${('currency' in options) ? options.currency+'?' : '?'}${('limit' in options) ? 'limit='+options.limit+'&' : ''}${('state' in options) ? 'state='+options.state+'&' : ''}${('txid' in options) ? 'txid='+options.txid : ''}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get withdrawal destination addresses for different currencies.
       * @param {string}currency - The currency for which you want withdrawal destination addresses
       * @param {Object[]} options - The object of optional parameters to be passed
       * @param {number} options[].per_page - Number of results per page
       * @param {string} options[].page - Page number
       * @param {string} options[].method - Filter by method, the following methods are available: wire, crypto
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      withdrawaladdresses: function(currency, options, callback = false){
        if(typeof currency === "function") throw Error("Must provide a valid (string) currency argument e.g.: btc")
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        if(typeof options === "function") callback = options;
        request({
        url: `${base}withdrawal-addresses/${currency}?${('per_page' in options) ? 'per_page='+options.per_page+'&' : ''}${('page' in options) ? 'page='+options.page+'&' : ''}${('method' in options) ? 'method='+options.method : ''}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * List all withdrawals
       * @param {string} currency  - Currency (Cryptocurrency only) identifier e.g. btc or xrp.
       * @param {Object[]} options - The object of optional parameters to be passed
       * @param {number} options[].limit - Limit the number of returned results.
       * @param {number} options[].page - Page number.
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      withdrawals: function(currency, callback = false){
        if(typeof currency === "function") throw Error("Must provide a valid currency identifier e.g.: btc");
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}withdrawals/${currency}?${('limit' in options) ? 'limit='+options.limit+'&' : ''}${('page' in options) ? 'page='+options.page : ''}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Submit a new withdrawal request for fiat or crypto
       * @param {Object[]} params - The object of parameters required to place an order
       * @param {string} params[].currency - Currency (Cryptocurrency only) identifier e.g. btc or xrp.
       * @param {string} params[].amount - Amount to be withdrawn
       * @param {string} params[].destination - Destination ID. Use withdrawal-destinations to create a new destination
       * @param {string} params[].otp - If OTP/2FA (Two Factor Authentication) is turned on, this value is required
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      makewithdrawal: function(params, callback = false){
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        request({
        url: `${base}withdrawals/${params.currency}`,
        headers: {
          'Authorization': `Bearer ${Coinfield.options.APIKEY}`
        },
        rejectUnauthorized: false,
        method: 'POST',
        form: params
      },
      function (error, response, body) {
        callback(JSON.parse(body));
      });
      },

      /**
       * Get all price alerts or by price-alert ID.
       * @param {Object[]} params - The object of parameters required to get/create/delete price-alerts
       * @param {string} params.action - get, create, update or delete
       * @param {string} params.alertID - Price Alert ID
       * @param {string} params.market - Market identifier in the format of "basequote" e.g. btcbch or btcxrp.
       * @param {string} params.price - Threshold
       * @param {string} params.trend - «up» or «down».
       * @param {boolean} params.active - «true» or «false».
       * @param {function} callback - the callback function
       * @return {undefined}
       */
      pricealerts: function(params = null, callback = false){
        if(typeof params !== 'object') throw Error("Must pass parameters object");
        if(!Coinfield.options.APIKEY) throw Error("Invalid API Key");
        if(typeof alertID === 'function') callback = alertID;
        let requestParams = {
          headers: {
            'Authorization': `Bearer ${Coinfield.options.APIKEY}`
          },
          rejectUnauthorized: false
        };
        if(params.action === 'get'){
          requestParams.url = `${base}price-alerts${(typeof params.alertID === 'string' || typeof params.alertID === 'number') ? '/'+params.alertID : ''}`;
        }
        if(params.action === 'create'){
          requestParams.url = `${base}price-alerts`;
          requestParams.method = 'POST';
          requestParams.form = params;
        }
        if(params.action === 'update'){
          requestParams.url = `${base}price-alerts/${params.alertID}`;
          requestParams.method = 'PUT';
          requestParams.form = {price:params.price,trend:params.trend,active:params.active};
        }
        if(params.action === 'delete'){
          requestParams.url = `${base}price-alerts/${params.alertID}`;
          requestParams.method = 'DELETE';
        }
        request(requestParams, function (error, response, body) {
          callback(JSON.parse(body));
        });
      }

    }
 }
 module.exports = api;
