export const DISABLE_LOGIN_BTN = 'DISABLE_LOGIN_BTN';
export const SAVE_USER = 'SAVE_USER';

export const disableLoginBtn = (boolean) => ({
  type: DISABLE_LOGIN_BTN,
  payload: boolean,
});

export const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});
