/* ============================================================
 * node-coinfield-api
 * https://github.com/takoyaro/node-coinfield-api
 * ============================================================
 * Released under the MIT License by Takoyaro
 * ============================================================ */

import fetch from 'node-fetch';
import io from 'socket.io-client';
import {EventEmitter} from 'events';

export class Coinfield{
  
  private _socket:SocketIOClient.Socket = io('https://ws.coinfield.com');
  private _apiURL:string = 'https://api.coinfield.com/v1/';
  private _verbose:boolean = false;
  private _APIKey:string = '';
  private _eventEmitter:EventEmitter = new EventEmitter();

    constructor(APIKey?:string,verbose?:boolean){
      if(verbose){
        this._verbose=verbose;
        console.warn("Verbose mode active")
      }
      if(APIKey){
        this._APIKey = APIKey;
      }
      else{
        if(verbose){console.info("Using the API without Authentication. Private endpoints wont be available.")}
      }
      this._socket.emit('subscribe', 'tickers');
      this._socket.on('tickers',(payload)=>{
        this._eventEmitter.emit('tickers',payload);
      })
    }

    public socket = {
      subscribe:{
        market:(market:string)=>{this.subscribeToMarket(market);},
        tickers:()=>{
          this._socket.io.emit('subscribe','tickers');
          this._socket.emit('subscribe','tickers');
        },
        /**
         * ALL THE METHODS WITHIN THIS `private` PROPERTY REQUIRE AN API KEY.
         * MAKE SURE YOU SET ONE IN THE CLASS CONSTRUCTOR.
         */
        private:{
          userOrders:()=>{this.subscribeToPrivateEndpoint('user:orders')},
          userTrades:()=>{this.subscribeToPrivateEndpoint('user:trades')},
          userRewards:()=>{this.subscribeToPrivateEndpoint('user:rewards')},
          userDeposits:()=>{this.subscribeToPrivateEndpoint('user:deposits')},
          userWithdrawals:()=>{this.subscribeToPrivateEndpoint('user:withdrawals')}
        }
      },
      listener:this._socket
    };

    private subscribeToMarket(market:string){
      this._socket.emit('market', market);
      if(this._verbose) console.info(`Subscribed to ${market} market via Socket.`);
    }
    private subscribeToPrivateEndpoint(endpoint:string){
      if(!this._APIKey.length) throw Error("Cannot subscribe due to Invalid API Key. Make sure you provide one in your constructor");
      this._socket.emit('subscribe', endpoint, this._APIKey);
      if(this._verbose) console.log(`Subscribed to ${endpoint}`);
    }

