// compatible cipher between browser and node server
var NODE_ALG = "aes-256-cbc";
var BROWSER_ALG = "AES-CBC";
var BROWSER_HASH = "SHA-256";
var NODE_HASH = "sha256";

/**
 * get cipher based on AES
 * @param {string} password password for the ecnription
 * @param {string} iv_string inititalization vector in base 64 (optional)
 */
function Browser_cipher(password, iv_string) {
  this.iv_string = iv_string;
  this.iv = fromBase64(iv_string);
  this.pwUint8 = new TextEncoder().encode(password);
}

/**
 * Init key
 */
Browser_cipher.prototype.getKey = function() {
  return crypto.subtle.digest(BROWSER_HASH, this.pwUint8).then(pwHash => {
    this.pwHash = pwHash;
    this.alg = {
      name: BROWSER_ALG,
      iv: this.iv
    };
    return crypto.subtle
      .importKey("raw", this.pwHash, this.alg, false, ["encrypt", "decrypt"])
      .then(key => {
        this.key = key;
        return this;
      });
  });
};

/**
 * encrypt a string
 * @param {string} toEncrypt string to be encrypted
 */
Browser_cipher.prototype.encrypt = function(toEncrypt) {
  return this.getKey()
    .then(() => {
      var ptUtf8 = new TextEncoder().encode(toEncrypt);
      return crypto.subtle.encrypt(this.alg, this.key, ptUtf8);
    })
    .then(arrayBuffer => {
      return toBase64(arrayBuffer);
    });
};

/**
 * decrypt a string
 * @param {string} toDecrypt string to be decrypted
 */
Browser_cipher.prototype.decrypt = function(toDecrypt) {
  return this.getKey().then(() => {
    ctBuffer = fromBase64(toDecrypt);
    return crypto.subtle
      .decrypt(this.alg, this.key, ctBuffer)
      .then(ptBuffer => {
        return (plaintext = new TextDecoder().decode(ptBuffer));
      });
  });
};

/**
 * get the initialization vector
 * @return {string} the initialization vector in base64
 */
Browser_cipher.prototype.getIv = function() {
  return this.iv_string;
};

/**
 * create a random initialization vector
 * @return {string} the initialization vector in base64
 */
function Browser_createIv() {
  return toBase64(crypto.getRandomValues(new Uint8Array(16)));
}

function toBase64(arrayBuffer) {
  return btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
}
// from base 64 to uint8 array
function fromBase64(base64_string) {
  return Uint8Array.from(atob(base64_string), character =>
    character.charCodeAt(0)
  );
}

/**
 * get cipher based on AES, Node side encryption decryption
 * @param {string} password password for the ecnription
 * @param {string} iv_string inititalization vector in base 64 (optional)
 */
function Node_aes_cipher(password, iv) {
  var crypto = require("crypto");
  this.key = crypto.createHash(NODE_HASH).update(password, "utf8").digest();
  this.iv = new Buffer(iv, "base64");
}

/**
 * encrypt a string
 * @param {string} toEncrypt string to be encrypted
 */
Node_aes_cipher.prototype.encrypt = function(toEncrypt) {
  var crypto = require("crypto");
  var cipher = crypto.createCipheriv(NODE_ALG, this.key, this.iv);
  var encrypted = cipher.update(toEncrypt, "utf8", "base64");
  encrypted += cipher.final("base64");
  return new Promise((res, rej) => {
    res(encrypted);
  });
};

/**
 * decrypt a string
 * @param {string} toDecrypt string to be decrypted
 */
Node_aes_cipher.prototype.decrypt = function(toDecrypt) {
  var crypto = require("crypto");
  // create the decipher
  var decipher = crypto.createDecipheriv(NODE_ALG, this.key, this.iv);
  var decrypted = decipher.update(toDecrypt, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return new Promise((res, rej) => {
    res(decrypted);
  });
};

/**
 * get the initialization vector
 * @return {string} the initialization vector in base64
 */
Node_aes_cipher.prototype.getIv = function() {
  return this.iv.toString("base64");
};

/**
 * create a random initialization vector
 * @return {string} the initialization vector in base64
 */
function Node_createIv() {
  var crypto = require("crypto");
  return new Buffer(crypto.randomBytes(16)).toString("base64");
}

module.exports = {
  Node_aes_cipher,
  Browser_cipher,
  Browser_createIv,
  Node_createIv
};
