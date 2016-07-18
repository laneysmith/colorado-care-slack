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


app.post('/commands/motivate', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('Lets do this!' + req.body.text);
});



app.listen(port, function () {
  console.log('app listening on port ' + port + '!,');
  console.log('env ' + process.env.NODE_ENV);
});
