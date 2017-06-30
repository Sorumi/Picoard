const namespace = 'images';

const initialState = {
  ratio: 0,
  column: 5,
  imageWidth: 0,
  path: null,
  images: [],
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
        path,
        images,
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
        imageWidth,
      };
    default:
      return state;
  }
}

export default images;
