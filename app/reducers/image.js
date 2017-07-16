const namespace = 'image';

const initialState = {
  ratio: 0.1,
  currentIndex: null,
  path: null,
  name: null,

  imageWidth: 0,
  imageHeight:0,
  marginTop: 0,

  scrollTop: 0,
  scrollLeft: 0,
};

function directories(state = initialState, {type, payload}) {
  const match = /image\/(\S+)$/.exec(type);
  if (match) {
    type = match[1];
  } else {
    return state;
  }
  switch (type) {
    case 'savePathAndIndex':
      const {path,name, index} = payload;
      return {
        ...state,
        path,
        name,
        currentIndex: index,
      };
    case 'saveRatio':
      const ratio = payload;
      return {
        ...state,
        ratio
      };
    case 'saveSize':
      const {imageWidth, imageHeight, marginTop} = payload;
      return{
        ...state,
        imageWidth,
        imageHeight,
        marginTop
      };
    default:
      return state;
  }
}

export default directories;
