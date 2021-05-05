// author @kautukkundan
// taken from https://github.com/kautukkundan/pessimistic-swaps/blob/62c28fbdf952d94c65499b227a9b4b02c876a6b0/rollup-eif-commander/keys.ts

var { ethers } = require("ethers");
const fs = require('fs');
// initialize secp256k1 algorithm
var EC = require("elliptic").ec;
var ec = new EC("secp256k1");

function createKeyPair() {
  // generate random private key
  let secret = ethers.utils.randomBytes(32);
  let secretHex = ethers.utils.hexlify(secret);

  // generate publickey object from secret key
  let pubkey = ec.keyFromPrivate(secret).getPublic();

  // get X and Y from pubkey Object
  var x = pubkey.getX();
  var y = pubkey.getY();

  // get final points in hex format
  var pub = { x: x.toString("hex"), y: y.toString("hex") };

  // generate keccak-256 from pubkeys
  let address_keccak = ethers.utils.keccak256("0x" + pub.x + pub.y);

  // get final address from keccak digest
  let address = "0x" + address_keccak.substring(address_keccak.length - 40);

  return { secretHex, pub, address };
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let pairs = {};
for (let index = 0; index < 1005;) {
    try {
        let pair = createKeyPair();
        pairs[pair.address] ={ address:pair.address, coins: getRandomInt(10000000) + 1  };
        index++;
    } catch(er) {
    }
  
}

console.log('[*] Generated',Object.values(pairs).length,'Fake Accounts')
fs.writeFileSync('./data.json',JSON.stringify(Object.values(pairs)));