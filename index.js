var token = process.env.SLACK_API_TOKEN || '';
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;


var express = require('express');
var app = express();
let port = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.send('Hello World!');
});


// The memory data store is a collection of useful functions we can include in our RtmClient
var MemoryDataStore = require('@slack/client').MemoryDataStore;
// var rtm = new RtmClient(token, {logLevel: 'debug'});
var rtm = new RtmClient(token, {logLevel: 'error',
// Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
 dataStore: new MemoryDataStore()
});
// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  // rtm.sendMessage('this is a test message', 'C1R69C2G0', function messageSent() {
  //   // optionally, you can supply a callback to execute once the message has been sent
  // });
});
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});
rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  // Listens to all `message` events from the team
//   { type: 'message',
  //   channel: 'C1R69C2G0',
  //   user: 'U1R69C14G',
  //   text: 'dsf',
  //   ts: '1468385402.000013',
  //   team: 'T1R6ELRHV' }
  console.log(message.text, message.user);
  var user = rtm.dataStore.getUserById(message.user)

   var dm = rtm.dataStore.getDMByName(user.name);

   rtm.sendMessage('Hello ' + user.name + '!', dm.id);
  // rtm.sendMessage('Hey you', 'C1R69C2G0', function messageSent() {
  //   // optionally, you can supply a callback to execute once the message has been sent
  // });
});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
  // Listens to all `channel_created` events from the team
});
rtm.start();
console.log('started test rtm');

app.listen(port, function () {
  console.log('app listening on port ' + port + '!');
});
