const fetch = require('isomorphic-fetch');
const { keys } = require('../constants/speech.js');
const { states } = require('../constants/states.js');

const handlers = {
    "LaunchRequest": function () {
        console.log("in LaunchRequest");
        this.response.speak("Welcome to Black Mirror. How can I help you?");
        this.response.listen("How can I help you?");
        this.emit(':ask', this.t(keys.LAUNCH_REQUEST_PROMPT), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'AMAZON.HelpIntent': function () {
        this.emit('HelpIntent');
    },
    'AMAZON.NoIntent': function () {
        this.emitWithState('AMAZON.NoIntent');
    },
    'AMAZON.YesIntent': function () {
        this.emitWithState('AMAZON.YesIntent');
    },
    'HomeIntent': function () {
        //this.handler.state = states.HOME_MODE;
        fetch("http://localhost:8080/show/home")
        .then((response) => {
            console.log("show home");
        });
        this.emit(':ask', this.t(keys.HOME_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'NewsIntent': function () {
        //this.handler.state = states.NEWS_MODE;
        fetch("http://localhost:8080/show/newsfeed")
        .then((response) => {
            console.log("show newsfeed");
        });
        this.emit(':ask', this.t(keys.NEWS_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'CalendarIntent': function () {
        //this.handler.state = states.CALENDAR_MODE;
        fetch("http://localhost:8080/show/calendar")
        .then((response) => {
            console.log("show calendar");
        });
        this.emit(':ask', this.t(keys.CALENDAR_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'WeatherIntent': function () {
        //this.handler.state = states.WEATHER_MODE;
        fetch("http://localhost:8080/show/weatherforecast")
        .then((response) => {
            console.log("show weatherforecast");
        });
        this.emit(':ask', this.t(keys.WEATHER_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'StocksIntent': function () {
        //this.handler.state = states.CLOCK_MODE;
        fetch("http://localhost:8080/show/stocks")
        .then((response) => {
            console.log("show stocks");
        });
        this.emit(':ask', this.t(keys.STOCKS_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'ClockIntent': function () {
        //this.handler.state = states.CLOCK_MODE;
        fetch("http://localhost:8080/show/clock")
        .then((response) => {
            console.log("show clock");
        });
        this.emit(':ask', this.t(keys.CLOCK_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    HelpIntent() {
        this.emit(':ask', this.t(keys.HELP_PROMPT), this.t(keys.HELP_REPROMPT));
    },
    'AMAZON.StopIntent': function () {
        this.emit('EndSession');
    },
    EndSession() {
        this.emit(':tell', this.t(keys.END_SESSION_PROMPT));
    },
    'AMAZON.CancelIntent': function () {
        this.emitWithState('CancelOrderIntent');
    }
};

module.exports.handlers = handlers;