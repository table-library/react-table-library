export const addById = (state, action) => {
  return {
    ...state,
    ids: state.ids.concat(action.payload.id)
  };
};

export const removeById = (state, action) => {
  return {
    ...state,
    ids: state.ids.filter(id => id !== action.payload.id)
  };
};

export const addByIds = (state, action) => {
  return {
    ...state,
    ids: state.ids.concat(action.payload.ids)
  };
};

export const removeByIds = (state, action) => {
  return {
    ...state,
    ids: state.ids.filter(id => !action.payload.ids.includes(id))
  };
};
export const byAll = (state, action) => {
  const isAll = action.payload.ids.length === state.ids.length;

  return isAll
    ? {
        ...state,
        ids: []
      }
    : {
        ...state,
        ids: action.payload.ids
      };
};

export const addAll = (state, action) => {
  return {
    ...state,
    ids: action.payload.ids
  };
};

export const removeAll = state => {
  return {
    ...state,
    ids: []
  };
};
