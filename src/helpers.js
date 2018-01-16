function isNode() {
  return typeof window === "undefined";
}

// Browser encryption decryption
function Browser_RSA(pubkey, privkey) {
  this.pubkey = pubkey;
  this.privkey = privkey;
}
Browser_RSA.prototype.encrypt = function(input) {
  var JSEncrypt = require("./jsencrypt");
  var encrypter = new JSEncrypt.JSEncrypt();
  encrypter.setPublicKey(this.pubkey);
  return encrypter.encrypt(input);
};
Browser_RSA.prototype.decrypt = function(input) {
  var JSEncrypt = require("./jsencrypt");
  var encrypter = new JSEncrypt.JSEncrypt();
  encrypter.setPrivateKey(this.privkey);
  return encrypter.decrypt(input);
};

// Node side encryption decryption
function Node_RSA(pubkey, privkey) {
  this.privateKey = privkey;
  this.publicKey = pubkey;
}
Node_RSA.prototype.encrypt = function(toEncrypt) {
  var crypto = require("crypto");
  var buffer = new Buffer(toEncrypt);
  var encrypted = crypto.publicEncrypt(
    { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer
  );
  return encrypted.toString("base64");
};
Node_RSA.prototype.decrypt = function(toDecrypt) {
  var crypto = require("crypto");
  var buffer = new Buffer(toDecrypt, "base64");
  var decrypted = crypto.privateDecrypt(
    { key: this.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer
  );
  return decrypted.toString("utf8");
};

module.exports = {
  isNode: isNode,
  Browser_RSA: Browser_RSA,
  Node_RSA: Node_RSA
};
