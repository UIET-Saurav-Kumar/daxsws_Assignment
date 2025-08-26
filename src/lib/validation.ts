// Validation utility functions for form inputs

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateName = (name: string): ValidationResult => {
  const nameRegex = /^[A-Za-z\s]+$/;
  
  if (!name.trim()) {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (!nameRegex.test(name)) {
    return { isValid: false, message: 'Name should only contain alphabets' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Name should be at least 2 characters' };
  }
  
  return { isValid: true };
};

export const validateUsername = (username: string): ValidationResult => {
  const usernameRegex = /^[A-Za-z0-9@#$%^&*()_+={}[\]:";'<>?,./\\|-]+$/;
  
  if (!username) {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, message: 'Username should be at least 3 characters' };
  }
  
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: 'Username can contain alphanumeric and special characters only' };
  }
  
  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/;
  
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  if (!phoneRegex.test(phone.replace(/[\s-()]/g, ''))) {
    return { isValid: false, message: 'Please enter a valid phone number with country code' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string, username?: string): ValidationResult => {
  const passwordRegex = /^[A-Za-z0-9@#$%^&*()_+={}[\]:";'<>?,./\\|-]+$/;
  
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password should be at least 6 characters' };
  }
  
  if (!passwordRegex.test(password)) {
    return { isValid: false, message: 'Password can contain alphanumeric and special characters only' };
  }
  
  if (username && password.toLowerCase() === username.toLowerCase()) {
    return { isValid: false, message: 'Password should not be same as username' };
  }
  
  return { isValid: true };
};

export const validateConfirmPassword = (confirmPassword: string, password: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (confirmPassword !== password) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true };
};