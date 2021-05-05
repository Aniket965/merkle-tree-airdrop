const { getHash } = require('./utils')
class MerkleTree {
    constructor(leafs) {
        if(leafs.length === 0) throw new Error('You need to provide data to create Tree')
        this.leafs = leafs.map(ele => JSON.stringify(ele));
        this.memo = this.leafs.reduce((prev,cv,ci)=> {
            prev[cv] = ci
            return prev
        }, {})
        this.merkleRoot = null
        this.layers = this.getLayers(); 
    }
    
    getLayers() {
        const layers = [];
        layers.push(this.leafs)
        while(layers[layers.length - 1].length > 1) {
            layers.push(this.generateNextLayer(layers[layers.length - 1]))
        }
        this.merkleRoot = layers[layers.length - 1][0]
        return layers
    }
    generateNextLayer(layer) {
        return layer.reduce((acc,cv,i,elements) => {
            if( (i%2) === 0) {
                acc.push(getHash(cv,elements[i+1]))
            }
            return acc
        },[])
    }

    getRoot() {
        return this.merkleRoot
    }
    getProof(el) {
        let idx = this.memo[JSON.stringify(el)]
    
        if (typeof idx !== 'number') {
          throw new Error('Element does not exist in Merkle tree')
        }
    
        return this.layers.reduce((proof, layer) => {
          const pairElement = this.getPairElement(idx, layer)
    
          if (pairElement) {
            proof.push(pairElement)
          }
    
          idx = Math.floor(idx / 2)
    
          return proof
        }, [])
      }

      getPairElement(idx, layer) {
        const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1
        if (pairIdx < layer.length) {
          return layer[pairIdx]
        } else {
          return null
        }
      }
      verifyElementWithProof(ele,proof) {

        let pair = JSON.stringify(ele);

        for(const item of proof)  pair = getHash(pair,item)

        
        return pair === this.merkleRoot
      }
}

module.exports = {
    MerkleTree
}