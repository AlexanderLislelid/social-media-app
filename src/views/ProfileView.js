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
    const modalInner = document.createElement("div");
    const titleLabel = document.createElement("label");
    const bodyLabel = document.createElement("label");
    const updateTitle = document.createElement("input");
    const updateBody = document.createElement("textarea");
    const modalActions = document.createElement("div");
    const updateBtn = document.createElement("button");
    const closeModal = document.createElement("button");

    titleLabel.textContent = "Title";
    bodyLabel.textContent = "Body";

    title.textContent = post.title;
    body.textContent = post.body;

    deleteBtn.textContent = "Delete post";
    openModal.textContent = "Update Post";
    updateBtn.textContent = "Update";
    closeModal.textContent = "Close";

    // posts stylingf
    contentWrapper.className =
      "w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl shadow p-5 space-y-4";
    title.className = "text-lg font-semibold text-slate-100";
    body.className = "text-slate-300";
    buttonsWrapper.className = "flex gap-3 pt-2";

    deleteBtn.className =
      "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium";
    openModal.className =
      "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium";

    // Modal styling
    modal.className =
      "bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-700 w-full max-w-md";
    modalInner.className = "flex flex-col gap-4";

    titleLabel.className = "text-sm text-slate-300";
    bodyLabel.className = "text-sm text-slate-300";

    updateTitle.className =
      "w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 ";
    updateBody.className =
      "w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 ";
    updateBody.rows = 4;
    modalActions.className = "flex justify-end gap-2 pt-2";

    updateBtn.className =
      "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium ";
    closeModal.className =
      "px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium ";

    //build card
    contentWrapper.append(title);

    if (post.media?.url) {
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || "Post image";
      img.className = "w-full rounded-lg border border-slate-700";
      contentWrapper.append(img);
    }

    contentWrapper.append(body);

    //build modal
    modalActions.append(closeModal, updateBtn);
    modalInner.append(
      titleLabel,
      updateTitle,
      bodyLabel,
      updateBody,
      modalActions,
    );
    modal.replaceChildren(modalInner);

    contentWrapper.append(modal);
    buttonsWrapper.append(deleteBtn, openModal);
    contentWrapper.append(buttonsWrapper);
    postCard.append(contentWrapper);

    //button functionality
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
