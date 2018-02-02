
const Alexa = require('alexa-sdk');
const translationStrings = require('./constants/speech.js').translations;
const { handlers } = require('./handlers/handlers.js');

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.resources = translationStrings;

  alexa.registerHandlers(
    handlers
  );
  alexa.execute();
};