import { loadToken, removeToken } from "../utils/storage.js";
import { get } from "../api/apiClient.js";

export function ProfileView() {
  return /* HTML */ `
    <section class="flex flex-col items-center">
      <img id="avatar" class="w-24 rounded-full mt-4 mb-8"></img>
      <h1 id="profileWelcome"></h1>
      <div class="flex gap-2 mt-8">
        <p>Followers:<span id="followers"></span></p>
        <p>Following:<span id="following"></span></p>
        <p>Posts:<span id="posts"></span></p>
      </div>
    </section>
  `;
}

export async function renderProfile() {
  const username = localStorage.getItem("username");
  const profileData = await get(`social/profiles/${username}`);
  const profile = profileData.data;

  const welcomeMsg = document.getElementById("profileWelcome");
  const avatar = document.getElementById("avatar");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const posts = document.getElementById("posts");

  welcomeMsg.textContent = `Welcome back ${profile.name}`;
  avatar.src = profile.avatar.url;
  avatar.alt = "Profile picture";
  followers.textContent = profile._count.followers;
  following.textContent = profile._count.following;
  posts.textContent = profile._count.posts;

  console.log(profile);
}
