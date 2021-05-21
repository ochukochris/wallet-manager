const peercoin = require('../peercoin-libs/Peercoin');
const base58 = require('../peercoin-libs/Base58');
const createHash = require('create-hash');
  
module.exports.createPeercoinWif = (privateKey) => {
    const pkWIF = 'B7' + privateKey + '01';

    var firstSHA = createHash('sha256').update(pkWIF).digest();
    var secondSHA = createHash('sha256').update(firstSHA).digest();
    const checksum = secondSHA.slice(0, 8);

    const wif = base58.encode(peercoin.Crypto.hexToBytes(pkWIF + checksum));
    return wif;
}