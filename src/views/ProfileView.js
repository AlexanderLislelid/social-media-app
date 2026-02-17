import { loadToken, removeToken } from "../utils/storage.js";
import { get, del, put } from "../api/apiClient.js";
import { userIcon, usersIcon, postIcon } from "../utils/icons.js";

export function ProfileView() {
  return /* HTML */ `
    <section class="flex flex-col items-center max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-16 text-slate-100 text-sm" >
      <img id="avatar" class="w-24 rounded-full mt-4 mb-8"></img>
      <h1 id="profileWelcome"></h1>
      <div class="mt-8 space-y-2">
        <p id="followers"></p>
        <p id="following"></p>
        <p id="number-of-posts"></p>
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
    avatar.alt = `${profile.name} avatar`;

    followers.replaceChildren();
    followers.append(userIcon(), ` Followers: ${profile._count.followers}`);

    following.replaceChildren();
    following.append(usersIcon(), ` Following: ${profile._count.following}`);

    numberOfPosts.replaceChildren();
    numberOfPosts.append(postIcon(), ` Posts: ${profile._count.posts}`);

    const postCard = document.getElementById("posts");
    postCard.innerHTML = "";

    posts.forEach((post) => {
      const contentWrapper = document.createElement("div");
      const title = document.createElement("h2");
      const body = document.createElement("p");
      const buttonsWrapper = document.createElement("div");
      const deleteBtn = document.createElement("button");
      const openModal = document.createElement("button");
      const modal = document.createElement("dialog");
      const updateTitle = document.createElement("input");
      const updateBody = document.createElement("input");
      const updateBtn = document.createElement("button");
      const closeModal = document.createElement("button");
      const titleLabel = document.createElement("label");
      const bodyLabel = document.createElement("label");

      titleLabel.textContent = "Title";
      bodyLabel.textContent = "Body";

      title.textContent = post.title;
      body.textContent = post.body;
      deleteBtn.textContent = "Delete post";
      openModal.textContent = "Update Post";
      updateBtn.textContent = "Update..";
      closeModal.textContent = "Close";

      deleteBtn.className = "p-2 bg-red-500 text-white rounded mr-4";
      openModal.className = "p-2 bg-blue-500 text-white rounded";

      contentWrapper.append(title);

      if (post.media?.url) {
        const img = document.createElement("img");
        img.src = post.media.url;
        img.alt = "Post image";
        contentWrapper.append(img);
      }

      modal.append(
        titleLabel,
        updateTitle,
        bodyLabel,
        updateBody,
        updateBtn,
        closeModal,
      );

      contentWrapper.append(modal);
      contentWrapper.append(body);
      buttonsWrapper.append(deleteBtn, openModal);
      contentWrapper.append(buttonsWrapper);
      postCard.append(contentWrapper);

      deleteBtn.addEventListener("click", async () => {
        await del(`social/posts/${post.id}`);
        renderProfile();
      });

      openModal.addEventListener("click", () => {
        updateTitle.value = post.title;
        updateBody.value = post.body;
        modal.showModal();
      });

      updateBtn.addEventListener("click", async () => {
        await put(`social/posts/${post.id}`, {
          title: updateTitle.value,
          body: updateBody.value,
        });

        modal.close();
        renderProfile();
      });

      closeModal.addEventListener("click", () => {
        modal.close();
      });
    });

    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      removeToken();

      window.location.hash = "#/login";
    });
  }
}
