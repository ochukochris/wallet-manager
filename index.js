const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util')

// Variables
const ethPath = "m/44'/60'/0'/0/"; // last param should be {account_index}

// Methods
const generateMnemonic = () => {
    return bip39.generateMnemonic(); //generates string (mnemonic)
}

const generateEthAccounts = async (words = "", start = 0, end = 1) => {
    const mnemonic = words ? words : generateMnemonic()
    const seed = await bip39.mnemonicToSeed(mnemonic); //creates seed buffer
    const root = hdkey.fromMasterSeed(seed);

    const accounts = []
    const keys = []
    for (let index = start; index < end; index++) {
        // creates an address node
        const addrNode = root.derive(ethPath + index);
        const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
        const addr = ethUtil.publicToAddress(pubKey).toString('hex');
        const address = ethUtil.toChecksumAddress('0x' + addr);
        accounts.push(address)
        keys.push('0x' + addrNode._privateKey.toString('hex'))
    }

    return [accounts, keys, mnemonic]
}

(async () => {
    const res = await generateEthAccounts("", 0, 10)
    console.log(res[0]);
    console.log(res[1]);
    console.log("Mnemonic:", res[2]);
})()
