import { login } from "../api/auth.js";

export function LoginView() {
  return /* HTML */ `
    <section>
      <form id="loginForm">
        <input id="email" type="email" placeholder="Email" required />
        <input id="password" type="password" placeholder="Password" required />
        <button type="submit">Log in</button>
      </form>
      <a href="#/register">Register</a>
    </section>
  `;
}

export function handleLogin() {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = await login(email, password);

    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("name", data.data.name);

    window.location.hash = "#/";
  });
}
