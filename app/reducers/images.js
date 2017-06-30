const namespace = 'images';

const initialState = {
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

        default:
            return state;
    }
}

export default images;