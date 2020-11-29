const Coinfield = require('./src/index.js')({
  verbose:true,
  APIKEY: 'eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzQ3Mzk1NDYsImV4cCI6MTU3NDc0MzEzMCwic3ViIjoic2Vzc2lvbiIsImlzcyI6InVhYyIsInNjcCI6WyJvcmRlcnMiXSwiYXBpIjp0cnVlLCJqdGkiOiJkYmFjMzVkNS0zOTFmLTQ0NTgtYjg5Ni1iNDg2M2Y0YTA0MWQiLCJ1aWQiOiJJREQ1NDM1NkU3RDYiLCJlbWFpbCI6ImZpdHNiYWNoaW50ZXJhY3RpdmVAZ21haWwuY29tIn0.FILoImKGVhwC1CYRnr6r6p0nn7Qy1V6d7MiQGQmqGBo_Iz_gg9S4TqvZ0FLxtCbmPae8OogKaOuNX3Zx4uKAl8xAa5bo-Yts8IkSn6jDCCORNO160H8qKM3wrBeDhJO_6izXsWP4jYwFrAh6xlDIAP0s2N9olvQIVAU5HguOiB9dJqQoQ-k1dm3m15pLGd62FbDgUwO42b3hDc2V5p21W-khL_S-BamTXf8fWLoKifZBYibhZpstJ0v2Y0vZla2n2zDO1JXdplbhCXElZDr4RsS05K9V1BEtVCPQlkt-zOlPdmTG5rpY0JS3uP_NtZ-ED5rWFD0jZLx7R-TNY_C4sg'
});

Coinfield.socket.handler.on('orderbook_updates__xrpusd', function(data){
    console.log(data);
})
Coinfield.socket.handler.on('trades_updates__xrpusd', function(data){
    console.log(data);
})
Coinfield.socket.subscribe.market("btcxrp");

// setInterval(function(){
//   console.log("=========================================");
//   console.log("=========================================");
// },2000)
