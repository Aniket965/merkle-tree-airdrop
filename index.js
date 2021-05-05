const data = require('./data.json')
const MerkleTree = require('./lib/merkleTree').MerkleTree;
const {compare,getHash} = require('./lib/utils');

data.sort(compare)

const tree = new MerkleTree(data.slice(0,1000));
const proof = tree.getProof(data[2]);

console.log(data[2])
console.log('Is this address part of Airdrop',tree.verifyElementWithProof(data[2],proof))

console.log(data[1002])
console.log('Is this address part of Airdrop',tree.verifyElementWithProof(data[1001],proof))