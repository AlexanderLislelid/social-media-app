import { get } from "../api/apiClient.js";

export function UserView() {
  return /* HTML */ `<h1>User Profile</h1>`;
}

export async function renderUser(username) {
  try {
    const response = await get(
      `social/profiles/${username}?_following=true&_followers=true&_posts=true`,
    );
    if (!response) {
      console.error("Failed to load user profile");
      return;
    }
    const user = response.data;
    console.log(user);
  } catch (error) {
    console.error("Failed to load user profile:", error);
  }
}