    private async getEndpointData(endpoint:string,isPrivate?:boolean){
      let options = (isPrivate) ? {headers: {'Authorization': `Bearer ${this._APIKey}`}}:{};
      let req = await fetch(`${this._apiURL}${endpoint}`,options);
      
      if(req.ok){
        if(this._verbose) console.info(`${req.url} - Status: ${req.status}`)
        let res = await req.json();
        if(this._verbose) console.info(JSON.stringify(res));
        return res;
      }
      else{
        console.error(`There was an error fetching data for ${req.url} | Private Request?: ${isPrivate || false}`);
        console.error(`Request Options:`);
        console.error(options);
        let error = await req.json();
        console.error(JSON.stringify(error));
        return null;
      }
    }
    private async deleteEndpointData(endpoint:string){
      let req = await fetch(`${this._apiURL}${endpoint}`,{
        method:'DELETE',
        headers: {'Authorization': `Bearer ${this._APIKey}`}
      });
      
      if(req.ok){
        let res = await req.json();
        return res;
      }
      else{
        console.error(`There was an error fetching data for ${endpoint}`);
        let error = await req.json();
        console.error(error);
        return null;
      }
    }
    private async postEndpointData(endpoint:string,obj:object){
      let req = await fetch(`${this._apiURL}${endpoint}`,{
        method:'POST',
        body:JSON.stringify(obj),
        headers: {
          'Authorization': `Bearer ${this._APIKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if(req.ok){
        let res = await req.json();
        return res;
      }
      else{
        console.error(`There was an error posting data to ${endpoint}`);
        console.error(`Request Body:`);
        console.error(obj);
        let error = await req.json();
        console.error(error);
        return null;
      }
    }
    /**
     * Status of the system - `ok`|`maintenance`|`down`
     */
    public status = async ():Promise<SystemStatus>=>{
      const raw:status = await this.getEndpointData('status');
      if(raw) return raw.status as SystemStatus;
    }
    /**
     * ISO 8601 representation of the current time of the server
     */
    public timestamp = async ():Promise<string>=>{
      const raw:timestamp = await this.getEndpointData('timestamp');
      if(raw) return raw.timestamp as string;
    }
    /**
     * Get a list of all available currencies on the platform
     */
    public currencies = async ():Promise<currencies>=>{
      const raw:currencies = await this.getEndpointData('currencies');
      if(raw) return raw as currencies;
    }
    /**
     * Get all available markets
     */
    public markets = async ():Promise<markets>=>{
      const raw:markets = await this.getEndpointData('markets');
      if(raw) return raw as markets;
    }
    /**
     * Get tickers for all or a specific market
     * Specify a market pair in the format of "basequote" e.g. btcbch or btcxrp.
     * If not provided all market tickers are returned.
     * All available markets can be found using the `markets` method;
     */
    public tickers = async (market?:string):Promise<tickers>=>{
      const raw:tickers = await this.getEndpointData(`tickers${(market) ? `/${market}` : ''}`);
      if(raw) return raw as tickers;
    }
    /**
     * Get orderbook for a specific market
     * @param limit If set, value must be either `1`,`20`,`50`,`100`,`150` or `200`
     */
    public orderbook = async (market:string,limit?:number):Promise<orderbook>=>{
      if(limit){
        if(![1,20,50,100,150,200].includes(limit)){
          throw Error("If set, Limit parameter must be one of these values 1,20,50,100,150,200 as per Coinfield API");
        }
      }
      const raw:orderbook = await this.getEndpointData(`orderbook${(market) ? `/${market}` : ''}${(limit) ? `?limit=${limit}` : ''}`);
      if(raw) return raw as orderbook;
    }
    /**
     * Get depth for a specific market
     * @param limit If set, value must be either `1`,`20`,`50`,`100`,`200` or `300`
     */
    public depth = async (market:string,limit?:number):Promise<depth>=>{
      if(limit){
        if(![1,20,50,100,200,300].includes(limit)){
          throw Error("If set, Limit parameter must be one of these values 1,20,50,100,200,300 as per Coinfield API");
        }
      }
      const raw:depth = await this.getEndpointData(`depth${(market) ? `/${market}` : ''}${(limit) ? `?limit=${limit}` : ''}`);
      if(raw) return raw as depth;
    }
    /**
     * Get OHLC candles for a specific market
     * @param period  If set, `period` parameter value must be either `1`, `5`, `15`, `30`, `60`, `120`, `240`, `360`, `720`, `1440`, `4320`, `10080`. Default to `30`
     * @param from UNIX epoch timestamp of start time
     * @param to UNIX epoch timestamp of start time
     */
    public ohlc = async (market:string,limit:number=30,period:number=5,from?:number,to?:number):Promise<ohlc>=>{
      if(![1, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 4320, 10080].includes(period)){
        throw Error("Period parameter must be one of these values 1, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 4320, 10080 as per Coinfield API");
      }
      let endpoint = `ohlc/${market}?limit=${limit}&period=${period}`;
      if(from){endpoint += `&from=${from}`;}
      if(to){endpoint += `&to=${to}`;}
      const raw:ohlc = await this.getEndpointData(endpoint);
      if(raw) return raw as ohlc;
    }
    /**
     * Get Trades for a specific market
     * @param limit If set, `limit` parameter value must be `50`|`100`|`150`|`200`|`250`. Default to `50`
     * @param orderby If set, must be `asc`|`desc`
     * @param from Trade id. If set, only trades done after the specified trade id will be returned
     * @param to Trade id. If set, only trades done before the specified trade id will be returned
     */
    public trades = async (market:string,limit?:number,orderby?:orderType,from?:number,to?:number):Promise<trades>=>{
      if(![50,100,150,200,250].includes(limit)){
        throw Error("Period parameter must be one of these values 50,100,150,200,250 as per Coinfield API");
      }
      let endpoint = `trades/${market}?limit=${limit || 50}&order_by=${orderby || 'desc'}`;
      if(from){endpoint += `&from=${from}`;}
      if(to){endpoint += `&to=${to}`;}
      const raw:trades = await this.getEndpointData(endpoint);
      if(raw) return raw as trades;
    }

    public leaderboard = async ():Promise<leaderboard>=>{
      const raw:leaderboard = await this.getEndpointData('leaderboard');
      if(raw) return raw as leaderboard;
    }

    //PRIVATE ENDPOINTS

    public account = async ():Promise<account>=>{
      const raw = await this.getEndpointData('account',true);
      if(raw) return await raw as account;
    }
    public wallets = async ():Promise<wallets>=>{
      const raw = await this.getEndpointData('wallets',true);
      if(raw) return raw as wallets;
    }
    public fees = async ():Promise<fees>=>{
      const raw = await this.getEndpointData('fees',true);
      if(raw) return raw as fees;
    }
    /**
     * Get, Create and Delete single orders for a specific market
     */
    public order = {
      async get(id:string):Promise<singleOrder>{
        const raw = await this.getEndpointData(`order/${id}`,true);
        if(raw) return raw as singleOrder;
      },
      create: {
        limit: {
          bid:async (market:string,volume:number,price:number,expiry:number,immediate:boolean):Promise<newOrder>=>{
            let order = await this.postEndpointData('order',{
              market:market,
              type:'bid',
              strategy:'limit',
              volume:volume,
              price:price,
              expiry:expiry,
              immediate:immediate
            });
            return order as newOrder;
          },
          ask: async (market:string,volume:number,price:number,expiry:number,immediate:boolean):Promise<newOrder>=>{
            let order = await this.postEndpointData('order',{
              market:market,
              type:'ask',
              strategy:'limit',
              volume:volume,
              price:price,
              expiry:expiry,
              immediate:immediate
            });
            return order as newOrder;
          }
        },
        market:{
          bid: async(market:string,volume:number,price:number,funds:number):Promise<newOrder>=>{
            let order = await this.postEndpointData('order',{
              market:market,
              type:'bid',
              strategy:'limit',
              volume:volume,
              price:price,
              funds:funds
            })
            return order as newOrder;
          },
          ask: async (market:string,volume:number,price:number):Promise<newOrder>=>{
            let order = await this.postEndpointData('order',{
              market:market,
              type:'ask',
              strategy:'limit',
              volume:volume,
              price:price
            })
            return order as newOrder
          }
        },
        stoplimit:{
          bid: async (market:string,volume:number,price:number,stop_price:number,expiry:number,immediate:boolean):Promise<newOrder>=>{
            let order = await this.postEndpointData('order',{
              market:market,
              type:'bid',
              strategy:'stop_limit',
              volume:volume,
              price:price,
              stop_price:stop_price,
              expiry:expiry,
              immediate:immediate
            })
            return order as newOrder;
          },
          ask: async (market:string,volume:number,price:number,stop_price:number,expiry:number,immediate:boolean):Promise<newOrder>=>{
            let order = await this.postEndpointData('order',{
              market:market,
              type:'ask',
              strategy:'stop_limit',
              volume:volume,
              price:price,
              stop_price:stop_price,
              expiry:expiry,
              immediate:immediate
            })
            return order as newOrder;
          }
        }
      },
      async delete(id:string):Promise<cancelledOrder>{
        const raw = await this.deleteEndpointData(`order/${id}`,true);
        if(raw) return raw as cancelledOrder;
      }
    }
    /**
     * Get, Delete all orders for a specific market
     */
    public orders = {
      /**
      * Get your orders for a specific market
      */
      get: async (market:string,limit?:number,state?:string,page?:number,orderBy?:'desc'|'asc'):Promise<orders>=>{
        let endpoint = `orders/${market}`;
        (limit) ? endpoint+=`?limit=${limit}` : endpoint+=`?limit=50`;
        (state) ? endpoint+=`&state=${state}` : endpoint+=`&state=wait`;
        (page) ? endpoint+=`&page=${page}` : '';
        (orderBy) ? endpoint+=`&order_by=${orderBy}` : endpoint+=`&order_by=desc`;
        const raw = await this.getEndpointData(endpoint,true);
        if(raw) return raw as Promise<orders>;
      },
      /**
       * Delete your orders for a specific market
      */
      delete: async (market:string,side:string):Promise<orders>=>{
        const raw = await this.deleteEndpointData(`orders/${market}?side=${side}`);
        if(raw) return raw as Promise<orders>;
      }
    }
    /**
     * Get your trading history for a specific market
     */
    public async tradeHistory(market:string,limit?:number,from?:number,to?:number,orderBy?:'asc'|'desc'):Promise<trades>{
      let endpoint = `trade-history/${market}`;
      (limit) ? endpoint+=`?limit=${limit}` : `?limit=50`;
      (from) ? endpoint+= `&from=${from}` : '';
      (to) ? endpoint+= `&to=${to}` : '';
      (orderBy) ? endpoint+= `&order_by=${orderBy}` : '';
      const raw = await this.getEndpointData(endpoint,true);
      if(raw) return raw as trades;
    }
    
    /**
     * Get wallet address for cryptocurrencies
    */
    public async depositAddresses(currency:string):Promise<depositAddresses>{
      const raw = await this.getEndpointData(`deposit-addresses/${currency}`,true);
      if(raw) return raw as depositAddresses;
    }

    /**
     * Get your deposit history for cryptocurrencies or fiat
    */
    public async deposits(currency?:string,limit?:number,state?:'submitted'|'canceled'|'rejected'|'accepted',txid?:string):Promise<deposits>{
      let endpoint = `deposits`;
      (currency) ? endpoint += `/${currency}` : null;
      (limit) ? endpoint += `?limit=${limit}` : endpoint += `?limit=50`;
      (state) ? endpoint += `&state=${state}` : null;
      (txid) ? endpoint += `&txid=${txid}` : null;
      const raw = await this.getEndpointData(endpoint,true);
      if(raw) return raw as deposits;
    }
}

type SystemStatus = 'ok' | 'maintenance' | 'down';
type orderType = 'asc' | 'desc';
interface status{
  status:SystemStatus
}
interface timestamp{
  timestamp:string
}
interface currency{
  id:string,
  type:string,
  erc20:boolean,
  ieo:boolean,
  name:string,
  symbol:string,
  ISO4217:string,
  precision:number,
  /**
   * Color of the currency in hex format, i.e.: `"#d80027"`
   */
  color:string,
  /**
   * base64 logo of the currency as `data:image/png;base64, ....`
   */
  logo:string
}
interface currencies{
  /**
   * Array of objects containing currencies:
   */
  currencies:currency[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface market{
  name:string,
  id:string,
  ask_unit:string,
  bid_unit:string,
  ask_precision:number,
  bid_precision:number,
  minimum_volume:string,
  maximum_volume:string,
  minimum_funds:string,
  maximum_funds:string,
  restricted_countries?:string[],
  minimum_level:number
}
interface markets{
  /**
   * Array of objects containing markets pairs:
   */
  markets:market[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface ticker{
  market:string,
  timestamp:string,
  bid:number,
  ask:number,
  low:number,
  high:number,
  last:number,
  open:number,
  volume:number
}
interface tickers{
  markets:ticker[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface bidsasks{
  id:string,
  price:string,
  volume:string,
  timestamp:string
}
interface orderbook{
  market:string,
  total_asks:number,
  total_bids:number,
  bids_hash:string,
  asks_hash:string,
  bids: bidsasks[],
  asks: bidsasks[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface depth{
  market:string,
  /**
   * Bids are provided in a [price,volume] format by the API.
   * Might remap to an object structure in a future release.
   */
  bids:[string, string][][],
  /**
   * Asks are provided in a [price,volume] format by the API.
   * Might remap to an object structure in a future release.
   */
  asks:[string, string][][],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface singleOHLC{
  ts:string,
  o:string,
  h:string,
  l:string,
  c:string,
  v:string
}
interface ohlc{
  market:string,
  ohlc:singleOHLC[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface singleTrade{
  id:string,
  price:string,
  volume:string,
  fund:string,
  executed_at:string,
  total_value:string,
  timestamp:string
}
interface trades{
  market:string,
  trades_hash:string,
  trades:singleTrade[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface leader{
  email:string,
  currency:string,
  amount:string
}
interface leaderboard{
  leaderboard:leader[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface account{
  account:{
    uid: string
    email: string,
    level: number,
    role: string,
    tz: string,
    time_zone: string,
    base_cid: string,
    base_currency: string,
    generate_account_statements: boolean,
    account_statements_enabled: boolean,
    trading_discounts_enabled: boolean,
    registration_source: string,
    referrer_uid: string|null,
    mfa_enabled: boolean,
    otp: boolean,
    terms_version: number,
    primary_terms_version: number,
    atp_terms_version: number,
    phones: {number:string}[],
    current_sign_in_ip: string,
    current_sign_in_at: string,
    last_sign_in_ip: string
    last_sign_in_at: string,
    profile: {
      status: string,
      first_name: string,
      middle_name: string,
      last_name: string,
      first_last_name: string,
      second_last_name: string,
      international_full_name: string,
      name_suffix: string,
      birthdate: string,
      gender: string,
      nationality: string,
      country: string,
      uniform_territory: any,
      address: string,
      address_line_1: string,
      address_line_2: string,
      territory: string,
      city: string,
      postcode: string,
      occupation: string,
      job_title: string,
      proof_of_address_type: string,
      proof_of_address_document: string,
      trading_skills_level: string,
      estimated_trading_volume_per_month: string,
      source_of_funds_type_type: string,
      source_of_funds_description: string,
      purpose_of_the_account: any,
      representing_someone_else: any,
      politically_exposed_person: any,
      level_6_application_submitted_at: any,
      level_6_application_method: any
    },
    documents: {type:string,number:string,expiry:string|null,date:string|null, url:string}[]
  },
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface wallets{
  wallets: {currency:String,balance:string,locked:string}[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface fees{
  fees:{type:string,
    currency:string,
    method:string,
    fee_type:string,
    fee_value:string}[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface singleOrder{
  order:{
    id:string,
    strategy:string,
    price:string,
    immediate:boolean,
    state:'open'|'closed'|'canceled'|'pending',
    trades_count:number,
    created_at:string,
    side:string,
    avg_price:string,
    volume:string,
    remaining_volume:string,
    executed_volume: number,
    market?:string
  },
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface newOrder{
  order:{
    id: string,
    market: string,
    strategy: string,
    price: string,
    stop_price: string,
    type: string,
    state: 'open'|'closed'|'canceled'|'pending',
    trades_count: string,
    created_at: string,
    uid: string,
    expiry: string,
    immediate: string,
    volume: string,
    remaining_volume: string,
    fee_percentage: string,
    total_fee: string,
    fee_currency: string,
    cost: string,
    receive: string,
    base: string,
    quote: string
  },
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface cancelledOrder{
  order:{
    id: string,
    side: string,
    strategy: 'limit'|'market'
    price: string,
    stop_price: string,
    //* avg_price: (String - Average prices of executed trades) documentatin has an asterisk, not sure why. Need to test function;
    state: 'open'|'closed'|'canceled'|'pending',
    market: string,
    created_at: string,
    volume: string,
    remaining_volume:string,
    executed_volume: string,
    trades_count: string,
    trades:any[] //This is undocumented. Need to test the function
  },
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface orders{
  market:string,
  orders:singleOrder[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface depositAddresses{
  currency:string,
  address:string,
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}
interface deposits{
  deposits:{
    id:number,
    currency:string,
    amount:string,
    fee:string,
    txid:null|string,
    created_at:string,
    confirmations:number,
    completed_at:string,
    state:string
  }[],
  /**
   * ISO 8601 representation of the current time markets are fetched
   */
  timestamp:string,
  /**
   * Number of milliseconds taken for the API to respond. Useful to debug latency vs processing delays
   */
  took:string
}

