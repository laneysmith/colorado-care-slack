// xoxb-59226608148-pcFuQX7DjRZu6Qnk9Cey9Xy0

var token = process.env.SLACK_API_TOKEN || '';
var RtmClient = require('@slack/client').RtmClient;

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();
console.log('started test init');
