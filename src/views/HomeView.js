import { loadToken, loadApiKey } from "../utils/storage.js";
import { get, put, post, del } from "../api/apiClient.js";

export async function HomeView() {
  if (loadToken() && loadApiKey()) {
    return /* HTML */ `
      <section class="px-4 md:max-w-4xl md:mx-auto">
        <div
          class="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            class="flex-1 border rounded px-3 py-2 h-10 resize-none"
          ></textarea>

          <button
            class="shrink-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
          >
            Create Post
          </button>
        </div>
      </section>
      <section id="feed" class="flex flex-col gap-6">
        <div id="posts" class="flex flex-col border border-black p-4"></div>
        <div>
          <button id="prev-page-btn">Previous page</button>
          <button id="next-page-btn">Next page</button>
        </div>
      </section>
    `;
  }
  window.location.hash = "#/login";
}

let currentPage = 1;
let isFetching = false;

//This code is based on pagination example from JS2 Module 2.2
export async function fetchAndShowPosts(page) {
  const postsContainer = document.getElementById("posts");
  const nextBtn = document.getElementById("next-page-btn");

  if (!postsContainer || !nextBtn) return;

  isFetching = true;
  nextBtn.textContent = "Loading...";
  nextBtn.disabled = true;

  try {
    const response = await get(`social/posts?page=${page}&limit=15`);
    const posts = response.data;
    const meta = response.meta;

    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const card = document.createElement("div");
      const title = document.createElement("h2");
      const body = document.createElement("p");

      card.className = "post-card";

      const imageUrl = post.media?.url;
      if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = post.media?.alt || "Post image";
        card.append(img);
      }

      title.textContent = post.title;
      body.textContent = post.body;

      card.append(title, body);
      postsContainer.appendChild(card);
      console.log(post);
    });

    if (meta.isLastPage) {
      nextBtn.style.display = "none"; // Hide button if no more pages
    } else {
      nextBtn.textContent = "Load More";
      nextBtn.disabled = false;
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
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
    fetchAndShowPosts(currentPage);
  };

  prevBtn.onclick = () => {
    if (isFetching || currentPage <= 1) return;
    currentPage--;
    fetchAndShowPosts(currentPage);
  };
}
