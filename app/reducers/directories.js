
const namespace = 'directories';

const initialState = {
    directories: [],
    currentDirIndex: 0,
};

function directories(state = initialState, {type, payload}) {
    const match = /directories\/(\S+)$/.exec(type);
    if (match) {
        type = match[1];
    } else {
        return state;
    }
    switch (type) {
        case 'saveDirectories':
            const directories = payload;
            return {
                ...state,
                directories: directories
            };
        case 'saveCurrentDirIndex':
            const index = payload;
            return {
                ...state,
                currentDirIndex: index
            };
        default:
            return state;
    }
}

export default directories;
