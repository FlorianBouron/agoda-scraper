var casper = require('casper').create({
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
  },
  clientScripts: ['vendor/jquery.js', 'vendor/lodash.js']
});

var url = 'https://www.agoda.com/en-gb/pages/agoda/default/DestinationSearchResult.aspx?asq=u2qcKLxwzRU5NDuxJ0kOF1NIE1TE4bwl1NFracRSihf8rs%2BP9z36dO1NLKATQZIUncbzTLOPBjT84OgAAKXmu4x92HCpRxs78zavyKc31gwUJsh62%2BeQFjol2l8Ds1%2FJbRRlIaCy8EvYjPfk2WHbZV7f3%2FLB8CBT%2FO8lPrDsDfdtLd3PNpyf6ftBl5MCuYUPUFiqOkpeVA56CAPqQDaP%2Bg%3D%3D&city=15470&tick=636473383937&pagetypeid=1&origin=PL&cid=-1&tag=&gclid=&aid=130243&userId=efd67b5d-67e7-4d27-ab95-09d519c739f0&languageId=1&storefrontId=3&currencyCode=PLN&htmlLanguage=en-gb&trafficType=User&cultureInfoName=en-GB&checkIn=2017-12-06&checkOut=2017-12-07&los=1&rooms=1&adults=2&children=0&childages=&priceCur=PLN&hotelReviewScore=5&tabId=1&issearchfromhomepage=true&ckuid=efd67b5d-67e7-4d27-ab95-09d519c739f0';

var names = [];
var prices = [];

function getNames() {
  var names = $('[data-selenium=hotel-name]');
  return _.map(names, function(e) {
    return e.innerHTML;
  });
}

function getPrices() {
  var prices = $('[data-selenium=display-price]');
  return _.map(prices, function(e) {
    return e.innerHTML;
  });
}

casper.start(url, function() {
  this.echo(this.getTitle());
});

casper.waitForSelector('pagination-next-btn', function () {
  console.log('hotel-name selector is loaded');
});

casper.then(function() {
  this.clickLabel('Stars (5..1)', 'span');
  console.log('click to filter ratings');
});

casper.wait(1000, function() {
  this.echo("I've waited for a second.");
});

casper.then(function() {
  names = this.evaluate(getNames);
  prices = this.evaluate(getPrices);
});

casper.then(function() {
  this.echo(names.length + 'names found:');
  this.echo('-' + names.join('\n -'));
  this.echo('-' + prices.join('\n -')).exit();
});

casper.run();

