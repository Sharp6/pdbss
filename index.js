var express = require('express')
var app = express()

var scraper = require('./scraper');

app.get('/', function (req, res) {
  scraper()
    .then(function(data) {
      res.json(data);
    });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});