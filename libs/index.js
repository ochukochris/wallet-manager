const createHash = require('create-hash');
const bs58check = require('bs58check');
  
module.exports.createPeercoinWif = (privateKey) => {
    const pkWIF = 'B7' + privateKey + '01';
    var firstSHA = createHash('sha256').update(pkWIF).digest();
    var secondSHA = createHash('sha256').update(firstSHA).digest();
    const checksum = secondSHA.slice(0, 8);
    const step4 = pkWIF.toString('hex') + checksum;
    const wif = bs58check.encode(Buffer.from(step4, 'hex'));
    return wif;
}