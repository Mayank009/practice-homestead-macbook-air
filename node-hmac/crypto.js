var crypto = require('crypto');

console.log(crypto.createHmac("sha256", 'abc').update('1').digest("hex"));