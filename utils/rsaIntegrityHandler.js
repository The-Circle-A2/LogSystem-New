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

    const privateKey = process.env.PRIVATE_KEY; 

    const sign = new JSEncrypt();
    sign.setPrivateKey(privateKey);
    const signature = sign.sign(ack, CryptoJS.SHA256, "sha256");

    const ackWithSig = {
        ack: ack,
        signature: signature,
    };

    return ackWithSig;
}

module.exports = {
    verifyLog,
    signAck
};