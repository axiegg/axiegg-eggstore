export const SET_CARDS_DATA = 'SET_CARDS_DATA';

// setting initial state
const initialState = null;

// Reducer
export default (state = initialState, action = {}) => {
  const { payload = {} } = action;
  const { cards } = payload;

  switch (action.type) {
    case SET_CARDS_DATA:
      return cards;
    default:
      return state;
  }
};

// Action Creators
export const setCardsData = cards => (
  {
    type: SET_CARDS_DATA,
    payload: { cards },
  }
);
