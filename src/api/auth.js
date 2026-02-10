const REGISTER_URL = "https://v2.api.noroff.dev/auth/register";
const LOGIN_URL = "https://v2.api.noroff.dev/auth/login";

// post request for logging in on noroff social api - HUGS JSDOC ??
export async function login(email, password) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Login failed");
  }
  return data;
}

// post request for registering a new user on noroff social api - HUGS JSDOC ??

export async function register(name, email, password) {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Registration failed");
  }

  return data;
}

export async function createApiKey() {
  const token = localStorage.getItem("token");

  const response = await fetch("https://v2.api.noroff.dev/auth/api-key", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "social-app" }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Failed to create API key");
  }

  localStorage.setItem("apiKey", data.data.key);

  return data;
}
