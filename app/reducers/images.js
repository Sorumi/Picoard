const namespace = 'images';

const initialState = {
  ratio: 0,
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
    case 'changeRatio':
      const ratio = payload;
      return {
        ...state,
        ratio
      };

    default:
      return state;
  }
}

export default images;
