import { SET_STATE } from "../actions/actionTypes";
import { combineReducers } from 'redux';
import { INITIAL_STATE } from "../constants";

const storageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default combineReducers({
  reminders: storageReducer,
});