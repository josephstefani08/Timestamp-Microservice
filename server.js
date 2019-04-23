// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');
moment().format();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp endpoint
app.get('/api/timestamp/:date_string?', function(req, res) {
  let dateString = req.params.date_string;
  let convertedDateString;
  
  if (dateString == null) { // If no parameters, return current unix and date/time
    res.json({unix: moment().unix(), utc: moment().format('ddd, MMM Do YYYY hh:mm:ss')});
  } else if (!isNaN(dateString)) { // If unix time is entered, convert to date/time
    convertedDateString = moment.unix(dateString).format("ddd, MMM Do YYYY hh:mm:ss");
    res.json({unix: dateString, utc: convertedDateString});
  }
  
  if(new Date(dateString) == 'Invalid Date') {
    res.json({"error": "Invalid Date" }); // show if invalid timestamp
  } else {
    res.json({unix: moment(dateString).format('X'), utc: moment(dateString).format('ddd, MMM Do YYYY hh:mm:ss')});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});