const config = require('./config');

let bot = require('./bot');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('Hello World!');
});
// <<<<<<< HEAD
// rtm.on(RTM_EVENTS.MESSAGE, function (message) {
//   // Listens to all `message` events from the team
//   // { type: 'message',
//   //   channel: 'C1R69C2G0',
//   //   user: 'U1R69C14G',
//   //   text: 'dsf',
//   //   ts: '1468385402.000013',
//   //   team: 'T1R6ELRHV' }
//   console.log(message.text, message.user);
//   var user = rtm.dataStore.getUserById(message.user)
//
//    var dm = rtm.dataStore.getDMByName(user.name);
//
//    rtm.sendMessage('Hello ' + user.name + '!', dm.id);
//   // rtm.sendMessage('Hey you', 'C1R69C2G0', function messageSent() {
//   //   // optionally, you can supply a callback to execute once the message has been sent
//   // });
// =======


app.post('/commands/motivate', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('Lets do this!' + req.body.text);
});



app.listen(port, function () {
  console.log('app listening on port ' + port + '!,');
  console.log('env ' + process.env.NODE_ENV);
});
