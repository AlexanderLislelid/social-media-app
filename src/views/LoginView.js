import { post } from "../api/apiClient.js";
import {
  loadApiKey,
  saveApiKey,
  saveToken,
  loadToken,
} from "../utils/storage.js";

export function LoginView() {
  return /* HTML */ `
    <section class="px-4 mt-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Log in</h1>

        <form id="loginForm" class="space-y-4">
          <div>
            <label for="email"> Email </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              autocomplete="email"
              required
            />
          </div>

          <div>
            <label for="password"> Password </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>

          <button type="submit">Log in</button>
          <p id="loginError" class="text-red-500 text-sm hidden"></p>
        </form>

        <p>
          Don't have an account?
          <a href="#/register"> Register </a>
        </p>
      </div>
    </section>
  `;
}

//JSDOC this function? user login (sends email and password -> saves token -> checks if there is an api key, if not -> create api key and add to localstorage -> Sets username to localstorage -> router adds function after DOMcontent is loaded)
export function initLogin() {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const errorMsg = document.getElementById("loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.classList.add("hidden");
    errorMsg.textContent = "";

    try {
      const data = await post("auth/login", {
        email: email.value.trim(),
        password: password.value,
      });

      saveToken(data.data.accessToken);
      localStorage.setItem("username", data.data.name);

      if (!loadApiKey()) {
        const keyData = await post("auth/create-api-key", {
          name: "Social-App",
        });
        saveApiKey(keyData.data.key);
      }

      window.location.hash = "#/";
    } catch (error) {
      errorMsg.textContent = error.message;
      errorMsg.classList.remove("hidden");
    }
  });
}
