const namespace = 'image';

const initialState = {
  ratio: 0.1,
  path: null,
  imageWidth: 0,
  marginTop: 0,
};

function directories(state = initialState, {type, payload}) {
  const match = /image\/(\S+)$/.exec(type);
  if (match) {
    type = match[1];
  } else {
    return state;
  }
  switch (type) {
    case 'savePath':
      const path = payload;
      return {
        ...state,
        path
      };
    case 'saveRatio':
      const ratio = payload;
      return {
        ...state,
        ratio
      };
    case 'saveSize':
      const {imageWidth, marginTop} = payload;
      return{
        ...state,
        imageWidth,
        marginTop
      };
    default:
      return state;
  }
}

export default directories;
