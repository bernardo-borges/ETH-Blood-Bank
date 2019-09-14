const Web3 = require("web3");


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",// <----- truffle address (localhost)
      port: 9000,    // <----- truffle port
      network_id: "*" // Match any network id
    },

  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}