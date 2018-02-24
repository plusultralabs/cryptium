// Import helpers
var helpers = require("./helpers");
var aescipher = require("./aescipher");

/**
 * Convert a byte array to a hex string
 * Implementation from crypt-js
 * @param {number} bytes 
 */
function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return hex.join("");
}

/** 
 * Generates a crypto secure random string
* @param {number} items
* items is the number of random hex characters, as the minimum item is a 32 bytes the minimum output is 4
*/
function getRandomValues(items) {
  var token = "";

  if (helpers.isNode()) {
    // Node version
    // note that in the browser the items are 32bits whereas here are Bytes
    // i.e. 4 times longer in the browser
    var buffer = require("crypto").randomBytes(items * 4);
    token = buffer.toString("hex");
  } else if (window.crypto != "undefined") {
    // Browser version
    var cryptoObj = window.crypto || window.msCrypto; // for IE 11
    var array = new Uint32Array(items);
    cryptoObj.getRandomValues(array);
    token = bytesToHex(array);
  }
  return token;
}

// add a salt to a given string
/**
 * 
 * @param {string} input 
 * @param {string} saltBytes 
 */
function addSalt(input, saltBytes) {
  var newString = input + "|" + getRandomValues(saltBytes);
  return newString;
}

/**
 * remove salt from a salted string
 * @param {string} saltedString 
 */
function removeSalt(saltedString) {
  var fields = saltedString.split("|");
  return fields[0];
}

/**
 * get encryption based on RSA pub-priv keys
 * @param {string} pub public key
 * @param {string} priv private key
 */
function createEncrypter(pub, priv) {
  if (helpers.isNode()) {
    return new helpers.Node_RSA(pub, priv);
  } else {
    return new helpers.Browser_RSA(pub, priv);
  }
}

/**
 * get cipher based on AES
 * @param {string} password password for the ecnriptio
 * @param {string} iv_input inititalization vector in base 64 (optional)
 */
function createCipher(password, iv_input) {
  if (iv_input == undefined) {
    // generate a new iv
    if (helpers.isNode()) {
      var iv = aescipher.Node_createIv();
    } else {
      var iv = aescipher.Browser_createIv();
    }
  } else {
    var iv = iv_input;
  }
  if (helpers.isNode()) {
    return new aescipher.Node_aes_cipher(password, iv);
  } else {
    return new aescipher.Browser_cipher(password, iv);
  }
}
/**
 * Encrypts an Notification and it's content
 * 
 * @param  {string} destination
 * @param  {string} content
 * @param  {string} pub
 */
function encryptNotification(destination, content, pub) {
  var encrypt = createEncrypter(pub, null);
  var encryptedDestination = encrypt.encrypt(destination);
  // encrypt content using AES
  var AESCipher = createCipher(destination);
  var iv = AESCipher.getIv();
  return AESCipher.encrypt(content).then(function(encryptedContent) {
    return { destination: encryptedDestination, iv: iv, content: encryptedContent };
  });
}

/**
 * decrypt an Notification
 * 
 * @param  {string} destination
 * @param  {string} content
 * @param  {string} iv
 * @param  {string} priv
 */
function decryptNotification(destination, content, iv, priv) {
  var encrypt = createEncrypter(null, priv);
  var decryptedNotification = encrypt.decrypt(destination);
  // encrypt content using AES
  var AESCipher = createCipher(decryptedNotification, iv);
  return AESCipher.decrypt(content).then(function(decryptedContent ) {
    return { destination: decryptedNotification, content: decryptedContent };
  });
}

// module exports
module.exports = {
  getRandomValues: getRandomValues,
  addSalt: addSalt,
  removeSalt: removeSalt,
  createEncrypter: createEncrypter,
  createCipher: createCipher,
  encryptNotification: encryptNotification,
  decryptNotification: decryptNotification
};
