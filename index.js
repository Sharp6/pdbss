"use strict";

var express = require('express');
var app = express();

var scraper = require('./scraper');
var counter = 0;

var checkIfOk = function(something) {
  return something.reduce(function(allHistory, stock) {
    return allHistory && stock.history.length > 0;
  }, true);
}

var recoveringScraper = function() {
  console.log("Executing", counter++);
    return scraper()
      .then(function(data) {
        if(checkIfOk(data)) {
          return data;
        } else {
          return recoveringScraper();
        }
      });
}

app.get('/', function (req, res) {
  scraper()
    .then(function(data) {
      res.json(data);
    });
});

app.get('/withRecover', function(req,res) {
  recoveringScraper()
    .then(function(data) {
      res.json(data);
    });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});
