"use strict";

var express = require('express');
var app = express();

var scraper = require('./scraper');

var checkIfOk = function(something) {
  return something.reduce(function(allHistory, stock) {
    return allHistory && stock.history.length > 0;
  }, true);
  return false;
}

var recoveringScraper = function(counter) {
  console.log("Executing", counter--);
  if(counter > 0) {
    return scraper()
      .then(function(data) {
        if(checkIfOk(data)) {
          return data;
        } else {
          return recoveringScraper(counter);
        }
      });
  } else {
    return [];
  }
}

app.get('/', function (req, res) {
  scraper()
    .then(function(data) {
      res.json(data);
    });
});

app.get('/withRecover', function(req,res) {
  recoveringScraper(5)
    .then(function(data) {
      res.json(data);
    });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});
