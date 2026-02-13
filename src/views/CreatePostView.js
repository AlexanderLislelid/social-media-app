import { loadToken, loadApiKey } from "../utils/storage.js";

export async function CreatePostView() {
  if (loadToken() && loadApiKey()) {
    return /* HTML */ ` <h1>Create posts</h1> `;
  }
  window.location.hash = "#/login";
}
