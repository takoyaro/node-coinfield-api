# Node Coinfield API

This project is designed to help you make your own projects that interact with the Coinfield API. This project seeks to have complete API coverage including private calls and Websocket.

[![Coinfield](https://github.com/takoyaro/node-coinfield-api/raw/master/icons/coinfield.png)](https://coinfield.com/ref/0/IDD54356E7D6)

*I would like to point out that this is an unofficial script as Coinfield doesn't provide anything else than their REST and SocketIO API*

### 📓 Documentation
In an attempt to keep this Readme short and sweet, you can find a few examples on how to use ***Node Coinfield API*** below but refer to the [documentation](https://github.com/takoyaro/node-coinfield-api/blob/master/DOCS.md) for the **complete** list of calls.

### 💻 Installation

```sh
npm i node-coinfield-api --save
```

### 📜 Getting Started

```js
const Coinfield = require('node-coinfield-api')({
APIKEY: //YOUR API KEY HERE - ONLY REQUIRED FOR PRIVATE CALLS
});
```

##### Getting Server Status
```js
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

##### Get all available markets
```js
Coinfield.markets((markets)=>{
  console.log(markets);
});
```
<details>
 <summary>View Response</summary>
```js
{ markets:
   [ { id: 'btcxrp',
       name: 'BTC/XRP',
       ask_precision: 8,
       bid_precision: 4,
       minimum_volume: '0.001',
       maximum_volume: '50.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'ethxrp',
       name: 'ETH/XRP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '0.1',
       maximum_volume: '300.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'xlmxrp',
       name: 'XLM/XRP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '200.0',
       maximum_volume: '600000.0',
       minimum_funds: '25.0',
       maximum_funds: '400000.0' },
     { id: 'ltcxrp',
       name: 'LTC/XRP',
       ask_precision: 2,
       bid_precision: 4,
       minimum_volume: '0.1',
       maximum_volume: '1000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'dashxrp',
       name: 'DASH/XRP',
       ask_precision: 3,
       bid_precision: 4,
       minimum_volume: '0.1',
       maximum_volume: '500.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'bchxrp',
       name: 'BCH/XRP',
       ask_precision: 3,
       bid_precision: 4,
       minimum_volume: '0.05',
       maximum_volume: '400.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'zecxrp',
       name: 'ZEC/XRP',
       ask_precision: 3,
       bid_precision: 4,
       minimum_volume: '0.1',
       maximum_volume: '500.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'dashcad',
       name: 'DASH/CAD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '500.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'btgxrp',
       name: 'BTG/XRP',
       ask_precision: 2,
       bid_precision: 4,
       minimum_volume: '0.5',
       maximum_volume: '2000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'zrxxrp',
       name: 'ZRX/XRP',
       ask_precision: 1,
       bid_precision: 4,
       minimum_volume: '10.0',
       maximum_volume: '100000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'gntxrp',
       name: 'GNT/XRP',
       ask_precision: 1,
       bid_precision: 4,
       minimum_volume: '10.0',
       maximum_volume: '100000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'repxrp',
       name: 'REP/XRP',
       ask_precision: 3,
       bid_precision: 4,
       minimum_volume: '1.0',
       maximum_volume: '2000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'omgxrp',
       name: 'OMG/XRP',
       ask_precision: 2,
       bid_precision: 4,
       minimum_volume: '3.0',
       maximum_volume: '5000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'batxrp',
       name: 'BAT/XRP',
       ask_precision: 1,
       bid_precision: 4,
       minimum_volume: '50.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'zilxrp',
       name: 'ZIL/XRP',
       ask_precision: 1,
       bid_precision: 4,
       minimum_volume: '300.0',
       maximum_volume: '999999.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'xrpcad',
       name: 'XRP/CAD',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '25.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'xrpusd',
       name: 'XRP/USD',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '40.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'btcusdc',
       name: 'BTC/USDC',
       ask_precision: 8,
       bid_precision: 2,
       minimum_volume: '0.002',
       maximum_volume: '50.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'xrpusdc',
       name: 'XRP/USDC',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '20.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'xrpeur',
       name: 'XRP/EUR',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '20.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'xrpgbp',
       name: 'XRP/GBP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '20.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'btcgbp',
       name: 'BTC/GBP',
       ask_precision: 8,
       bid_precision: 2,
       minimum_volume: '0.001',
       maximum_volume: '50.0',
       minimum_funds: '15.0',
       maximum_funds: '500000.0' },
     { id: 'ethgbp',
       name: 'ETH/GBP',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '300.0',
       minimum_funds: '15.0',
       maximum_funds: '500000.0' },
     { id: 'xlmgbp',
       name: 'XLM/GBP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '100.0',
       maximum_volume: '600000.0',
       minimum_funds: '15.0',
       maximum_funds: '500000.0' },
     { id: 'ltcgbp',
       name: 'LTC/GBP',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '1000.0',
       minimum_funds: '15.0',
       maximum_funds: '500000.0' },
     { id: 'dgbgbp',
       name: 'DGB/GBP',
       ask_precision: 2,
       bid_precision: 6,
       minimum_volume: '300.0',
       maximum_volume: '999999.0',
       minimum_funds: '15.0',
       maximum_funds: '500000.0' },
     { id: 'xrpaed',
       name: 'XRP/AED',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '20.0',
       maximum_volume: '200000.0',
       minimum_funds: '50.0',
       maximum_funds: '999999.0' },
     { id: 'xrpjpy',
       name: 'XRP/JPY',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '20.0',
       maximum_volume: '2000000.0',
       minimum_funds: '1500.0',
       maximum_funds: '200000000.0' },
     { id: 'btceur',
       name: 'BTC/EUR',
       ask_precision: 8,
       bid_precision: 2,
       minimum_volume: '0.001',
       maximum_volume: '50.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'etheur',
       name: 'ETH/EUR',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '300.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'ltceur',
       name: 'LTC/EUR',
       ask_precision: 2,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '1000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'xlmeur',
       name: 'XLM/EUR',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '100.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'dgbeur',
       name: 'DGB/EUR',
       ask_precision: 2,
       bid_precision: 6,
       minimum_volume: '300.0',
       maximum_volume: '9999999.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'btccad',
       name: 'BTC/CAD',
       ask_precision: 8,
       bid_precision: 2,
       minimum_volume: '0.002',
       maximum_volume: '50.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'ethcad',
       name: 'ETH/CAD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '300.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'ltccad',
       name: 'LTC/CAD',
       ask_precision: 2,
       bid_precision: 2,
       minimum_volume: '0.15',
       maximum_volume: '1000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'btcusd',
       name: 'BTC/USD',
       ask_precision: 8,
       bid_precision: 2,
       minimum_volume: '0.0021',
       maximum_volume: '50.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'ethusd',
       name: 'ETH/USD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '300.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'ltcusd',
       name: 'LTC/USD',
       ask_precision: 2,
       bid_precision: 2,
       minimum_volume: '0.2',
       maximum_volume: '1000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'xlmcad',
       name: 'XLM/CAD',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '200.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'bchcad',
       name: 'BCH/CAD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.05',
       maximum_volume: '400.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'dgbcad',
       name: 'DGB/CAD',
       ask_precision: 2,
       bid_precision: 6,
       minimum_volume: '1000.0',
       maximum_volume: '999999.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'zeccad',
       name: 'ZEC/CAD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.15',
       maximum_volume: '500.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'zrxcad',
       name: 'ZRX/CAD',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '40.0',
       maximum_volume: '100000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'xlmusd',
       name: 'XLM/USD',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '200.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '300000.0' },
     { id: 'dashusd',
       name: 'DASH/USD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.1',
       maximum_volume: '500.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'zecusd',
       name: 'ZEC/USD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.2',
       maximum_volume: '500.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'dgbusd',
       name: 'DGB/USD',
       ask_precision: 2,
       bid_precision: 6,
       minimum_volume: '1000.0',
       maximum_volume: '999999.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'bchusd',
       name: 'BCH/USD',
       ask_precision: 4,
       bid_precision: 2,
       minimum_volume: '0.05',
       maximum_volume: '200.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'zrxusd',
       name: 'ZRX/USD',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '50.0',
       maximum_volume: '100000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'batusd',
       name: 'BAT/USD',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '50.0',
       maximum_volume: '200000.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'loomxrp',
       name: 'LOOM/XRP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '300.0',
       maximum_volume: '999999.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'dgbxrp',
       name: 'DGB/XRP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '300.0',
       maximum_volume: '999999.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'cvcxrp',
       name: 'CVC/XRP',
       ask_precision: 4,
       bid_precision: 4,
       minimum_volume: '300.0',
       maximum_volume: '999999.0',
       minimum_funds: '20.0',
       maximum_funds: '500000.0' },
     { id: 'btcjpy',
       name: 'BTC/JPY',
       ask_precision: 8,
       bid_precision: 2,
       minimum_volume: '0.001',
       maximum_volume: '50.0',
       minimum_funds: '1500.0' } ],
  timestamp: '2019-11-23T02:35:51.296Z',
  took: '0ms' }
```
</details>

### Development

At this point in time, implementation of the public and private calls to the REST API is completed as well as the implementation of the Websocket API.
Therefore, at this point, the development will go towards optimization, fixing issues *when they come* and keeping the code up-to-date should Coinfield decide to update their API.

#### ☕ Keep a fellow Developer hydrated

![XRP](https://github.com/takoyaro/node-coinfield-api/raw/master/icons/xrp.svg?sanitize=true)XRP: `rptgFJ9E1SFMTSGQfrZWVDM6Pf5P5Ui2uk` <br />
![XRP](https://github.com/takoyaro/node-coinfield-api/raw/master/icons/eth.svg?sanitize=true)ETH: `0x821d8D60d43229fBFD6fcD5aD97450D1A164547f`<br />
![BTC](https://github.com/takoyaro/node-coinfield-api/raw/master/icons/btc.svg?sanitize=true)BTC: `17NwZQ86HswwHLEDfBkhu6kZUoUZy4CGSG`



[![HitCount](http://hits.dwyl.io/takoyaro/node-coinfield-api.svg)](http://hits.dwyl.io/takoyaro/node-coinfield-api)
