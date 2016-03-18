const CST = require('../shared/constants');
const INITIAL_STATE = {
  selected: false,
  error: null,
  list: [
    {
      name:  'Podcast & blog',
      image: 'https://raw.githubusercontent.com/webhook/webhook-theme-podcast/master/static/images/theme-screenshot.png',
      url:   'https://github.com/webhook/webhook-theme-podcast/archive/master.zip',
      demo:  'http://www.dadstrength.tv',
      code:  'https://github.com/webhook/webhook-theme-podcast',
      description: 'Podcast theme with simple blog. Comes with a persistant audio player and iTunes formatted RSS.',
      presetId:    '100'
    },
    {
      name:  'Video, livestream & blog',
      image: 'https://raw.githubusercontent.com/webhook/webhook-theme-streamer/master/static/images/theme-screenshot.png',
      url:   'https://github.com/webhook/webhook-theme-streamer/archive/master.zip',
      demo:  'http://webhook-theme-streamer.webhook.org',
      code:  'https://github.com/webhook/webhook-theme-streamer',
      description: 'Theme for video producers who manage multiple shows across YouTube, Vimeo and Twitch.',
      presetId:    '101'
    },
    {
      name:  'Simple personality site',
      image: 'http://webhook-theme-internet-presence.webhook.org/static/images/theme.jpg',
      url:   'https://github.com/webhook/webhook-theme-internet-presence/archive/master.zip',
      demo:  'http://webhook-theme-internet-presence.webhook.org',
      code:  'https://github.com/webhook/webhook-theme-internet-presence',
      description: 'Theme for individuals that need a simple site to manage their online presence, previous work, upcoming events and blog.',
      presetId:     '102'
    }
  ]
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case CST.THEME_SELECT_REQUEST:
      return { ...state }
    case CST.THEME_SELECT_SUCCESS:
      return { ...state, selected: action.payload }
    case CST.THEME_SELECT_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
