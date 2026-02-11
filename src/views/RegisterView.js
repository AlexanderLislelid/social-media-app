import { post } from "../api/apiClient.js";

export function RegisterView() {
  return /* HTML */ `
    <section class="px-4 mt-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Register</h1>

        <form id="registerForm" class="space-y-4">
          <div>
            <label for="name"> Name </label>
            <input id="name" type="text" placeholder="your_username" required />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
              required
            />
          </div>

          <div>
            <label for="password"> Password </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <span id="registerError" class="hidden"></span>
          <button type="submit">Register</button>
        </form>

        <p>Already have an account?</p>
        <a href="#/login">Login</a>
      </div>
    </section>
  `;
}

// const data = await post("auth/login", {
//   email,
//   password,
// });

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
