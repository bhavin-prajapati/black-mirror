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
        this.handler.state = states.HOME_MODE;
        fetch("http://localhost:3000/show/home")
        .then((response) => {
            console.log("home", response);
        });
        this.emit(':ask', this.t(keys.HOME_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'NewsIntent': function () {
        this.handler.state = states.NEWS_MODE;
        this.emit(':ask', this.t(keys.NEWS_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'CalendarIntent': function () {
        this.handler.state = states.CALENDAR_MODE;
        this.emit(':ask', this.t(keys.CALENDAR_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'WeatherIntent': function () {
        this.handler.state = states.WEATHER_MODE;
        this.emit(':ask', this.t(keys.WEATHER_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'ClockIntent': function () {
        this.handler.state = states.CLOCK_MODE;
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