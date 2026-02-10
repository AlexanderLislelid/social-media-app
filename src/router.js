import { HomeView } from "./views/HomeView.js";
import { NotfoundView } from "./views/NotFoundView.js";
import { LoginView } from "./views/LoginView.js";

export function router() {
  const routes = {
    "#/": HomeView,
    "#/login": LoginView,
    // legg til fleire etter kvart
  };

  function handleRoute() {
    const hash = window.location.hash || "#/";
    const view = routes[hash] || NotfoundView;
    document.getElementById("app").innerHTML = view();
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);
}
