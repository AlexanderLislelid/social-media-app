import { loadToken, removeToken } from "../utils/storage.js";
import { get, del, put } from "../api/apiClient.js";
import { userIcon, usersIcon, postIcon } from "../utils/icons.js";

export function ProfileView() {
  return /* HTML */ `
    <section id="profile-page" class="flex flex-col items-center max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-16 text-slate-100 text-sm" >
      <img id="avatar" class="w-24 rounded-full mt-4"></img>
      <h1 id="profileWelcome" class="font-semibold text-2xl text-center"></h1>
      <div class="mt-8 space-y-2 flex flex-col w-full max-w-xs p-4 bg-slate-600 rounded-lg shadow-md">
        <p id="followers" class="flex items-center gap-2"></p>
        <p id="following" class="flex items-center gap-2"></p>
        <p id="number-of-posts" class="flex items-center gap-2"></p>
      </div>
      <button id="logout" class=" bg-slate-900 hover:bg-slate-950 border border-slate-600 text-white px-5 py-2 text-sm rounded-lg font-medium"></button>
    </section>

      <div id="posts" class="mt-20 flex flex-col gap-12 items-center"></div>
      
  `;
}

export async function renderProfile() {
  const logoutBtn = document.getElementById("logout");
  const profilePage = document.getElementById("profile-page");
  const postCard = document.getElementById("posts");

  if (!loadToken()) {
    logoutBtn.style.display = "none";
    profilePage.innerHTML = "Please Log in to View your profile";
    postCard.innerHTML = "";
    return;
  }

  const username = localStorage.getItem("username");
  const profileData = await get(`social/profiles/${username}`);
  const postData = await get(
    `social/profiles/${username}/posts?_author=true&_count=true`,
  );
  const profile = profileData.data;
  const posts = postData.data;
  postCard.innerHTML = "";
  console.log(posts);

  const welcomeMsg = document.getElementById("profileWelcome");
  const avatar = document.getElementById("avatar");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const numberOfPosts = document.getElementById("number-of-posts");

  welcomeMsg.textContent = `Welcome back ${profile.name}`;
  avatar.src = profile.avatar.url;
  avatar.alt = `${profile.name} avatar`;

  followers.replaceChildren();
  followers.append(userIcon(), ` Followers: ${profile._count.followers}`);

  following.replaceChildren();
  following.append(usersIcon(), ` Following: ${profile._count.following}`);

  numberOfPosts.replaceChildren();
  numberOfPosts.append(postIcon(), ` Posts: ${profile._count.posts}`);

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
      const confirmed = confirm("Are you sure you want to delete this post?");
      if (!confirmed) return;
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
