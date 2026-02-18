import {
  fetchAndShowPosts,
  homeBtns,
  HomeView,
  setupSearch,
} from "./views/HomeView.js";
import { NotfoundView } from "./views/NotFoundView.js";
import { LoginView, initLogin } from "./views/LoginView.js";
import { registerUser, RegisterView } from "./views/RegisterView.js";
import { ProfileView, renderProfile } from "./views/ProfileView.js";
import { initPostModal } from "./views/PostModalView.js";
import { createPost, CreatePostView } from "./views/CreatePostView.js";
import { UserView, renderUser } from "./views/UserView.js";

export function router() {
  const routes = {
    "#/": HomeView,
    "#/login": LoginView,
    "#/register": RegisterView,
    "#/profile": ProfileView,
    "#/create": CreatePostView,
    "#/user": UserView,
  };

  async function handleRoute() {
    const hash = window.location.hash || "#/";
    const [_, route, param] = hash.split("/");

    if (route === "user" && param) {
      document.getElementById("app").innerHTML = UserView();
      await renderUser(decodeURIComponent(param));
      return;
    }

    const view = routes[hash] || NotfoundView;
    document.getElementById("app").innerHTML = await view();

    if (hash === "#/login") initLogin();
    if (hash === "#/profile") renderProfile();
    if (hash === "#/register") registerUser();
    if (hash === "#/create") createPost();

    if (hash === "#/") {
      homeBtns();
      setupSearch();
      initPostModal();
      fetchAndShowPosts(1, "");
    }
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);
}
