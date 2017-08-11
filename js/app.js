var App = {
  web3Provider: null,
  contracts: {},

  init: function(){
    App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
   $.getJSON('SimpleWallet.json', function(data) {
     console.log("asdf");
     // Get the  contract artifact file and instantiate it with truffle-contract.
     var SimpleWalletArtifact = data;
     App.contracts.SimpleWallet = TruffleContract(SimpleWalletArtifact);

     App.contracts.SimpleWallet.setProvider(App.web3Provider);

     return 0;
   });
   return 0;
 },

 getVal: function(){
   App.contracts.SimpleWallet.deployed().then(function(instance) {
     contractInstance = instance;
     //console.log(contractInstance.getHashAt.call());
     return contractInstance.getBalance.call();
   }).then(function(res){
     App.println(res['c'][0]);
     console.log(App.contracts.SimpleWallet.address);
   });
   /*web3.eth.getAccounts(function(error,accounts){
     if (error) {
       console.log(error);
     }
     var account = accounts[0];
   });*/
 },

 checkContractBalance: function(){
   App.contracts.SimpleWallet.deployed().then(function(instance) {
     contractInstance = instance;
     //console.log(contractInstance.getHashAt.call());
     return contractInstance.coolShit.call();
   }).then(function(res){
     App.println(res['c'][0]);
   });
 },

 tryWithdrawl: function(){
   web3.eth.getAccounts(function(error,accounts){
     if (error) {
       console.log(error);
     }
     var account = accounts[0];
     App.contracts.SimpleWallet.deployed().then(function(instance) {
       contractInstance = instance;
       return contractInstance.refund({from: account});
     }).then(function(res){
       App.println(res);
     }).then(function(err){
       console.log(err);
     });
   });
 },

 println: function(val){
   $(".consoleOutput").append(val + "<br>");

 }

};

$(".but").click(function(){
  App.getVal();
});

$(".otherBut").click(function(){
  App.checkContractBalance();
});

$(".withdrawl").click(function(){
  App.tryWithdrawl();
});


$(function() {
  $(window).load(function() {
    App.init();
  });
});
