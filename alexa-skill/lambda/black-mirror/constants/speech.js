const keys = {
    LAUNCH_REQUEST_PROMPT: 'LAUNCH_REQUEST_PROMPT',
    LAUNCH_REQUEST_REPROMPT: 'LAUNCH_REQUEST_REPROMPT',

    HELP_PROMPT: 'HELP_PROMPT',
    HELP_REPROMPT: 'HELP_REPROMPT',

    END_SESSION_PROMPT: 'END_SESSION_PROMPT',
  
    UNHANDLED_PROMPT: 'UNHANDLED_PROMPT',
    UNHANDLED_REPROMPT: 'UNHANDLED_REPROMPT'
  };
  
  
  const translations = {
    en: {
      translation: {
        LAUNCH_REQUEST_PROMPT: 'Hi there! Welcome to Black Mirror. What would you like to view?',
        LAUNCH_REQUEST_REPROMPT: 'Please say that again?',

        HELP_PROMPT: 'So, how can I help?',
        HELP_REPROMPT: 'Please say that again?',

        END_SESSION_PROMPT: 'Goodbye!',
  
        UNHANDLED_PROMPT: 'Can you say that again?',
        UNHANDLED_REPROMPT: 'Can you say that again?'
      }
    }
  };
  
  module.exports.translations = translations;
  module.exports.keys = keys;
  