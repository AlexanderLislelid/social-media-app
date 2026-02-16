import { post } from "../api/apiClient.js";
import { loadApiKey, saveApiKey, saveToken } from "../utils/storage.js";

export function LoginView() {
  return /* HTML */ `
    <section class="px-4 mt-12">
      <div
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6"
      >
        <h1 class="text-2xl font-bold text-slate-100 text-center">Log in</h1>

        <form id="loginForm" class="space-y-4">
          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm text-slate-300 ml-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
              autocomplete="email"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm text-slate-300 ml-1"
              >Password</label
            >
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 font-medium"
          >
            Log in
          </button>

          <p id="loginError" class="text-red-400 text-sm hidden"></p>
        </form>

        <p class="text-sm text-slate-400 text-center">
          Don't have an account?
          <a
            href="#/register"
            class="text-indigo-400 hover:text-indigo-300 font-medium "
          >
            Register
          </a>
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
