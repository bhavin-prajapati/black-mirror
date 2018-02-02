/* global Module */

/* Magic Mirror
 * Module: CryptoTicker
 *
 * By Bhavin Prajapati
 * MIT Licensed.
 */

Module.register("cryptoticker",{

	// Default module config.
	defaults: {
		tickers: [
			{
				exchange: "poloniex",
				assetPairs: ["LTC_BTC", "BURST_BTC"],
				encoding: "UTF-8" //ISO-8859-1
			},
			{
				exchange: "kraken",
				assetPairs: ["LTC_BTC", "BURST_BTC"],
				encoding: "UTF-8" //ISO-8859-1
			},
		],
		hideLoading: false,
		reloadInterval: 5 * 60 * 1000, // every 5 minutes
		updateInterval: 10 * 1000,
		animationSpeed: 2.5 * 1000,
		ignoreOldItems: false,
		ignoreOlderThan: 24 * 60 * 60 * 1000, // 1 day
		removeStartTags: "",
		removeEndTags: "",
		startTags: [],
		endTags: [],
		prohibitedWords: []
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.tickers = [];

		this.registerTickers();

		Log.info("registerTickers");
	},

	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "TICKERS") {

			Log.info("TICKERS:", payload);

			this.generateTickers(payload);

			if (!this.loaded) {
				this.scheduleUpdateInterval();
			}

			this.loaded = true;
		}
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		wrapper.style.display = "block";
		wrapper.style["text-align"] = "left";
		//wrapper.style.backgroundColor = "#AAA"
		wrapper.style["position"] = "relative";
		wrapper.style["float"] = "left";
		
		wrapper.className = "small bright";

		var exchanges = Object.keys(this.tickers);

		exchanges.forEach((exchange) => {
			if(this.tickers[exchange].length > 0) {
				var _ticker = document.createElement("div");
				_ticker.style["white-space"] = "nowrap";
				_ticker.innerHTML = exchange;
				this.tickers[exchange].forEach((assetPair) => {
					if (typeof(assetPair) === 'object') {
						Log.info("assetPair:", assetPair);
						_ticker.innerHTML += "   " + assetPair.pair.replace('_', '/') + " " + assetPair.last;
					}
				});
				wrapper.appendChild(_ticker);
			}
		});

		return wrapper;
	},

	/* registerTickers()
	 * registers the tickers to be used by the backend.
	 */
	registerTickers: function() {
		Log.info("registerTickers");
		for (var t in this.config.tickers) {
			var ticker = this.config.tickers[t];
			this.sendSocketNotification("ADD_TICKER", {
				ticker: ticker,
				config: this.config
			});
		}
	},

	/* scheduleUpdateInterval()
	 * Schedule visual update.
	 */
	scheduleUpdateInterval: function() {
		var self = this;

		self.updateDom(self.config.animationSpeed);

		timer = setInterval(function() {
			self.activeItem++;
			self.updateDom(self.config.animationSpeed);
		}, this.config.updateInterval);
	},

	/* generateTickers()
	 * Generate an ordered list of items for this configured module.
	 *
	 * attribute tickers object - An object with feeds returned by the node helper.
	 */
	generateTickers: function(tickers) {
		this.tickers = tickers;
	},
});
