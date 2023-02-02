import { DISABLE_LOGIN_BTN, SAVE_USER } from '../actions';

const INITIAL_STATE = {
  disableBtn: true,
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_LOGIN_BTN:
    return {
      ...state,
      disableBtn: action.payload,
    };
  case SAVE_USER:
    return {
      ...state,
      disableBtn: action.payload.disableBtn,
      email: action.payload.email,
    };
  default:
    return { ...state };
  }
};

export default user;
