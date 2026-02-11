export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function loadToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function saveApiKey(apiKey) {
  localStorage.setItem("apiKey", apiKey);
}

export function loadApiKey() {
  return localStorage.getItem("apiKey");
}

export function removeApiKey() {
  localStorage.removeItem("apiKey");
}
