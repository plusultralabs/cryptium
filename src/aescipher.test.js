var aescipher = require("./aescipher");
var tape = require("tape");
var _test = require("tape-promise").default;
var test = _test(tape);

test("it encrypts and decrypt with aes", t => {
  t.plan(1);
  let pass = "somePassword@test.net";
  let iv = aescipher.Node_createIv();
  let cipher = new aescipher.Node_aes_cipher(pass, iv);
  // has 4 times the required lengthandomString.length
  let value =
    "<h1>This is some tests for encryption</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, \n sunt in culpa qui officia deserunt mollit anim id est laborum. </p>";
  console.log(iv);
  cipher
    .encrypt(value)
    .then(encrypted => {
      console.log(encrypted);
      return cipher.decrypt(encrypted);
    })
    .then(decrypted => {
      t.equal(value, decrypted, "correct encryption decryption");
      t.end();
    });
});
