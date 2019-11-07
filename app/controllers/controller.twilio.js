'use strict';
var twilio = require('twilio');

var accountSid = 'AC4a2ca0234b64bbec2ececdacfb0e4592'; // Your Account SID from www.twilio.com/console
var authToken = 'b3bad030ecaa3c582901aaf756fe456d';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: 'whatsapp:+593986865422',  // Text this number
    from: 'whatsapp:+14155238886' // From a valid Twilio number
})
.then((message) => console.log(message.sid));