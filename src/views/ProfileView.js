import { loadToken, removeToken } from "../utils/storage.js";
import { get } from "../api/apiClient.js";

export function ProfileView() {
  return /* HTML */ `
    <section class="flex flex-col items-center">
      <h1 id="profileWelcome"></h1>
    </section>
  `;
}

export async function renderProfile() {
  const username = localStorage.getItem("username");
  const profile = await get(`social/profiles/${username}`);

  document.getElementById("profileWelcome").textContent =
    `Welcome back ${profile.data.name}`;
}
