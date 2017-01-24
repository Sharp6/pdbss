var osmosis = require('osmosis');

var stocks = [
  "http://www.tijd.be/beurzen/AB_InBev.60128205",
  "http://www.tijd.be/beurzen/Bekaert.60115401",
  "http://www.tijd.be/beurzen/Engie.360194010",
  "http://www.tijd.be/beurzen/Colruyt.60115403"
];

Promise.all(stocks.map(retrieve))
  .then(function(data) {
    console.log(data);
  });

function retrieve(url) {
  return new Promise(function(resolve,reject){
    var stockData = {};
    osmosis
      .get(url)
      .find("div.l-main-container-article__article.js-stocks-detail.js-responsive-ads > h1")
      .then(function(data) {
        stockData["name"] = data.text().trim().split('                ')[0];
      })
      .find("span.koersenfiche-main-percentage.js-stock-detail-main-percentage")
      .then(function(data) {
        stockData["percentage"] = data.text().trim();
      })
      .find("span.koersenfiche-main-price.js-stock-detail-main-price")
      .then(function(data) {
        stockData["price"] = data.text().split(' ')[1];
      })
      .find("body > div.main-nav-table.js-main-nav-table > div.main-nav-column-content > div.l-main-container-article > div.l-grid--full > div.l-main-container-article-container > div.l-main-container-article__article.js-stocks-detail.js-responsive-ads > div:nth-child(2) > div.l-markten-live > div.l-main-container__section > div:nth-child(4) > div > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > span")
      .then(function(data) {
        console.log("DATA");
        console.log(data);
        stockData["table"] = data.text();
      })
      .done(function() {
        resolve(stockData);
      })
      .log(console.log)
      .error(console.log)
      .debug(console.log)
    });
}

/*http://www.tijd.be/ajax/historyPeriod?issueId=60115403*/
