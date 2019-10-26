export const validateEmail = mail => {
  if (mail) {
    mail = mail.replace(/ /g, '');
  }
  const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  return regex.test(mail);
};

export const validatePassword = password => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
};

export const validateRepeatPassword = (repeatPassword, password) => {
  return repeatPassword === password;
};

export const validateCode = code => {
  const regex = /[0-9]{6}$/;
  return regex.test(code);
};

export const enableSubmit = state => {
  const {
    email,
    password,
    repeat_password,
    valid_email,
    valid_match_passwords,
    valid_password,
  } = state;

  if (email && password && repeat_password) {
    return !(
      valid_email &&
      valid_match_passwords &&
      valid_password
    );
  }

  return true;
};
