export async function HomeView() {
  return /* HTML */ `
    <section class="px-4 md:max-w-4xl md:mx-auto">
      <div
        class="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4"
      >
        <textarea
          placeholder="What's on your mind?"
          class="flex-1 border rounded px-3 py-2 h-10 resize-none"
        ></textarea>

        <button
          class="shrink-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Create Post
        </button>
      </div>
    </section>
  `;
}
