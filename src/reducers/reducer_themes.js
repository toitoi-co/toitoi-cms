const CST = require('../shared/constants');
const INITIAL_STATE = {
  selected: false,
  error: null,
  // Keep oldlist as reference until hosted dev or prod server has presets. For now, ensure -admin on localhost has some presets
  oldList: [
    {
      id:        '1',
      plandId:   '1',
      name:      'Podcast and blog',
      thumbnail: 'https://raw.githubusercontent.com/webhook/webhook-theme-podcast/master/static/images/theme-screenshot.png',
      url:       'https://github.com/webhook/webhook-theme-podcast/archive/master.zip',
      isEnabled: true,
      isAvailable: true,
      code:      'https://github.com/webhook/webhook-theme-podcast',
      description: 'Podcast theme with simple blog. Comes with a persistant audio player and iTunes formatted RSS.',
      createdAt: 1455656864917,
      updatedAt: 1455656864917
    },
    {
      id:        '2',
      plandId:   '1',
      name:      'Video, livestream & blog',
      thumbnail: 'https://raw.githubusercontent.com/webhook/webhook-theme-streamer/master/static/images/theme-screenshot.png',
      url:       'https://github.com/webhook/webhook-theme-streamer/archive/master.zip',
      isEnabled: true,
      isAvailable: true,
      code:      'https://github.com/webhook/webhook-theme-streamer',
      description: 'Theme for video producers who manage multiple shows across YouTube, Vimeo and Twitch.',
      createdAt: 1455656864917,
      updatedAt: 1455656864917
    },
    {
      id:        '3',
      plandId:   '1',
      name:  'Simple personality site',
      thumbnail: 'http://webhook-theme-internet-presence.webhook.org/static/images/theme.jpg',
      url:       'https://github.com/webhook/webhook-theme-internet-presence/archive/master.zip',
      isEnabled: true,
      isAvailable: true,
      code:      'https://github.com/webhook/webhook-theme-internet-presence',
      description: 'Theme for individuals that need a simple site to manage their online presence, previous work, upcoming events and blog.',
      createdAt: 1455656864917,
      updatedAt: 1455656864917
    }
  ],
  list: []
}

export default function(state = INITIAL_STATE, action) {
  // console.log('action:', action);
  switch(action.type){
    // case CST.LOGIN_SUCCESS:
    //   return { ...state, user: action.payload.data };
    case CST.THEMES_REQUEST:
      return state;
    case CST.THEMES_REQUEST_SUCCESS:
      return { ...state, list: action.payload };
    case CST.THEMES_REQUEST_FAILURE:
      return state;
    case CST.THEME_SELECTION:
      return state;
    case CST.THEME_SELECTION_SUCCESS:
      return { ...state, selected: true }
    case CST.THEME_SELECTION_FAILURE:
      return { ...state, error: action.payload.message }
    default:
      return state;
  }
}
