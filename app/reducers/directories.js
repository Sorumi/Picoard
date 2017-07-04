const namespace = 'directories';

const initialState = {
  directories: [],
  currentDirIndex: 0,
  editDirIndex: null,
  editItem: {
    color: null,
    name: null,
  }
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
        directories,
      };
    case 'saveCurrentDirIndex':
      const currentDirIndex = payload;
      return {
        ...state,
        currentDirIndex,
      };
    case 'saveEditDirIndex':
      const editDirIndex = payload;
      return {
        ...state,
        editDirIndex,
      };
    case 'saveEditItem':
      const editItem = payload;
      return{
        ...state,
        editItem: {
          ...state.editItem,
          ...editItem,
        }
      }
    default:
      return state;
  }
}

export default directories;
