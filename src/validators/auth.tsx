import React from 'react';

export const validateUserName = name => {
  const regex = /^[a-z]{3,10}$/;
  return regex.test(name);
};

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

export const validatePhoneNumber = number => {
  if (number) {
    number = number.replace(/[^0-9.]+/g, '');
  }
  const regex = /^([0-9]).{11,13}$/;
  return regex.test(number);
};

export const enableSubmit = state => {
  const {
    name,
    email,
    password,
    repeat_password,
    phone_number,
    valid_email,
    valid_match_passwords,
    valid_name,
    valid_password,
    valid_phone_number
  } = state;

  if (name && email && password && repeat_password && phone_number) {
    return !(
      valid_email &&
      valid_match_passwords &&
      valid_name &&
      valid_password &&
      valid_phone_number
    );
  }

  return true;
};
