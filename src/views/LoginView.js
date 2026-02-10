import { login } from "../api/auth.js";

export function LoginView() {
  return /* HTML */ `
    <section class="px-4 mt-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Log in</h1>

        <form id="loginForm" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              autocomplete="email"
              required
              class="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
              class="mt-1 w-full border border-gray-300 rounded px-3 py-2 "
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Log in
          </button>
          <p id="loginError" class="text-red-500 text-sm hidden"></p>
        </form>

        <p class="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?
          <a href="#/register" class="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </section>
  `;
}

export function handleLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("name", data.data.name);

      window.location.hash = "#/";
    } catch (error) {
      console.error(error.message);

      // vise melding i UI
      const errorMsg = document.getElementById("loginError");
      if (errorMsg) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove("hidden");
      }
    }
  });
}
