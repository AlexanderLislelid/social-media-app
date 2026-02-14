import { loadToken, loadApiKey } from "../utils/storage.js";
import { openPostModal } from "./PostModalView";
import { get } from "../api/apiClient.js";

export async function HomeView() {
  if (loadToken() && loadApiKey()) {
    return /* HTML */ `
      <section class="px-4 max-w-2xl mx-auto mt-6">
        <form
          id="search-form"
          class="bg-slate-800 border border-slate-700 rounded-xl shadow p-3 flex items-center gap-2"
        >
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search posts..."
            class="flex-1 bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            class="bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Search
          </button>
        </form>
      </section>
      <section id="feed">
        <div id="posts"></div>
        <div class="flex justify-between mt-12">
          <button id="prev-page-btn">Previous page</button>
          <button id="next-page-btn">Next page</button>
        </div>
      </section>
      <div
        id="post-modal"
        class="hidden fixed inset-0  items-start justify-center pt-24 z-50"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div
          class="modal-panel bg-slate-900/80 border border-slate-700 rounded-xl shadow-xl p-6 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto text-slate-100 backdrop-blur"
        >
          <div class="flex justify-end">
            <button
              id="modal-close"
              class="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg hover:border-indigo-500 hover:text-indigo-300  text-sm"
            >
              Close
            </button>
          </div>

          <div id="post-modal-content" class="mt-4"></div>
        </div>
      </div>
    `;
  }
  window.location.hash = "#/login";
}

let currentPage = 1;
let isFetching = false;
let currentSearch = "";

//This code is based on pagination example from JS2 Module 2.2
export async function fetchAndShowPosts(page, search = "") {
  const postsContainer = document.getElementById("posts");
  const nextBtn = document.getElementById("next-page-btn");

  if (!postsContainer || !nextBtn) return;

  isFetching = true;
  nextBtn.textContent = "Loading...";
  nextBtn.disabled = true;

  try {
    let url = `social/posts?page=${page}&limit=10&_author=true&_count=true`;

    if (search) {
      url = `social/posts/search?q=${encodeURIComponent(search)}&_author=true&_count=true`;
    }

    const response = await get(url);

    const posts = response.data;
    const meta = response.meta;

    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const card = document.createElement("div");
      const title = document.createElement("h2");
      const body = document.createElement("p");
      const date = document.createElement("p");
      const imageContainer = document.createElement("div");
      const header = document.createElement("div");
      const leftHeader = document.createElement("div");
      const username = document.createElement("span");
      const avatarWrapper = document.createElement("div");
      const bottomCard = document.createElement("div");
      const commentCount = document.createElement("p");
      const reactionsWrapper = document.createElement("div");
      const heartIcon = document.createElement("span");
      const reactions = document.createElement("p");

      card.style.cursor = "pointer";
      card.className = "post-card";
      date.className = "text-xs text-slate-400";
      body.className =
        "post-textarea bg-slate-700 text-slate-100 border border-slate-800 shadow-md text-slate-100";
      header.className = "flex justify-between items-center text-slate-400";
      leftHeader.className = "flex items-center gap-2";
      avatarWrapper.className = "w-10 h-10 rounded-full overflow-hidden";
      commentCount.className = "text-sm text-slate-400 ml-2 mt-2";
      reactions.className = "text-sm text-slate-400";
      bottomCard.className = "flex justify-between";
      reactionsWrapper.className =
        "flex items-center gap-1 text-sm text-slate-400 ml-2 mt-2";

      const imageUrl = post.media?.url;
      if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Post image";
        imageContainer.append(img);
      }

      const profileImgUrl = post.author?.avatar?.url;
      if (profileImgUrl) {
        const userAvatar = document.createElement("img");
        userAvatar.src = profileImgUrl;
        userAvatar.alt = `${post.author.name} avatar`;
        userAvatar.className = "w-10 h-10 rounded-full";
        avatarWrapper.append(userAvatar);
      }

      //icon from heroicons.com
      heartIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-400">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`;

      const dateString = post.updated;
      const formattedDateString = new Date(dateString).toLocaleString("no-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      title.textContent =
        post.title.charAt(0).toUpperCase() + post.title.slice(1);
      body.textContent = post.body;
      date.textContent = formattedDateString;
      username.textContent = post.author?.name || "Unknown user";
      commentCount.textContent = `${post._count.comments} Comments`;
      reactions.textContent = post._count.reactions;

      //open a single post
      card.onclick = () => {
        openPostModal(post.id);
      };

      reactionsWrapper.append(reactions, heartIcon);
      bottomCard.append(commentCount, reactionsWrapper);
      leftHeader.append(avatarWrapper, username);
      header.append(leftHeader, date);
      card.append(header, title, imageContainer, body, bottomCard);
      postsContainer.append(card);
    });

    if (meta.isLastPage) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.textContent = "Next Page";
      nextBtn.disabled = false;
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    alert(error);
  } finally {
    isFetching = false;
  }
}

export function homeBtns() {
  const nextBtn = document.getElementById("next-page-btn");
  const prevBtn = document.getElementById("prev-page-btn");

  nextBtn.onclick = () => {
    if (isFetching) return;
    currentPage++;
    fetchAndShowPosts(currentPage, currentSearch);
    window.scrollTo(0, 0);
  };

  prevBtn.onclick = () => {
    if (isFetching || currentPage <= 1) return;
    currentPage--;
    fetchAndShowPosts(currentPage, currentSearch);
    window.scrollTo(0, 0);
  };
}

export function setupSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    currentSearch = input.value.trim();
    currentPage = 1;

    fetchAndShowPosts(currentPage, currentSearch);
    window.scrollTo(0, 0);
  });
}
