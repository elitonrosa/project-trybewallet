const SIX = 6;

export const validateEmail = (email) => !!(email.match(/\S+@\S+\.\S+/) && email.length >= SIX);
export const validatePassword = (password) => password.length >= SIX;
