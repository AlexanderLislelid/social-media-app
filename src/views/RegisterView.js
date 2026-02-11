export function RegisterView() {
  return /* HTML */ `
    <section class="px-4 mt-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Register</h1>

        <form id="registerForm" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="your_username"
              required
              class="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
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
              required
              class="mt-1 w-full border border-gray-300 rounded px-3 py-2 "
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
          <p id="registerError" class="text-red-500 text-sm hidden"></p>
        </form>

        <p class="text-sm text-gray-600 mt-4 text-center">
          Already have an account?
          <a href="#/login" class="text-blue-600 hover:underline"> Login </a>
        </p>
      </div>
    </section>
  `;
}

export function handleRegister() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const data = await register(name, email, password);
      console.log("User created:", data);

      window.location.hash = "#/login";
    } catch (error) {
      const errorMsg = document.getElementById("registerError");
      if (errorMsg) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove("hidden");
      }
    }
  });
}
