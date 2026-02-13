import { loadToken, loadApiKey } from "../utils/storage.js";
import { post } from "../api/apiClient.js";

export async function CreatePostView() {
  if (loadToken() && loadApiKey()) {
    return /* HTML */ `
      <h1 class="text-center text-2xl font-bold">
        Create your first socialApp post
      </h1>
      <form id="create-form" class="flex flex-col gap-4">
        <div>
          <label for="post-title">Title</label>
          <input type="textarea" id="post-title" />
        </div>
        <div>
          <label for="post-content">Body</label>
          <input type="textarea" id="post-content" />
        </div>
        <div>
          <label for="post-media-url">Image URL</label>
          <input type="textarea" id="post-media-url" />
        </div>
        <button type="submit">Create Post</button>
      </form>
    `;
  }
  window.location.hash = "#/login";
}

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
