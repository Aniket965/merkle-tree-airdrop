var crypto = require('crypto');


function compare( a, b ) {
    if ( a.address < b.address ){
      return -1;
    }
    if ( a.address > b.address ){
      return 1;
    }
    return 0;
  }
  
 const getHash = (f,s) => {
    const data = [s,f];
    data.sort()
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');

}

module.exports = {
    getHash,
    compare
}