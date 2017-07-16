import {WIN_SIZE, SIDEBAR_DEFAULT_RATIO, SIDEBAR_MIN_RATIO, SIDEBAR_MAX_RATIO} from '../constants';

const namespace = 'hint';

const initialState = {
    existWarning: {
      show: false,
      files: [],
    },
    deleteConfirm: {
      show: false,
      files: []
    }
  }
;

function window(state = initialState, {type, payload}) {
  const match = /hint\/(\S+)$/.exec(type);
  if (match) {
    type = match[1];
  } else {
    return state;
  }
  switch (type) {
    case 'saveExistWarning':
      const existWarning = payload;
      return {
        ...state,
        existWarning,
      };
    case 'saveDeleteConfirm':
      const deleteConfirm = payload;
      return {
        ...state,
        deleteConfirm,
      };

    default:
      return state;
  }
}

export default window;
