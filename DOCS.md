# Documentation

## 🚶‍♀️ Getting Started  🚶
```js
const Coinfield = require('node-coinfield-api')();
```
For the purpose of keeping this documentation clean and coherant, all the examples below using the `Coinfield` namespace will refer to the constant variable declared above.

## 📢 Public Calls

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
| market |string/array of strings| yes | If not provided all markets are returned.|
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
| market |string| yes |Specify a market pair in the format of "basequote" e.g. btcbch or btcxrp.All available markets can be found at [markets](#markets). <br /> **If not provided all market tickers are returned.**|
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
| market |string| |Specify a market pair in the format of "basequote" e.g. btcbch or btcxrp.All available markets can be found at [markets](#markets). |
| limit | int | yes| Number of asks and bids array.<br />Default value: `20` |

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
| market |string| |Specify a market pair in the format of "basequote" e.g. btcbch or btcxrp.All available markets can be found at [markets](#markets). |
| limit | int | yes| Limit the number of returned price levels.<br />Default value: `300` |

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
| market |string| |Specify a market pair in the format of "basequote" e.g. btcbch or btcxrp.All available markets can be found at [markets](#markets). |
| options | object | yes| Optional parameters to be passed, more details below. |
| options.limit | int | yes| Limit number of candles. <br />Default value: `30` |
| options.period | int | yes| Candle periods.<br />Valid range: 1, 5, 15, 30, 60, 120, 240, 360, 720, 1440, 4320, 10080 <br /> Default value: `30` |
| options.from | int | yes| UNIX epoch timestamp of start time |
| options.to | int | yes| UNIX epoch timestamp of start time |

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
| market |string| |Specify a market pair in the format of "basequote" e.g. btcbch or btcxrp.All available markets can be found at [markets](#markets). |
| options | object | yes| Optional parameters to be passed, more details below. |
| options.limit | int | yes| Limit number of candles. <br />Default value: `30` |
| options.timestamp | int | yes| An integer represents the seconds elapsed since Unix epoch. If set, only trades executed before the time will be returned |
| options.from | int | yes| Trade id. If set, only trades done after the specified trade id will be returned |
| options.to | int | yes| Trade id. If set, only trades done before the specified trade id will be returned |
| options.order_by | int | yes| If set, trades will be sorted in specific order (desc, asc) <br/> Default value: `desc` |

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
## 🕵️ Private Calls

*Work in Progress*
*ETA: 2019/11/30*


## 🔗 Websocket

*Work in Progress*
*ETA: 2020/01/01*
