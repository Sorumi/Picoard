import {WIN_SIZE, SIDEBAR_DEFAULT_RATIO} from '../constants';

const namespace = 'window';

const initialState = {
    size: WIN_SIZE,
    sidebarWidth: WIN_SIZE.width * SIDEBAR_DEFAULT_RATIO,
    offsetX: 0,
    // bound: {
    //     left: WIN_SIZE.width * SIDEBAR_DEFAULT_RATIO
    // }
};

function window(state = initialState, {type, payload}) {
    const match  = /window\/(\S+)$/.exec(type);
    if (match) {
        type = match[1];
    } else {
        return state;
    }
    switch (type) {
        case 'saveWindow':
            const {size, sidebarWidth} = payload;
            return {
                ...state,
                size,
                sidebarWidth,
            };

        case 'saveOffsetX':
            const offsetX = payload;
            return {
                ...state,
                offsetX,
            };

        default:
            return state;
    }
}

export default window;