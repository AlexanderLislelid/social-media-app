import { register } from "../api/auth.js";

export function RegisterView() {
  return /* HTML */ `
    <section>
      <p>name: my_username</p>
      <p>email": "first.last@stud.noroff.no</p>
      <p>password": eXaMpLe1375</p>
      <form id="registerForm">
        <input id="name" type="text" placeholder="Name" required />
        <input id="email" type="email" placeholder="Email" required />
        <input id="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
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
      console.error(error.message);
    }
  });
}
