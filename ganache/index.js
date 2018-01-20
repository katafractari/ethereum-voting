const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

const blockchainUrl = 'http://localhost:8545';
const contractFile = 'voting.sol';
const candidates = [ 'Andreja', 'Rok' ];

// Connect to blockchain server
const web3 = new Web3(new Web3.providers.HttpProvider(blockchainUrl));
// console.log('Available Ethereum accounts', web3.eth.accounts);
console.log('Connected to Ethereum');

// Compile contract
const code = fs
    .readFileSync(contractFile)
    .toString();
const compiledCode = solc.compile(code);

// New contract callback
const handleNewContract = (err, myContract) => {
    if (!err) {
        if (myContract.address) {
            console.log(`Deployed contract from=${web3.eth.accounts[0]}, contractAddress=${deployedContract.address}`);

            // Interact with contract
            const contractInstance = votingContract.at(deployedContract.address);
            console.log(contractInstance.totalVotesFor.call('Andreja'));
            console.log(contractInstance.totalVotesFor.call('Rok'));
            console.log(contractInstance.voteForCandidate('Andreja', {from: web3.eth.accounts[0]}));
            console.log(contractInstance.voteForCandidate('Andreja', {from: web3.eth.accounts[0]}));
            console.log(contractInstance.totalVotesFor.call('Andreja'));
        }
    }
};

// Deploy contract
const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
const votingContract = web3.eth.contract(abiDefinition);
const byteCode = compiledCode.contracts[':Voting'].bytecode;
const deployedContract = votingContract.new(candidates, {
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
}, handleNewContract);

