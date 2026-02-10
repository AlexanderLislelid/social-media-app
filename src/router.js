import { HomeView } from "./views/HomeView.js";
import { NotfoundView } from "./views/NotFoundView.js";
import { LoginView, handleLogin } from "./views/LoginView.js";
import { RegisterView, handleRegister } from "./views/RegisterView.js";
import { ProfileView } from "./views/ProfileView.js";

export function router() {
  const routes = {
    "#/": HomeView,
    "#/login": LoginView,
    "#/register": RegisterView,
    "#/profile": ProfileView,
  };

  async function handleRoute() {
    const hash = window.location.hash || "#/";
    const view = routes[hash] || NotfoundView;

    document.getElementById("app").innerHTML = await view();

    if (hash === "#/login") handleLogin();
    if (hash === "#/register") handleRegister();
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);
}
