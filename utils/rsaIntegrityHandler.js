const JSEncrypt = require('JSEncrypt/bin/jsencrypt');
const CryptoJS = require("crypto-js");

function verifyLog(log){

    const publicKey = process.env.PUBLIC_KEY; 

    const verify = new JSEncrypt({default_key_size: 512});
    verify.setPublicKey(publicKey);

    if(verify.verify(log.message + log.time, log.signature, CryptoJS.SHA256)) {
        return resolve();
    }

    return reject();

}

function signLog(logMessage){

    const privateKey = process.env.PRIVATE_KEY; 

    const sign = new JSEncrypt();
    sign.setPrivateKey(privateKey);
    const timestamp = Date.now();
    const signature = sign.sign(logMessage + timestamp, CryptoJS.SHA256, "sha256");

    const logWithSig = {
        log: logMessage,
        signature: signature,
        timestamp: timestamp,
    };

    return logWithSig;
}

module.exports = {
    verifyLog,
    signLog
};