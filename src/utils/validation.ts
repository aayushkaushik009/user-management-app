import { object, string } from 'yup';

const emailValidation = string()
  .email('Invalid email format')
  .required('Email is required');

const passwordValidation = string()
  .min(8, 'Password must be at least 8 characters long')
  .required('Password is required');

const tenantNameValidation = string()
  .min(3, 'Tenant name must be at least 3 characters long')
  .required('Tenant name is required');

const userNameValidation = string()
  .min(3, 'User name must be at least 3 characters long')
  .required('User name is required');

export const registerValidationSchema = object({
  email: emailValidation,
  password: passwordValidation,
});

export const loginValidationSchema = object({
  email: emailValidation,
  password: passwordValidation,
});

export const tenantValidationSchema = object({
  name: tenantNameValidation,
});

export const userValidationSchema = object({
  name: userNameValidation,
  email: emailValidation,
});