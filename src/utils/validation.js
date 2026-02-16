export function isValidUsername(username) {
  if (!username) {
    return false;
  }
  return /^[A-Za-z0-9_]+$/.test(username.trim());
}

export function isValidEmail(email) {
  if (!email) {
    return;
  }
  return /^[^\s@]+@stud\.noroff\.no$/.test(email.trim());
}

export function isValidPassword(password) {
  if (!password) {
    return false;
  }
  return password.length >= 8;
}
