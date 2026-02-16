import { post } from "../api/apiClient.js";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../utils/validation.js";

export function RegisterView() {
  return /* HTML */ `
    <section class="px-4 mt-12">
      <div
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6"
      >
        <h1 class="text-2xl font-bold text-slate-100 text-center">Register</h1>

        <form id="registerForm" novalidate class="space-y-4">
          <div class="flex flex-col gap-1">
            <label for="name" class="text-sm text-slate-300">Name</label>
            <input
              id="name"
              type="text"
              placeholder="your_username"
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
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
 * on submit, validates input and sends retrieved values to the auth/register endpoint
 *
 * on success redirects to login page
 * if validation fails, the error message is shown in the UI
 * if the request fails, the API error message is shown in the UI
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

    const username = name.value.trim();
    const userEmail = email.value.trim();
    const userPassword = password.value;

    if (!isValidUsername(username)) {
      errorMsg.textContent =
        "Name can only contain letters, numbers and underscore";
      errorMsg.classList.remove("hidden");
      return;
    }

    if (!isValidEmail(userEmail)) {
      errorMsg.textContent = "Email must be a valid @stud.noroff.no address";
      errorMsg.classList.remove("hidden");
      return;
    }

    if (!isValidPassword(userPassword)) {
      errorMsg.textContent = "The password must be at least 8 characters";
      errorMsg.classList.remove("hidden");
      return;
    }

    try {
      await post("auth/register", {
        name: username,
        email: userEmail,
        password: userPassword,
      });

      window.location.hash = "#/login";
    } catch (error) {
      errorMsg.textContent = error.message;
      errorMsg.classList.remove("hidden");
    }
  });
}
