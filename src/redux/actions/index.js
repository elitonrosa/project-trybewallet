export const SAVE_USER = 'SAVE_USER';

export const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});
