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