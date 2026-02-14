import { post } from "../api/apiClient.js";

export function RegisterView() {
  return /* HTML */ `
    <section class="px-4 mt-12">
      <div
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6"
      >
        <h1 class="text-2xl font-bold text-slate-100 text-center">Register</h1>

        <form id="registerForm" class="space-y-4">
          <div class="flex flex-col gap-1">
            <label for="name" class="text-sm text-slate-300">Name</label>
            <input
              id="name"
              type="text"
              placeholder="your_username"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm text-slate-300"
              >Password</label
            >
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 
              rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <span id="registerError" class="text-red-400 text-sm hidden"></span>

          <button
            type="submit"
            class="w-full bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 font-medium"
          >
            Register
          </button>
        </form>

        <p class="text-sm text-slate-400 text-center">
          Already have an account?
          <a
            href="#/login"
            class="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  `;
}

/**
 * Registers a new user
 *
 * retrieves values from the registerform ( name, email and password)
 * on submit, sends retrieved values to the auth/register endpoint
 * on success redirects to login page
 * if registration request fails, the error message is shown in the UI
 *
 * @function registerUser
 * @returns {void}
 */
export function registerUser() {
  const form = document.getElementById("registerForm");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const errorMsg = document.getElementById("registerError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMsg.classList.add("hidden");
    errorMsg.textContent = "";

    try {
      await post("auth/register", {
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value,
      });

      window.location.hash = "#/login";
    } catch (error) {
      errorMsg.textContent = error.message;
      errorMsg.classList.remove("hidden");
    }
  });
}
