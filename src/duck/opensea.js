export const SET_OPENSEA = 'SET_OPENSEA';

// setting initial state
const initialState = null;

// Reducer
export default (state = initialState, action = {}) => {
  const { payload = {} } = action;
  const { opensea } = payload;

  switch (action.type) {
    case SET_OPENSEA:
      return opensea;
    default:
      return state;
  }
};

// Action Creators
export const setOpensea = opensea => (
  {
    type: SET_OPENSEA,
    payload: { opensea },
  }
);
