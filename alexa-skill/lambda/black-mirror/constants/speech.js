const keys = {
    LAUNCH_REQUEST_PROMPT: 'LAUNCH_REQUEST_PROMPT',
    LAUNCH_REQUEST_REPROMPT: 'LAUNCH_REQUEST_REPROMPT',

    HELP_PROMPT: 'HELP_PROMPT',
    HELP_REPROMPT: 'HELP_REPROMPT',

    HOME_STATE: 'HOME_STATE',
    NEWS_STATE: 'NEWS_STATE',
    CALENDAR_STATE: 'CALENDAR_STATE',
    CRYPTOCURRENCY_STATE: 'CRYPTOCURRENCY_STATE',
    JOKES_STATE: 'JOKES_STATE',
    MOVIES_STATE: 'MOVIES_STATE',
    TTCSCHEDULE_STATE: 'TTCSCHEDULE_STATE',
    WEATHER_STATE: 'WEATHER_STATE',
    CLOCK_STATE: 'CLOCK_STATE',

    END_SESSION_PROMPT: 'END_SESSION_PROMPT',
  
    UNHANDLED_PROMPT: 'UNHANDLED_PROMPT',
    UNHANDLED_REPROMPT: 'UNHANDLED_REPROMPT'
  };
  
  const translations = {
    en: {
      translation: {
        LAUNCH_REQUEST_PROMPT: 'Hi there! Welcome to Black Mirror. How can I help you?',
        LAUNCH_REQUEST_REPROMPT: 'Please say that again?',

        HELP_PROMPT: 'So, how can I help?',
        HELP_REPROMPT: 'Please say that again?',

        HOME_STATE: 'What would you like to view?',
        NEWS_STATE: 'Here is the current news.',
        CALENDAR_STATE: 'Here is your calendar.',
        CRYPTOCURRENCY_STATE: 'Here is the cryptocurrency prices.',
        JOKES_STATE: 'Here are some jokes.',
        MOVIES_STATE: 'Here are the latest box office movies.',
        TTCSCHEDULE_STATE: 'Here is the current TTC Schedule.',
        WEATHER_STATE: 'Here is the local weather.',
        CLOCK_STATE: 'Here is the current time.',

        END_SESSION_PROMPT: 'Goodbye!',
  
        UNHANDLED_PROMPT: 'Can you say that again?',
        UNHANDLED_REPROMPT: 'Can you say that again?'
      }
    }
  };
  
  module.exports.translations = translations;
  module.exports.keys = keys;
  