import { loadToken, removeToken } from "../utils/storage.js";
import { get, del } from "../api/apiClient.js";

export function ProfileView() {
  return /* HTML */ `
    <section class="flex flex-col items-center">
      <img id="avatar" class="w-24 rounded-full mt-4 mb-8"></img>
      <h1 id="profileWelcome"></h1>
      <div class="flex gap-2 mt-8">
        <p><span id="followers"></span></p>
        <p><span id="following"></span></p>
        <p><span id="number-of-posts"></span></p>
      </div>
      
      <button id="logout"></button>
    </section>

      <div id="posts" class="mt-20 flex flex-col gap-12 items-center"></div>
      
  `;
}

export async function renderProfile() {
  const username = localStorage.getItem("username");
  const profileData = await get(`social/profiles/${username}`);
  const postData = await get(
    `social/profiles/${username}/posts?_author=true&_count=true`,
  );
  const profile = profileData.data;
  const posts = postData.data;
  console.log(posts);

  const welcomeMsg = document.getElementById("profileWelcome");
  const avatar = document.getElementById("avatar");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const numberOfPosts = document.getElementById("number-of-posts");
  const logoutBtn = document.getElementById("logout");

  if (!loadToken()) {
    logoutBtn.style.display = "none";
  }

  if (loadToken()) {
    welcomeMsg.textContent = `Welcome back ${profile.name}`;
    avatar.src = profile.avatar.url;
    avatar.alt = "Profile picture";
    followers.textContent = profile._count.followers;
    following.textContent = profile._count.following;
    numberOfPosts.textContent = profile._count.posts;

    const postCard = document.getElementById("posts");
    postCard.innerHTML = "";

    posts.forEach((post) => {
      const postCard = document.getElementById("posts");
      const contentWrapper = document.createElement("div");
      const title = document.createElement("h2");
      const body = document.createElement("p");
      const buttonsWrapper = document.createElement("div");
      const deleteBtn = document.createElement("button");
      const updateBtn = document.createElement("button");

      title.textContent = post.title;
      body.textContent = post.body;
      deleteBtn.textContent = "Delete post";
      updateBtn.textContent = "Update Post";

      deleteBtn.className = "p-2 bg-red-500 text-white rounded mr-4";
      updateBtn.className = "p-2 bg-blue-500 text-white rounded";

      contentWrapper.append(title);

      if (post.media?.url) {
        const img = document.createElement("img");
        img.src = post.media.url;
        img.alt = "Post image";
        contentWrapper.append(img);
      }

      contentWrapper.append(body);
      buttonsWrapper.append(deleteBtn, updateBtn);
      postCard.append(contentWrapper, buttonsWrapper);

      deleteBtn.addEventListener("click", async () => {
        await del(`social/posts/${post.id}`);
        renderProfile();
      });

      updateBtn.addEventListener("click", async () => {
        //-----add code for updating
      });
    });

    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", (e) => {
      localStorage.removeItem("username");
      removeToken();

      window.location.hash = "#/login";
    });
  }
}
