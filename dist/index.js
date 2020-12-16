"use strict";
/* ============================================================
 * node-coinfield-api
 * https://github.com/takoyaro/node-coinfield-api
 * ============================================================
 * Released under the MIT License by Takoyaro
 * ============================================================ */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coinfield = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const events_1 = require("events");
class Coinfield {
    constructor(APIKey, verbose) {
        this._socket = socket_io_client_1.default('https://ws.coinfield.com');
        this._apiURL = 'https://api.coinfield.com/v1/';
        this._verbose = false;
        this._APIKey = '';
        this._eventEmitter = new events_1.EventEmitter();
        this.socket = {
            subscribe: {
                market: (market) => { this.subscribeToMarket(market); },
                tickers: () => {
                    this._socket.io.emit('subscribe', 'tickers');
                    this._socket.emit('subscribe', 'tickers');
                },
                /**
                 * ALL THE METHODS WITHIN THIS `private` PROPERTY REQUIRE AN API KEY.
                 * MAKE SURE YOU SET ONE IN THE CLASS CONSTRUCTOR.
                 */
                private: {
                    userOrders: () => { this.subscribeToPrivateEndpoint('user:orders'); },
                    userTrades: () => { this.subscribeToPrivateEndpoint('user:trades'); },
                    userRewards: () => { this.subscribeToPrivateEndpoint('user:rewards'); },
                    userDeposits: () => { this.subscribeToPrivateEndpoint('user:deposits'); },
                    userWithdrawals: () => { this.subscribeToPrivateEndpoint('user:withdrawals'); }
                }
            },
            listener: this._socket
        };
        /**
         * Status of the system - `ok`|`maintenance`|`down`
         */
        this.status = async () => {
            const raw = await this.getEndpointData('status');
            if (raw)
                return raw.status;
        };
        /**
         * ISO 8601 representation of the current time of the server
         */
        this.timestamp = async () => {
            const raw = await this.getEndpointData('timestamp');
            if (raw)
                return raw.timestamp;
        };
        /**
         * Get a list of all available currencies on the platform
         */
        this.currencies = async () => {
            const raw = await this.getEndpointData('currencies');
            if (raw)
                return raw;
        };
        /**
         * Get all available markets
         */
        this.markets = async () => {
            const raw = await this.getEndpointData('markets');
            if (raw)
                return raw;
        };
        /**
         * Get tickers for all or a specific market
         * Specify a market pair in the format of "basequote" e.g. btcbch or btcxrp.
         * If not provided all market tickers are returned.
         * All available markets can be found using the `markets` method;
         */
        this.tickers = async (market) => {
            const raw = await this.getEndpointData(`tickers${(market) ? `/${market}` : ''}`);
            if (raw)
                return raw;
        };
        /**
         * Get orderbook for a specific market
         * @param limit If set, value must be either `1`,`20`,`50`,`100`,`150` or `200`
         */
        this.orderbook = async (market, limit) => {
            if (limit) {
                if (![1, 20, 50, 100, 150, 200].includes(limit)) {
                    throw Error("If set, Limit parameter must be one of these values 1,20,50,100,150,200 as per Coinfield API");
                }
            }
            const raw = await this.getEndpointData(`orderbook${(market) ? `/${market}` : ''}${(limit) ? `?limit=${limit}` : ''}`);
            if (raw)
                return raw;
        };
        /**
         * Get depth for a specific market
         * @param limit If set, value must be either `1`,`20`,`50`,`100`,`200` or `300`
         */
        this.depth = async (market, limit) => {
            if (limit) {
                if (![1, 20, 50, 100, 200, 300].includes(limit)) {
                    throw Error("If set, Limit parameter must be one of these values 1,20,50,100,200,300 as per Coinfield API");
                }
            }
            const raw = await this.getEndpointData(`depth${(market) ? `/${market}` : ''}${(limit) ? `?limit=${limit}` : ''}`);
            if (raw)
                return raw;
        };
        /**
         * Get OHLC candles for a specific market
         * @param period  If set, `period` parameter value must be either `1`, `5`, `15`, `30`, `60`, `120`, `240`, `360`, `720`, `1440`, `4320`, `10080`. Default to `30`
         * @param from UNIX epoch timestamp of start time
         * @param to UNIX epoch timestamp of start time
         */
        this.ohlc = async (market, limit = 30, period = 5, from, to) => {
            if (![1, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 4320, 10080].includes(period)) {
                throw Error("Period parameter must be one of these values 1, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 4320, 10080 as per Coinfield API");
            }
            let endpoint = `ohlc/${market}?limit=${limit}&period=${period}`;
            if (from) {
                endpoint += `&from=${from}`;
            }
            if (to) {
                endpoint += `&to=${to}`;
            }
            const raw = await this.getEndpointData(endpoint);
            if (raw)
                return raw;
        };
        /**
         * Get Trades for a specific market
         * @param limit If set, `limit` parameter value must be `50`|`100`|`150`|`200`|`250`. Default to `50`
         * @param orderby If set, must be `asc`|`desc`
         * @param from Trade id. If set, only trades done after the specified trade id will be returned
         * @param to Trade id. If set, only trades done before the specified trade id will be returned
         */
        this.trades = async (market, limit, orderby, from, to) => {
            if (![50, 100, 150, 200, 250].includes(limit)) {
                throw Error("Period parameter must be one of these values 50,100,150,200,250 as per Coinfield API");
            }
            let endpoint = `trades/${market}?limit=${limit ?? 50}&order_by=${orderby ?? 'desc'}`;
            if (from) {
                endpoint += `&from=${from}`;
            }
            if (to) {
                endpoint += `&to=${to}`;
            }
            const raw = await this.getEndpointData(endpoint);
            if (raw)
                return raw;
        };
        this.leaderboard = async () => {
            const raw = await this.getEndpointData('leaderboard');
            if (raw)
                return raw;
        };
        //PRIVATE ENDPOINTS
        this.account = async () => {
            const raw = await this.getEndpointData('account', true);
            if (raw)
                return await raw;
        };
        this.wallets = async () => {
            const raw = await this.getEndpointData('wallets', true);
            if (raw)
                return raw;
        };
        this.fees = async () => {
            const raw = await this.getEndpointData('fees', true);
            if (raw)
                return raw;
        };
        /**
         * Get, Create and Delete single orders for a specific market
         */
        this.order = {
            async get(id) {
                const raw = await this.getEndpointData(`order/${id}`, true);
                if (raw)
                    return raw;
            },
            create: {
                limit: {
                    bid: async (market, volume, price, expiry, immediate) => {
                        let order = await this.postEndpointData('order', {
                            market: market,
                            type: 'bid',
                            strategy: 'limit',
                            volume: volume,
                            price: price,
                            expiry: expiry,
                            immediate: immediate
                        });
                        return order;
                    },
                    ask: async (market, volume, price, expiry, immediate) => {
                        let order = await this.postEndpointData('order', {
                            market: market,
                            type: 'ask',
                            strategy: 'limit',
                            volume: volume,
                            price: price,
                            expiry: expiry,
                            immediate: immediate
                        });
                        return order;
                    }
                },
                market: {
                    bid: async (market, volume, price, funds) => {
                        let order = await this.postEndpointData('order', {
                            market: market,
                            type: 'bid',
                            strategy: 'limit',
                            volume: volume,
                            price: price,
                            funds: funds
                        });
                        return order;
                    },
                    ask: async (market, volume, price) => {
                        let order = await this.postEndpointData('order', {
                            market: market,
                            type: 'ask',
                            strategy: 'limit',
                            volume: volume,
                            price: price
                        });
                        return order;
                    }
                },
                stoplimit: {
                    bid: async (market, volume, price, stop_price, expiry, immediate) => {
                        let order = await this.postEndpointData('order', {
                            market: market,
                            type: 'bid',
                            strategy: 'stop_limit',
                            volume: volume,
                            price: price,
                            stop_price: stop_price,
                            expiry: expiry,
                            immediate: immediate
                        });
                        return order;
                    },
                    ask: async (market, volume, price, stop_price, expiry, immediate) => {
                        let order = await this.postEndpointData('order', {
                            market: market,
                            type: 'ask',
                            strategy: 'stop_limit',
                            volume: volume,
                            price: price,
                            stop_price: stop_price,
                            expiry: expiry,
                            immediate: immediate
                        });
                        return order;
                    }
                }
            },
            async delete(id) {
                const raw = await this.deleteEndpointData(`order/${id}`, true);
                if (raw)
                    return raw;
            }
        };
        /**
         * Get, Delete all orders for a specific market
         */
        this.orders = {
            /**
            * Get your orders for a specific market
            */
            get: async (market, limit, state, page, orderBy) => {
                let endpoint = `orders/${market}`;
                (limit) ? endpoint += `?limit=${limit}` : endpoint += `?limit=50`;
                (state) ? endpoint += `&state=${state}` : endpoint += `&state=wait`;
                (page) ? endpoint += `&page=${page}` : '';
                (orderBy) ? endpoint += `&order_by=${orderBy}` : endpoint += `&order_by=desc`;
                const raw = await this.getEndpointData(endpoint, true);
                if (raw)
                    return raw;
            },
            /**
             * Delete your orders for a specific market
            */
            delete: async (market, side) => {
                const raw = await this.deleteEndpointData(`orders/${market}?side=${side}`);
                if (raw)
                    return raw;
            }
        };
        if (verbose) {
            this._verbose = verbose;
            console.warn("Verbose mode active");
        }
        if (APIKey) {
            this._APIKey = APIKey;
        }
        else {
            if (verbose) {
                console.info("Using the API without Authentication. Private endpoints wont be available.");
            }
        }
        this._socket.emit('subscribe', 'tickers');
        this._socket.on('tickers', (payload) => {
            this._eventEmitter.emit('tickers', payload);
        });
    }
    subscribeToMarket(market) {
        this._socket.emit('market', market);
        if (this._verbose)
            console.info(`Subscribed to ${market} market via Socket.`);
    }
    subscribeToPrivateEndpoint(endpoint) {
        if (!this._APIKey.length)
            throw Error("Cannot subscribe due to Invalid API Key. Make sure you provide one in your constructor");
        this._socket.emit('subscribe', endpoint, this._APIKey);
        if (this._verbose)
            console.log(`Subscribed to ${endpoint}`);
    }
    async getEndpointData(endpoint, isPrivate) {
        let options = (isPrivate) ? { headers: { 'Authorization': `Bearer ${this._APIKey}` } } : {};
        let req = await node_fetch_1.default(`${this._apiURL}${endpoint}`, options);
        if (req.ok) {
            if (this._verbose)
                console.info(`${req.url} - Status: ${req.status}`);
            let res = await req.json();
            if (this._verbose)
                console.info(JSON.stringify(res));
            return res;
        }
        else {
            console.error(`There was an error fetching data for ${req.url} | Private Request?: ${isPrivate ?? false}`);
            console.error(`Request Options:`);
            console.error(options);
            let error = await req.json();
            console.error(JSON.stringify(error));
            return null;
        }
    }
    async deleteEndpointData(endpoint) {
        let req = await node_fetch_1.default(`${this._apiURL}${endpoint}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${this._APIKey}` }
        });
        if (req.ok) {
            let res = await req.json();
            return res;
        }
        else {
            console.error(`There was an error fetching data for ${endpoint}`);
            let error = await req.json();
            console.error(error);
            return null;
        }
    }
    async postEndpointData(endpoint, obj) {
        let req = await node_fetch_1.default(`${this._apiURL}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Authorization': `Bearer ${this._APIKey}`,
                'Content-Type': 'application/json'
            }
        });
        if (req.ok) {
            let res = await req.json();
            return res;
        }
        else {
            console.error(`There was an error posting data to ${endpoint}`);
            console.error(`Request Body:`);
            console.error(obj);
            let error = await req.json();
            console.error(error);
            return null;
        }
    }
    /**
     * Get your trading history for a specific market
     */
    async tradeHistory(market, limit, from, to, orderBy) {
        let endpoint = `trade-history/${market}`;
        (limit) ? endpoint += `?limit=${limit}` : `?limit=50`;
        (from) ? endpoint += `&from=${from}` : '';
        (to) ? endpoint += `&to=${to}` : '';
        (orderBy) ? endpoint += `&order_by=${orderBy}` : '';
        const raw = await this.getEndpointData(endpoint, true);
        if (raw)
            return raw;
    }
    /**
     * Get wallet address for cryptocurrencies
    */
    async depositAddresses(currency) {
        const raw = await this.getEndpointData(`deposit-addresses/${currency}`, true);
        if (raw)
            return raw;
    }
    /**
     * Get your deposit history for cryptocurrencies or fiat
    */
    async deposits(currency, limit, state, txid) {
        let endpoint = `deposits`;
        (currency) ? endpoint += `/${currency}` : null;
        (limit) ? endpoint += `?limit=${limit}` : endpoint += `?limit=50`;
        (state) ? endpoint += `&state=${state}` : null;
        (txid) ? endpoint += `&txid=${txid}` : null;
        const raw = await this.getEndpointData(endpoint, true);
        if (raw)
            return raw;
    }
}
exports.Coinfield = Coinfield;
//# sourceMappingURL=index.js.map