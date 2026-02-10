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

    <section class="px-4 md:max-w-4xl md:mx-auto space-y-6 mt-16">
      <div>
        <h2 class="text-slate-700">Latest posts:</h2>
        <div id="post">
          <div
            id="post-content"
            class="bg-white rounded-lg shadow p-4 mb-6 flex flex-col gap-4 mt-4"
          >
            <span
              class="inline-block h-10 w-10 rounded-full bg-gray-300"
            ></span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="flex gap-2">
              <span
                class="inline-block h-5 w-5 rounded-full bg-gray-300"
              ></span>
              <span
                class="inline-block h-5 w-5 rounded-full bg-gray-300"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
