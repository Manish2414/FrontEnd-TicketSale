const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'neck empty eternal canal stage naive fringe ask demand behind frost flock',
  'https://sepolia.infura.io/v3/0edba6f286b948db93554a13444736c2' // Update with your Infura endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  // Define the constructor arguments
  const numTickets = 100; // Number of tickets
  const ticketPrice = 50; // Price per ticket in wei

  const ticketSale = await new web3.eth.Contract(abi) // Use 'abi' here
    .deploy({ data: bytecode, arguments: [numTickets, ticketPrice] })
    .send({ from: accounts[0], gasPrice: '15000000000', gas: '4700000' });

  console.log('Contract deployed to', ticketSale.options.address);

  provider.engine.stop();
};

deploy();
