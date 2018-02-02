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
        this.emit(':ask', this.t(keys.HOME_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'NewsIntent': function () {
        this.emit(':ask', this.t(keys.NEWS_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'CalendarIntent': function () {
        this.emit(':ask', this.t(keys.CALENDAR_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'WeatherIntent': function () {
        this.emit(':ask', this.t(keys.WEATHER_STATE), this.t(keys.LAUNCH_REQUEST_REPROMPT));
    },
    'ClockIntent': function () {
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