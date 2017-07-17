import {WIN_SIZE, SIDEBAR_DEFAULT_RATIO, SIDEBAR_MIN_RATIO, SIDEBAR_MAX_RATIO} from '../constants';

const namespace = 'window';

const initialState = {
  size: WIN_SIZE,
  sidebarWidth: WIN_SIZE.width * SIDEBAR_DEFAULT_RATIO,
  offsetX: 0,
  bounds: {
    left: WIN_SIZE.width * (SIDEBAR_MIN_RATIO - SIDEBAR_DEFAULT_RATIO),
    right: WIN_SIZE.width * (SIDEBAR_MAX_RATIO - SIDEBAR_DEFAULT_RATIO)
  },
  scroll: {
    top: 0,
    left: 0,
  }
};

function window(state = initialState, {type, payload}) {
  const match = /window\/(\S+)$/.exec(type);
  if (match) {
    type = match[1];
  } else {
    return state;
  }
  switch (type) {
    case 'saveWindow':
      const {size, sidebarWidth, bounds} = payload;
      return {
        ...state,
        size,
        sidebarWidth,
        bounds
      };

    case 'saveOffsetX':
      const offsetX = payload;
      return {
        ...state,
        offsetX,
      };
    case 'saveScroll':
      const scroll = payload;
      return {
        ...state,
        scroll,
      };

    default:
      return state;
  }
}

export default window;
