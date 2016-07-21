const config = require('./config');
const PublicGoogleCalendar = require('public-google-calendar')
  , publicGoogleCalendar = new PublicGoogleCalendar({ calendarId: '00odpg87lg2o43eki6gi0sktgk@group.calendar.google.com' });


// 00odpg87lg2o43eki6gi0sktgk@group.calendar.google.com
let bot = require('./bot');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  publicGoogleCalendar.getEvents(function(err, events) {
    if (err) { return console.log(err.message); }
    // events is now array of all calendar events
    res.send(events);
  });
});
//Call a / command that queries the calander to retrieve events.

app.post('/commands/motivate', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('Lets do this! hello, hello, test 1 2' + req.body.text);
});



app.listen(port, function () {
  console.log('app listening on port ' + port + '!,');
  console.log('env ' + process.env.NODE_ENV);
});
