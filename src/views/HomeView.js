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
      <section id="feed">
        <div id="posts"></div>
        <div class="flex justify-between mt-12">
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
    const response = await get(
      `social/posts?page=${page}&limit=15&_author=true`,
    );
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

      card.className = "post-card";
      date.className = "text-xs text-gray-500";
      body.className = "post-textarea bg-slate-200";
      header.className = "flex justify-between items-center";
      leftHeader.className = "flex items-center gap-2";
      avatarWrapper.className = "w-10 h-10 rounded-full overflow-hidden";

      const imageUrl = post.media?.url;
      if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = post.media?.alt || "Post image";
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

      leftHeader.append(avatarWrapper, username);
      header.append(leftHeader, date);
      card.append(header, title, imageContainer, body);
      postsContainer.append(card);
    });

    if (meta.isLastPage) {
      nextBtn.style.display = "none";
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

// export async function searchPosts(query) {
//   const response = await get(
//     `social/posts?search=${encodeURIComponent(query)}`,
//   );
//   return response.data;
// }
