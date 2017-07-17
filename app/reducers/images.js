const namespace = 'images';

const initialState = {
  path: null,
  exist: false,
  images: [],
  selectImages: [],

  ratio: 0.3,
  column: 5,
  imageWidth: 0,
  isScroll: false,
  listHeight: 700,

  showImages: {
    lastIndex: 0,
    columnHeight: [],
    columnImages: [],
  },

  menu: {
    copy: false,
    paste: false,
    delete: false,
    selectAll: false,
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
      const {path, exist, images} = payload;
      return {
        ...state,
        path,
        exist,
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
    case 'saveSelectImages':
      const selectImages = payload;
      return {
        ...state,
        selectImages,
      };
    case 'saveMenu':
      const menu = payload;
      return {
        ...state,
        menu,
      };

    default:
      return state;
  }
}

export default images;
