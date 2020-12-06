export const byId = (state, action) => {
  const hasId = state.ids.includes(action.payload.id);

  return hasId
    ? {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id)
      }
    : {
        ...state,
        ids: state.ids.concat(action.payload.id)
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
