# Documentation

- [Getting Started](#getting-started) 🚶‍♀️ 🚶
- [Public Calls](#public-calls) 📢
	- [status](#status)
	- [timestamp](#timestamp)
	- [currencies](#currencies)
	- [markets](#markets)
	- [tickers](#tickers)
	- [orderbook](#orderbook)
	- [depth](#depth)
	- [ohlc](#ohlc)
	- [trades](#trades)
- [Private Calls](#private-calls) 🕵️
	- [account](#account)
	- [wallets](#wallets)
	- [fees](#fees)
	- [placeorder](#placeorder)
	- [getorder](#getorder)
	- [deleteorder](#deleteorder)
	- [getorders](#getorders)
	- [deleteorders](#deleteorders)
	- [tradehistory](#tradehistory)
	- [depositaddresses](#depositaddresses)
	- [deposits](#deposits)
	- [withdrawaladdresses](#withdrawaladdresses)
	- [withdrawals](#withdrawals)
	- [makewithdrawal](#makewithdrawal)
	- [pricealerts](#pricealerts)
- [WebSocket](#websocket) 🔗

##  🚶‍♀️ 🚶
## Getting Started
```js
const Coinfield = require('node-coinfield-api')({
APIKEY: //YOUR API KEY HERE - ONLY REQUIRED FOR PRIVATE CALLS
});
```
For the purpose of keeping this documentation clean and coherant, all the examples below using the `Coinfield` namespace will refer to the constant variable declared above.

## 📢
## Public Calls

### status
Get the status of the Coinfield API
```
Coinfield.status((status)=>{
  console.log(status);
});
```
<details>
<summary>View Response</summary>

```js
{ status: 'ok' }
```
</details>

### timestamp
Get the timestamp of the server
```js
Coinfield.timestamp((ts)=>{
  console.log(ts);
});
```
<details>
<summary>View Response</summary>

```js
{ timestamp: '2019-11-23T05:35:00.398Z' }
```
</details>

### currencies
Get a list of all available currencies on the platform
###### All currencies
```js
Coinfield.currencies((currencies)=>{
  console.log(currencies);
});
```
###### Specific currency
```js
Coinfield.currencies("BTC",(currencies)=>{
  console.log(currencies);
});
```
<details>
<summary>View Response</summary>

```js
{
    "currencies": [
        {
            "id": "BTC",
            "type": "crypto",
            "erc20": false,
            "name": "Bitcoin",
            "symbol": "₿",
            "ISO4217": "XBT",
            "precision": 8,
            "color": "#FF9900",
            "logo": "data:image/png;base64..."
        },
        {
            "id": "USD",
            "type": "fiat",
            "erc20": false,
            "name": "US Dollars",
            "symbol": "$",
            "ISO4217": "USD",
            "precision": 8,
            "color": "#003B70",
            "logo": "data:image/png;base64..."
        },
        ...
    ],
    "timestamp": "2018-08-21T05:25:34.321Z",
    "took": "0ms"
}
```
</details>

### markets
Get all available markets

| Parameter | Type | Optional | Description |
| --- | --- | --- | --- |
| market | String/|Array of Strings| yes | If not provided all markets are returned .|

###### All markets
```js
Coinfield.markets((markets)=>{
  console.log(markets);
});
```
###### Specific markets
```js
Coinfield.markets(["btcxrp","ethxrp"],(markets)=>{
  console.log(markets);
});
```
###### Specific market
```js
Coinfield.markets("btcxrp",(markets)=>{
  console.log(markets);
});
```
<details>
<summary>View Response</summary>

```js
{ markets:
  [{ id: 'btcxrp',
       name: 'BTC/XRP',
       ask_precision: 8,
       bid_precision: 4,
       minimum_volume: '0.001',
       maximum_volume: '50.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0'
    },
     { id: 'ethxrp',
       name: 'ETH/XRP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '0.1',
       maximum_volume: '300.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0'
    },
       ...
    ],
  timestamp: '2019-11-23T05:45:54.331Z',
  took: '0ms' }
```
</details>

### tickers
Get tickers for all or a specific market

| Parameter | Type | Optional | Description |
| --- | --- | --- | --- |
| market |String| yes |Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets). <br /> **If not provided all market tickers are returned.**|
###### Tickers for all markets
```js
Coinfield.tickers((tickers)=>{
  console.log(tickers);
});
```

###### Ticker for a specific market

```js
Coinfield.tickers("btccad",(tickers)=>{
  console.log(tickers);
});
```
<details>
<summary>View Response</summary>

```js
 {
 	"markets": [{
 		"market": "btccad",
 		"timestamp": "2018-07-06T01:13:40.000Z",
 		"bid": 12540.23,
 		"ask": 12780.55,
 		"low": 12300.12,
 		"high": 13340.99,
 		"last": 12520.22,
 		"open": 12241.23,
 		"vol": 1209.233487
 	}],
 	"timestamp": "2018-07-06T01:13:40.589Z",
 	"took": "14ms"
 }
```
</details>

### orderbook
Get orderbook for a specific market

| Parameter | Type | Optional | Description |
| --- | --- | --- | --- |
| market |String|**mandatory** |Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets). |
| limit | Number | yes| Number of asks and bids array.<br />Default value: `20` |

```js
Coinfield.orderbook("btcxrp", 10, (ob)=>{
  console.log(ob);
});
```
<details>
<summary>View Response</summary>

```js
 { market: 'btcxrp',
  total_asks: 0.21297403,
  total_bids: 0.81574265,
  bids_hash: '9ae3200ead28dd713d156754adaa729f',
  asks_hash: '268c3680763bcf449f4f61628b5739a9',
  bids:
   [ { id: 'mc211ethj9t009e5t2',
       price: '31258.6315',
       immediate: false,
       volume: '0.0032',
       timestamp: '2019-11-23T06:10:05Z' },
     ... ],
  asks:
   [ { id: 'mc111ethj9t009e5t3',
       price: '31551.5075',
       immediate: false,
       volume: '0.0044',
       timestamp: '2019-11-23T06:10:05Z' },
     ... ],
  timestamp: '2019-11-23T06:10:18.024Z',
  took: '19ms' }
```
</details>

### depth
Get depth for a specific market

| Parameter | Type | Optional | Description |
| --- | --- | --- | --- |
| market |String|**mandatory** |Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets). |
| limit | Number | yes| Limit the number of returned price levels.<br />Default value: `300` |

```js
Coinfield.depth("btcxrp", 10, (depth)=>{
  console.log(depth);
});
```
<details>
<summary>View Response</summary>

```js
 { market: 'btcxrp',
  bids:
   [ [ '31122.9277', '0.0031' ],
     [ '29649.1773', '0.0095508' ],
     [ '29306.2866', '0.00699185' ],
     [ '29293.001', '0.1929' ],
     [ '29293.0', '0.6' ],
     [ '29217.2', '0.0043' ],
     [ '29200.0', '0.5' ],
     [ '29165.6164', '0.0053829' ],
     [ '29040.2043', '0.01216575' ],
     [ '28903.7153', '0.0116568' ] ],
  asks:
   [ [ '32411.72', '0.001' ],
     [ '32298.4281', '0.012252' ],
     [ '32166.5453', '0.6262' ],
     [ '32166.0', '0.11430023' ],
     [ '32165.999', '0.05951' ],
     [ '32122.4573', '0.0012' ],
     [ '32032.0109', '0.0091638' ],
     [ '31938.9701', '0.0041' ],
     [ '31926.2556', '0.0129' ],
     [ '31904.7619', '0.0086' ] ],
  timestamp: '2019-11-23T06:28:45.858Z',
  took: '12ms' }
```
</details>

### ohlc
OHLC (KLine) of a specific market

| Parameter | Type | Optional | Description |
| --- | --- | --- | --- |
| market |String|**mandatory** |Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets).|
| options | Object | yes| Optional parameters to be passed, more details below. |
| options.limit | Number | yes| Limit number of candles. <br />Default value: `30` |
| options.period | Number | yes| Candle periods.<br />Valid range: `1`, `5`, `15`, `30`, `60`, `120`, `240`, `360`, `720`, `1440`, `4320`, `10080` <br /> Default value: `30` |
| options.from | Number | yes| UNIX epoch timestamp of start time |
| options.to | Number | yes| UNIX epoch timestamp of start time |

```js
Coinfield.ohlc("btcxrp", {limit:24,period:60, from: 1574404560 , to: 1574490990 }, (ohlc)=>{
  console.log(ohlc);
});
```
<details>
<summary>View Response</summary>

```js
 { market: 'btcxrp',
  ohlc:
   [ { ts: '2019-11-22T06:00:00.000Z',
       o: '31532.1982',
       h: '31532.1982',
       l: '31350.4339',
       c: '31377.9732',
       v: '0.79393447' },
     { ts: '2019-11-22T07:00:00.000Z',
       o: '31529.0453',
       h: '31532.1982',
       l: '31369.4458',
       c: '31408.9667',
       v: '1.06185815' },
     ... ],
  timestamp: '2019-11-23T06:37:58.266Z',
  took: '16ms' }
```
</details>

### trades
Get trades for a specific market

| Parameter | Type | Optional | Description |
| --- | --- | --- | --- |
| market |String|**mandatory** |Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets). |
| options | Object | yes| Optional parameters to be passed, more details below. |
| options.limit | Number | yes| Limit number of candles. <br />Default value: `30` |
| options.timestamp | Number | yes| An integer represents the seconds elapsed since Unix epoch. If set, only trades executed before the time will be returned |
| options.from | Number | yes| Trade id. If set, only trades done after the specified trade id will be returned |
| options.to | Number | yes| Trade id. If set, only trades done before the specified trade id will be returned |
| options.order_by | Number | yes| If set, trades will be sorted in specific order (desc, asc) <br/> Default value: `desc` |

```js
Coinfield.trades("btccad", {limit:24}, (trades)=>{
  console.log(trades);
});
```
<details>
<summary>View Response</summary>

```js
 {
	"market": "btccad",
	"trades_hash": "3ef3add2b8e8f0f37ba2a9461a8ab8d1",
	"trades": [{
		"id": 47635,
		"price": "8000.0",
		"volume": "0.0001",
		"total_value": "0.8",
		"timestamp": "2018-06-25T23:40:03Z"
	}, {
		"id": 47634,
		"price": "8000.0",
		"volume": "0.0001",
		"total_value": "0.8",
		"timestamp": "2018-06-25T23:38:39Z"
	}],
	"timestamp": "2018-07-06T05:59:36.642Z",
	"took": "0ms"
}
```
</details>

## 🕵️
## Private Calls

### account
Get account details

```js
Coinfield.account((account)=>{
  console.log(account);
});
```
<details>
<summary>View Response</summary>

```js
 {
   "email": "user@email.com",
   "uid": "ID2EBA2938A7",
   "level": 6,
   "timestamp": "2018-07-19T19:19:19.408Z",
   "took": "23ms"
}
```
</details>

### wallets
Get account wallets

|Parameter|Type|Optional|Description|
| --- | --- | --- | --- |
|`market`|String\|Array of Strings|yes|Get info from specific wallet(s)
```js
Coinfield.wallets(['bch','btc','cad','dash','eth','ltc','usd','xrp'](wallets)=>{
  console.log(wallets);
});
```
<details>
<summary>View Response</summary>

```js
 {
   "wallets": [
       {
           "currency": "bch",
           "balance": "1.6471",
           "locked": "0.34654"
       },
       {
           "currency": "btc",
           "balance": "2.124892163959",
           "locked": "0.0"
       },
       {
           "currency": "cad",
           "balance": "381102.1069681547710161",
           "locked": "0.0"
       },
       {
           "currency": "dash",
           "balance": "40.0",
           "locked": "10.0"
       },
       {
           "currency": "eth",
           "balance": "0.0",
           "locked": "0.0"
       },
       {
           "currency": "ltc",
           "balance": "9.5",
           "locked": "0.0"
       },
       {
           "currency": "usd",
           "balance": "25112.1056015490000008",
           "locked": "0.0"
       },
       {
           "currency": "xrp",
           "balance": "52341.391734",
           "locked": "0.0"
       }
   ],
   "timestamp": "2018-07-19T19:50:09.969Z",
   "took": "75ms"
}
```
</details>

### fees
Get trading, withdrawal and deposit fees for your account for different currency and markets.

```js
Coinfield.fees((fees)=>{
  console.log(fees);
});
```
<details>
<summary>View Response</summary>

```js
 {
   "fees": [
       {
           "type": "deposit",
           "currency": "btc",
           "fee_type": "fixed",
           "fee_value": "0.0"
       },
       {
           "type": "withdrawal",
           "currency": "btc",
           "fee_type": "relative",
           "fee_value": "0.0009"
       },
       {
           "type": "trading",
           "market": "btccad",
           "ask_fee": "0.0049",
           "bid_fee": "0.0049"
       }
   ],
   "timestamp": "2018-08-28T17:57:54.657Z",
   "took": "12ms"
}
```
</details>

### placeorder
Place a new order.

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`options`| Object | yes | Parameters to be passed, more details below.|
|`options.market`	|String	|**mandatory**|Market in which to place an order.<br/> See [markets](#markets).|
|`options.type`|	String|**mandatory**|`bid` if you want to create buy order or `ask` if you want to create sell order|
|`options.strategy`|	String|	**mandatory**|The strategy which defines how to match and execute orders. limit|market|stop_limit|
|`options.volume`	|String	|**mandatory** *for `market` & `stop_limit` strategies*|The amount you are willing to buy or sell|
|`options.price`|	String	|**mandatory**|The price for each unit|
|`options.funds`|	String	|yes|The amount of money you are willing to spend for purchase. Applicable only to bid market orders. The system will automatically calculate the volume based on the current exchange rates and the value of parameter.|
|`options.stop_price`|String|**mandatory** *for `stop_limit` strategy*|If the strategy is "stop_limit", this value is the price at which stop limit order will be triggered.|
|`options.expiry`|String|	yes |The time at which order cancellation will be automatically triggered. Applicable only to limit or stop limit orders.|
|`options.immediate`|	String|	yes |If set to «true», limit order will be fully filled immediately or canceled if not possible to fill fully. Applicable only to limit or stop limit orders.|
```js
Coinfield.placeorder({market:"btcxrp",type:"bid",strategy:"limit", price:"32325.1233", funds:"2.1594"}(order)=>{
  console.log(order);
});
```
<details>
<summary>View Response</summary>

```js
 {
    "order": {
       "id": "mp131e0bd6900a45k1",
       "market": "ethxrp",
       "strategy": "stop_limit",
       "price": "300.0",
       "stop_price": "200.5",
       "state": "pending",
       "trades_count": 0,
       "created_at": "2018-12-03T22:57:13.000000Z",
       "updated_at": "2018-12-03T22:57:13.000000Z",
       "expiry": "2018-12-05T22:56:10.000000Z",
       "uid": "ID7BAE8297B4",
       "immediate": false,
       "volume": "0.1",
       "remaining_volume": "0.1",
       "side": "ask",
       "fee_percentage": "0.0049",
       "total_fee": "0.00049",
       "fee_currency": "xrp",
       "cost": "0.1",
       "receive": "0.09951",
       "base": "eth",
       "quote": "xrp"
    },
    "timestamp": "2018-08-21T18:38:43.070Z",
    "took": "29ms"
}
```
</details>

### getorder
Get order by ID.

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`orderid`	|String\|Number|**mandatory**|OrderID of the order for which you want to get data.|
```js
Coinfield.getorder('923654534',(order)=>{
  console.log(order);
});
```
<details>
<summary>View Response</summary>

```js
 {
    "order": {
        "id": 923654534,
        "side": "sell",
        "strategy": "limit",
        "price": "8900.0",
        "avg_price": "8900.0",
        "state": "closed",
        "market": "btccad",
        "created_at": "2018-05-03T20:30:44Z",
        "volume": "0.1",
        "remaining_volume": "0.0",
        "executed_volume": "0.1",
        "trades_count": 1,
        "trades": [
            {
                "id": 60,
                "price": "8900.0",
                "volume": "0.1",
                "funds": "890.0",
                "market": "btccad",
                "created_at": "2018-05-03T20:30:47Z",
                "side": "sell"
            }
        ]
    },
    "timestamp": "2018-08-22T22:35:21.675Z",
    "took": "1222ms"
}
```
</details>

### deleteorder
Get order by ID.

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`orderid`	|String\|Number|**mandatory**|OrderID of the order you want to delete.|
```js
Coinfield.deleteorder('2098335',(order)=>{
  console.log(order);
});
```
<details>
<summary>View Response</summary>

```js
 {
    "order": {
        "id": 2098335,
        "side": "buy",
        "ord_type": "limit",
        "price": "0.01",
        "avg_price": "0.0",
        "state": "open",
        "market": "xrpcad",
        "created_at": "2018-08-22T23:31:18Z",
        "volume": "0.1",
        "remaining_volume": "0.1",
        "executed_volume": "0.0",
        "trades_count": 0
    },
    "timestamp": "2018-08-22T23:31:25.613Z",
    "took": "263ms"
}
```
</details>

### getorders
Get your orders for a specific market

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`market`	|String|**mandatory**|Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets).|
|`options`| Object | yes | Optional parameters to be passed, more details below.|
|`options.limit`	|String|yes|Limit the number of returned trades <br/> Default value: `50`|
|`options.state`	|String|yes|Filter order by state, defaults to wait (active orders)|
|`options.page`	|String\|Number|yes|Page number of paginated results|
|`options.order_by`	|String|yes|If set, trades will be sorted in specific order (`desc`, `asc`)<br/>Default value: `desc`|
```js
Coinfield.deleteorder('2098335',(order)=>{
  console.log(order);
});
```
<details>
<summary>View Response</summary>

```js
 {
    "order": {
        "id": 2098335,
        "side": "buy",
        "ord_type": "limit",
        "price": "0.01",
        "avg_price": "0.0",
        "state": "open",
        "market": "xrpcad",
        "created_at": "2018-08-22T23:31:18Z",
        "volume": "0.1",
        "remaining_volume": "0.1",
        "executed_volume": "0.0",
        "trades_count": 0
    },
    "timestamp": "2018-08-22T23:31:25.613Z",
    "took": "263ms"
}
```
</details>

### deleteorders
Cancel all your orders for a specific market and specific side (bid|ask)

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`market`|String|**mandatory**|Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets).|
|`side`	|String|**mandatory**|Side of the orders (`ask`\|`bid`)|

```js
Coinfield.deleteorders('xrpcad','bid',(deletedorders)=>{
  console.log(deletedorders);
});
```
<details>
<summary>View Response</summary>

```js
 {
    "market": "xrpcad",
    "orders": [
        {
            "id": 1967728,
            "side": "bid",
            "strategy": "limit",
            "price": "0.46",
            "avg_price": "0.46",
            "state": "open",
            "market": "xrpcad",
            "created_at": "2018-08-21T23:37:28Z",
            "volume": "965.2173",
            "remaining_volume": "0.0",
            "executed_volume": "965.2173",
            "trades_count": 1
        },
        {
            "id": 1967673,
            "side": "bid",
            "strategy": "market",
            "price": null,
            "avg_price": "0.44",
            "state": "open",
            "market": "xrpcad",
            "created_at": "2018-08-21T23:37:02Z",
            "volume": "1.0",
            "remaining_volume": "0.0",
            "executed_volume": "1.0",
            "trades_count": 1
         }
    ],
    "timestamp": "2018-08-21T23:57:07.559Z",
    "took": "48ms"
}
```
</details>

### tradehistory
Get your trade history

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`market`	|String|**mandatory**|Specify a market pair in the format of "basequote" e.g. `btcbch` or `btcxrp`.<br/> See [markets](#markets).|
|`options`| Object | yes | Optional parameters to be passed, more details below.|
|`options.limit`	|String|yes|Limit the number of returned trades <br/> Default value: `50`|
|`options.timestamp`	|String|yes|An integer represents the seconds elapsed since Unix epoch. If set, only trades executed before the time will be returned|
|`options.from`	|String\|Number|yes|Trade id. If set, only trades done after the specified trade id will be returned|
|`options.to`	|String\|Number|yes|Trade id. If set, only trades done before the specified trade id will be returned|
|`options.order_by`	|String|yes|If set, trades will be sorted in specific order (`desc`, `asc`)<br/>Default value: `desc`|
```js
Coinfield.tradehistory('btccad',{limit:2},(history)=>{
  console.log(history);
});
```
<details>
<summary>View Response</summary>

```js
{
	"market": "btccad",
	"trades_hash": "3ef3add2b8e8f0f37ba2a9461a8ab8d1",
	"trades": [{
		"id": 47635,
		"price": "8000.0",
		"volume": "0.0001",
		"total_value": "0.8",
		"timestamp": "2018-06-25T23:40:03Z"
	}, {
		"id": 47634,
		"price": "8000.0",
		"volume": "0.0001",
		"total_value": "0.8",
		"timestamp": "2018-06-25T23:38:39Z"
	}],
	"timestamp": "2018-07-06T05:59:36.642Z",
	"took": "0ms"
}
```
</details>

### depositaddresses
Get wallet address for cryptocurrencies

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`currency`|String|**mandatory**|Currency (Cryptocurrency only) identifier e.g. `btc` or `xrp`.|

```js
Coinfield.depositaddresses('btc',(addresses)=>{
  console.log(addresses);
});
```
<details>
<summary>View Response</summary>

```js
{
    "currency": "btc",
    "address": "2Mz5WdbibRAwkejMfspErtZvwRrXC1nvFBz",
    "timestamp": "2018-08-21T05:33:38.449Z",
    "took": "37ms"
}
```
</details>

### deposits
Get your deposit history for cryptocurrencies or fiat

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`options`| Object | yes | Optional parameters to be passed, more details below.|
|`options.currency`|String|yes|Currency identifier e.g. `btc` or `cad`. <br/>If not set all currencies will be returned|
|`options.limit`|String\|Number|yes|Limit the number of returned deposits<br/>Default value: `50`|
|`options.state`|String|yes|filter results based on the state of the deposit. The following states for deposits are available:<br/>`submitted`,`canceled`,`rejected`,`accepted`|
|`options.txid`	|String|yes|Filter based on a specific transaction ID on the Blockchain. If this value is set, limit and state fields are ignored.|
```js
Coinfield.deposits({limit:2},(deposits)=>{
  console.log(deposits);
});
```
<details>
<summary>View Response</summary>

```js
{
    "deposits": [
        {
            "id": 323311,
            "currency": "cad",
            "amount": "5000.0",
            "fee": "0.0",
            "txid": null,
            "created_at": "2018-07-23T20:41:43Z",
            "confirmations": 0,
            "completed_at": "2018-07-23T20:44:52Z",
            "state": "accepted"
        },
        {
            "id": 442190,
            "currency": "bch",
            "amount": "4.9999932",
            "fee": "0.0",
            "txid": "1c2259ab2eca25817f16414ca72461ad29e636f5110fc4ea62ff24dd88ddce0f",
            "created_at": "2018-07-09T19:26:21Z",
            "confirmations": 158,
            "completed_at": "2018-07-09T19:26:21Z",
            "state": "accepted"
        }
    ],
    "timestamp": "2018-07-25T22:30:00.437Z",
    "took": "71ms"
}
```
</details>

### withdrawaladdresses
Get withdrawal destination addresses for different currencies.

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`currency`|String|**mandatory**|Currency identifier for which you want to retrieve withdrawal addresses e.g. `btc` or `cad`.|
|`options`| Object | yes | Optional parameters to be passed, more details below.|
|`options.per_page`	|String\|Number|yes|Number of results per page|
|`options.page`	|String\|Number|yes|Page number|
|`options.method`|String|yes|Filter by method, e.g. `wire`|
```js
Coinfield.withdrawaladdresses('btc',(addresses)=>{
  console.log(addresses);
});
```
<details>
<summary>View Response</summary>

```js
{
    "addresses": [
        {
            "id": 49,
            "currency": "btc",
            "type": "coin",
            "label": "default",
            "details": {
                "wallet_address": "2N651mWppUE2BQ2kYwSoDACyTvz6s7xNkbs"
            }
        },
        {
            "id": 50,
            "currency": "btc",
            "type": "coin",
            "label": "default",
            "details": {
                "wallet_address": "2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF"
            }
        }
    ],
    "timestamp": "2018-08-31T19:34:45.134Z",
    "took": "33ms"
}
```
</details>

### withdrawals
List all withdrawals

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`currency`|String|**mandatory**|Currency identifier for which you want to retrieve withdrawal addresses e.g. `btc` or `cad`.|
|`options`| Object | yes | Optional parameters to be passed, more details below.|
|`options.limit`|String\|Number|yes|Limit the number of returned results.|
|`options.page`	|String\|Number|yes|Page number|
```js
Coinfield.withdrawaladdresses('btc', {limit:2}, (addresses)=>{
  console.log(addresses);
});
```
<details>
<summary>View Response</summary>

```js
{
    "withdrawals": [
        {
            "id": 172,
            "currency": "btc",
            "type": "coin",
            "amount": "0.01",
            "fee": "0.0029",
            "txix": "2d666458fe19a529bab6daa284fda130e8b237ec764983539e0aaa29b9999ddc",
            "rid": "108",
            "state": "succeeded",
            "created_at": "2018-07-28T14:21:01Z",
            "updated_at": "2018-07-28T14:21:08Z",
            "completed_at": "2018-07-28T14:21:08Z"
        },
        {
            "id": 171,
            "currency": "btc",
            "type": "coin",
            "amount": "0.01",
            "fee": "0.0029",
            "txix": null,
            "rid": "108",
            "state": "failed",
            "created_at": "2018-07-28T14:18:24Z",
            "updated_at": "2018-07-28T14:18:30Z",
            "completed_at": "2018-07-28T14:18:30Z"
        }
   "timestamp": "2018-08-30T21:26:56.016Z",
    "took": "884ms"
}
```
</details>

### makewithdrawal
Submit a new withdrawal request for fiat or crypto

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`options`| Object | **mandatory** | Mandatory parameters to be passed, more details below.|
|`options.currency`|String|**mandatory**|Currency identifier for which you want to retrieve withdrawal addresses e.g. `btc` or `cad`.|
|`options.amount`|String\|Number|**mandatory**|Amount to be withdrawn|
|`options.destination`|String\|Number|**mandatory**|Destination ID. See [withdrawaladdresses](#withdrawaladdresses)|
|`options.otp`	|String|yes|**If OTP/2FA (Two Factor Authentication) is turned on, this value is required**|
```js
Coinfield.makewithdrawal({currency:'cad', amount:'0.01', destination:'13'}, (addresses)=>{
  console.log(addresses);
});
```
<details>
<summary>View Response</summary>

```js
{
"withdrawal": {
    "id": 238,
    "currency": "cad",
    "amount": "0.01",
    "fee": "0.0099",
    "state": "submitted"
},
"timestamp": "2018-08-30T21:26:56.016Z",
"took": "884ms"
}
```
</details>

### pricealerts
Get, Create, Update or Delete Price alerts

|Parameter | Type | Optional | Description|
| ---|---|---|---|
|`params`| Object | **mandatory** | Mandatory parameters to be passed, more details below.|
|`params.action`	|String|**mandatory**|Action to be made: `get`,`create`,`update` or `delete`|
|`params.alertID`	|String|**mandatory for `update` and `delete` only**|The Alert ID to `get`, `update` or `delete`|
|`params.market`	|String|**mandatory to `create` only**|Market for which to create a price-alert <br/>See [markets](#markets)|
|`params.price`	|String\|Number|**mandatory to `create` or `update` only**|Threshold |
|`params.trend`	|String|**mandatory to `create` or `update` only**|`up` or `down`. |
|`params.active`	|String|**mandatory to `create` or `update` only**|`true` or `false` |
```js
Coinfield.pricealerts({action:'get'}, (alerts)=>{
  console.log(alerts);
});
```
<details>
<summary>View Response</summary>

```js
{
    "alerts": [
        {
            "id": 7,
            "market": "btcusd",
            "price": "4300.0",
            "trend": "down",
            "active": true,
            "created_at": "2019-04-01T11:47:57Z",
            "updated_at": "2019-04-05T16:10:22Z"
        },
        {
            "id": 3,
            "market": "btcusd",
            "price": "5000.0",
            "trend": "up",
            "active": false,
            "created_at": "2019-04-01T11:47:57Z",
            "updated_at": "2019-04-05T16:10:22Z"
        }
    ],
    "timestamp": "2018-08-31T19:34:45.134Z",
    "took": "33ms"
}
```
</details>

## 🔗
## Websocket

*Work in Progress*
*ETA: 2020/01/01*
