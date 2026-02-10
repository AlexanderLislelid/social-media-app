// Posts: https://docs.noroff.dev/docs/v2/social/posts
// Profiles: https://docs.noroff.dev/docs/v2/social/profiles

const BASE_URL = "https://v2.api.noroff.dev/social/posts";

export async function fetchPosts() {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!token) throw new Error("Missing token - please log in");
  if (!apiKey) throw new Error("Missing apiKey - create API key after login");

  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Fetch failed");
  }

  return data;
}
