import { loadToken, loadApiKey } from "../utils/storage.js";
import { post } from "../api/apiClient.js";

export async function CreatePostView() {
  if (loadToken() && loadApiKey()) {
    return /* HTML */ `
      <form
        id="create-form"
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-10"
      >
        <h1 class="text-center text-2xl font-bold text-slate-100 mt-4 mb-10">
          Create your first socialApp post
        </h1>
        <div class="flex flex-col">
          <label for="post-title" class="text-sm text-slate-300 ml-1 mb-1"
            >Give your post a title</label
          >
          <input
            type="text"
            id="post-title"
            class="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="post-content" class="text-sm text-slate-300 ml-1 mb-1"
            >Write your post</label
          >
          <textarea
            id="post-content"
            rows="6"
            class="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label for="post-media-url" class="text-sm text-slate-300 ml-1 mb-1"
            >Attatch an image URL</label
          >
          <input
            type="text"
            id="post-media-url"
            class="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 font-medium"
        >
          Create Post
        </button>
      </form>
    `;
  }
  window.location.hash = "#/login";
}

/**
 * Creates a new post
 *
 * reads values from the create post form ( title, body, imageurl(optional))
 * on submit, sends a POST request to the social/posts endpoint
 *
 * on success, redirects to the feed page "#/"
 * if the request fails, the API error message is shown in an alert
 *
 *
 * @function createPost
 * @returns {void}
 */
export function createPost() {
  const form = document.getElementById("create-form");
  const titleInput = document.getElementById("post-title");
  const contentInput = document.getElementById("post-content");
  const mediaUrlInput = document.getElementById("post-media-url");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = contentInput.value.trim();
    const mediaUrl = mediaUrlInput.value.trim();

    const content = { title, body };

    if (mediaUrl) {
      content.media = {
        url: mediaUrl,
        alt: title || "Post image",
      };
    }

    try {
      await post("social/posts", content);
      window.location.hash = "#/";
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}
