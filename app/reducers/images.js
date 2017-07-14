const namespace = 'images';

const initialState = {
  path: null,
  images: [],
  activeImages: [],

  ratio: 0.3,
  column: 5,
  imageWidth: 0,
  isScroll: false,
  listHeight: 700,

  showImages : {
    lastIndex: 0,
    columnHeight: [],
    columnImages: [],
    // columnIndex: [],
  }
};

function images(state = initialState, {type, payload}) {
  const match = /images\/(\S+)$/.exec(type);
  if (match) {
    type = match[1];
  } else {
    return state;
  }
  switch (type) {
    case 'saveImageAndPath':
      const {path, images} = payload;
      return {
        ...state,
        name,
        path,
        images,
      };
    case 'saveListHeight':
      const listHeight = payload;
      return {
        ...state,
        listHeight
      };
    case 'saveRatio':
      const ratio = payload;
      return {
        ...state,
        ratio
      };
    case 'saveSize':
      const {column, imageWidth} = payload;
      return {
        ...state,
        column,
        imageWidth
      };
    case 'saveListHeight':
      const {height} = payload;
      return {
        ...state,
        listHeight: height,
      };
    case 'saveShowImages':
      const showImages = payload;
      return {
        ...state,
        showImages,
      };
    case 'saveIsScroll':
      const isScroll = payload;
      return {
        ...state,
        isScroll,
      };
    case 'saveActiveImages':
      const activeImages = payload;
      return {
        ...state,
        activeImages,
      };
    default:
      return state;
  }
}

export default images;
