global.window = {};

const JSEncrypt = require('JSEncrypt/bin/jsencrypt');
const CryptoJS = require("crypto-js");

function verifyLog(log){

    const publicKey = process.env.PUBLIC_KEY; 

    const verify = new JSEncrypt({default_key_size: 512});
    verify.setPublicKey(publicKey);

    if(verify.verify(log.message + log.signature, CryptoJS.SHA256)) {
        console.log("Verification OK");
    }

    console.log("Verification failure");

}

function signAck(ack){

    const privateKey = process.env.SERVER_TEST_PK; 

    const sign = new JSEncrypt();
    const timestamp = Date.now();

    sign.setPrivateKey(privateKey);
    const signature = sign.sign(ack + timestamp, CryptoJS.SHA256, "sha256");

    const ackWithSig = {
        ack: ack,
        signature: signature,
        timestamp: timestamp
    };

    return ackWithSig;
}

module.exports = {
    verifyLog,
    signAck
};