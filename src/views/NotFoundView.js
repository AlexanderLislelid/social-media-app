export function NotfoundView() {
  return /* HTML */ `
    <section class="flex flex-col items-center">
      <h1 class="text-4xl font-bold text-red-400">404</h1>
      <p class="mt-2 text-slate-800">The page does not exist.</p>
      <a
        href="#/"
        class="mt-6 p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
      >
        Back to homepage
      </a>
    </section>
  `;
}
