var cryptium = require('./cryptium')
var tape = require('tape')
var _test = require('tape-promise').default 
var test = _test(tape)

test('it generates a salt',(t)=>{
    t.plan(2)
    let randomString = cryptium.getRandomValues(10)
    // has 4 times the required length
    let value = randomString.length
    let expected = 10*4*2
    t.equal(value,expected,'correct length')
    // is a string
    value = typeof randomString
    expected = "string"
    t.equal(value,expected,'is a string')
})

test('it adds  and removes a salt to string',(t)=>{
    t.plan(3)
    let email = "test@emailservice.com"
    let saltedString = cryptium.addSalt(email,10)
    // has 4 times the required length
    let value = saltedString.length
    let expected = email.length + 1 + 10*4*2
    t.equal(value,expected,'correct length')
    // is a string
    value = typeof saltedString
    expected = "string"
    t.equal(value,expected,'correctly removes salt')
    // remove salt
    let cleanedString = cryptium.removeSalt(saltedString)
    t.equal(cleanedString,email,'correctly removes salt')
})

var PRIVKEY= "-----BEGIN RSA PRIVATE KEY-----\n"+
"MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ\n"+
"WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR\n"+
"aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB\n"+
"AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv\n"+
"xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH\n"+
"m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd\n"+
"8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF\n"+
"z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5\n"+
"rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM\n"+
"V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe\n"+
"aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil\n"+
"psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz\n"+
"uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876\n"+
"-----END RSA PRIVATE KEY-----"

var PUBKEY = "-----BEGIN PUBLIC KEY-----\n" +
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n" +
"FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n" +
"xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n" +
"gwQco1KRMDSmXSMkDwIDAQAB\n" +
"-----END PUBLIC KEY-----"


test('it encrypts and decrypts a given string',(t)=>{
    t.plan(2)
    var encrypt = cryptium.createEncrypter(PUBKEY,PRIVKEY)
    let email = "test@emailservice.com"
    let saltedString = cryptium.addSalt(email,5)
    let encryptedString = encrypt.encrypt(saltedString)
    let decryptedString = encrypt.decrypt(encryptedString)
    // has 4 times the required length
    t.equal(decryptedString,saltedString,'correct encryption decryption in server')
    // encripted from browser
    var browser_encrypted = "fzGBiKAGh6MXvgWU3IW+rJQRCwQJKw7R9ztSdB6skkGYqYGk2izlImQC/mpaOlceptftiHFgtIeT0UK1q3urMn1/39AyRquYmNf+dmfBtZsavFoCHJZrDO4stzmobSDFnwEXHKwBNiPdShpqRn+zuQlRmgwb1viqP28SrEzzkHA="
    var encrypt_2 = cryptium.createEncrypter(null,PRIVKEY)
    let browser_decryptedString = encrypt_2.decrypt(browser_encrypted)
    // correct
    t.equal(browser_decryptedString,email,'correct decryption client-server')
})


test('it encrypts and decrypts a full email structure',(t)=>{
    t.plan(4)
    let email = "test@emailservice.com"
    let content = "<h1>This is some tests for encryption</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, \n sunt in culpa qui officia deserunt mollit anim id est laborum. </p>"
    cryptium.encryptNotification(email,content,PUBKEY).then((encrypt)=>{
        cryptium.decryptNotification(encrypt.destination,encrypt.content,encrypt.iv,PRIVKEY).then(decrypted=>{
            t.equal(email,decrypted.destination,'correct email handling')
            t.equal(content,decrypted.content,'correct content handling')
        })
    })
    // from browser
    let browser_email ="test@email.com"
    let browser_content ="this a plain text test !@£$%^&*()/\n"
    browser_encrypt = {destination: "1IU4Nr3KuYz9KbA3BQyqwbSDF1nBh/2Ses5pKyRpng1GhOBAlFVk+iBieaJQKMK3l7pM/Fs32Om3+rJlgh05kYFBELuFRGcYv5uaw2tyOiZDmcl0KtA7kPI1+baR0U6GY4e6X3qhZ7rm4T18ggbJMXOsKFi5p+0LMk3dF1/DqBo=", iv: "CLAm16ZnOmfM+uf29MFGvg==", content: "ShzGM8U8w2F0zTe3s4k1Uk+st/djSxYH7ZW6tVRBAF34btNfjgdJBCHx77oABeTh"}
    cryptium.decryptNotification(browser_encrypt.destination,browser_encrypt.content,browser_encrypt.iv,PRIVKEY).then(decrypted=>{
            t.equal(browser_email,decrypted.destination,'correct email handling from client')
            t.equal(browser_content,decrypted.content,'correct content handling from client')
    })
})
