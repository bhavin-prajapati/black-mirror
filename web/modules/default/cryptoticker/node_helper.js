/* Magic Mirror
 * Node Helper: CryptoTicker
 *
 * By Bhavin Prajapati
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var coinTicker = require("coin-ticker");
var validUrl = require("valid-url");
var Fetcher = require("./fetcher.js");

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Starting module: " + this.name);
		this.fetchers = [];
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "ADD_TICKER") {
			this.createFetcher(payload.ticker, payload.config);
			return;
		}
	},

	/* createFetcher(ticker, config)
	 * Creates a fetcher for a ticker if it doesn't exist yet.
	 * Otherwise it reuses the existing one.
	 *
	 * attribute ticker object - A ticker object.
	 * attribute config object - A configuration object containing reload interval in milliseconds.
	 */
	createFetcher: function(ticker, config) {
		var self = this;

		var exchange = ticker.exchange || "";
		var encoding = ticker.encoding || "UTF-8";
		var reloadInterval = ticker.reloadInterval || config.reloadInterval || 5 * 60 * 1000;

		var fetcher;
		if (typeof self.fetchers[exchange] === "undefined") {
			console.log("Create new ticker fetcher for exchange: " + exchange + " - Interval: " + reloadInterval);
			fetcher = new Fetcher(exchange, ticker.assetPairs, reloadInterval, encoding);

			fetcher.onReceive(function(fetcher) {
				self.broadcastTickers();
			});

			fetcher.onError(function(fetcher, error) {
				self.sendSocketNotification("FETCH_ERROR", {
					exchange: fetcher.exchange(),
					error: error
				});
			});

			self.fetchers[exchange] = fetcher;
		} else {
			console.log("Use existing ticker fetcher for exchange: " + exchange);
			fetcher = self.fetchers[exchange];
			fetcher.setReloadInterval(reloadInterval);
			fetcher.broadcastItems();
		}

		fetcher.startFetch();
	},

	/* broadcastTickers()
	 * Creates an object with all feed items of the different registered feeds,
	 * and broadcasts these using sendSocketNotification.
	 */
	broadcastTickers: function() {
		var tickers = {};
		for (var f in this.fetchers) {
			tickers[f] = this.fetchers[f].items();
		}
		this.sendSocketNotification("TICKERS", tickers);
	},
});
