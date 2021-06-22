global.window = {};

const JSEncrypt = require('JSEncrypt/bin/jsencrypt');
const CryptoJS = require("crypto-js");

function verifyLog(log){

    const publicKey = process.env.PUBLIC_KEY; 

    const verify = new JSEncrypt({default_key_size: 512});
    verify.setPublicKey(publicKey);

    if(verify.verify(log.message + log.timestamp, log.signature, CryptoJS.SHA256)) {
        return true;
    } else {
        return false;
    }

}

function signResponse(response){

    // TODO: change to private key of log server
    const privateKey = process.env.SERVER_TEST_PK; 

    const sign = new JSEncrypt();

    sign.setPrivateKey(privateKey);
    const signature = sign.sign(response.message + response.timestamp, CryptoJS.SHA256, "sha256");

    const responseWithSig = {
        message: response,
        signature: signature
    };

    return responseWithSig;
}

module.exports = {
    verifyLog,
    signResponse
};