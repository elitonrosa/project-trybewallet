import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
