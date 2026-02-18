import { loadToken, loadApiKey } from "../utils/storage.js";
import { get } from "../api/apiClient.js";
import { createPostCard } from "../components/PostCard.js";

export async function HomeView() {
  if (loadToken() && loadApiKey()) {
    return /* HTML */ `
      <section class="max-w-[500px] mx-auto mt-6">
        <form
          id="search-form"
          class="bg-slate-800 border border-slate-700 rounded-xl shadow p-3 flex flex-col sm:flex-row sm:items-center gap-2"
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
            class="bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 transition-colors w-full sm:w-auto"
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
          <div class="flex justify-between">
            <button
              id="follow-user-btn"
              class="bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 transition-colors "
            >
              Follow user
            </button>
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
      const card = createPostCard(post);
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
