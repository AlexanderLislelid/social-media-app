import { get, put } from "../api/apiClient.js";

export function initPostModal() {
  const modal = document.getElementById("post-modal");
  const closeBtn = document.getElementById("modal-close");

  function close() {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    modal.classList.remove("flex");
    document.getElementById("post-modal-content").innerHTML = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
    }
  });
  closeBtn.onclick = close;
}

export async function openPostModal(postId) {
  const modal = document.getElementById("post-modal");
  const content = document.getElementById("post-modal-content");
  const followBtn = document.getElementById("follow-user-btn");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");

  const result = await get(
    `social/posts/${postId}?_author=true&_comments=true&_reactions=true`,
  );
  const post = result.data;

  // note to self: add ability to unfollow user ( /social/profiles/<name>/unfollow )
  followBtn.onclick = async () => {
    try {
      await put(`social/profiles/${post.author.name}/follow`);
      followBtn.textContent = "Following";
      followBtn.disabled = true;
      followBtn.classList.add = "cursor-not-allowed";
    } catch (error) {
      alert(error.message);
    }
  };

  const date = new Date(post.created).toLocaleString("no-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const posterAvatar = post.author?.avatar?.url
    ? `<img 
     class="w-14 h-14 rounded-full object-cover border border-slate-700" 
     src="${post.author.avatar.url}" 
     alt="post author's profile picture"
   >`
    : "";

  const postTitle =
    post.title &&
    `<h2 class="text-lg font-semibold text-slate-100">${post.title}</h2>`;

  const postBody =
    post.body && `<p class="text-slate-300 leading-relaxed">${post.body}</p>`;

  const comments =
    post.comments
      .map(
        (comment) => `
    <div class="border-t border-slate-700 pt-2 mt-4">
      <div class="flex items-center gap-4 py-2">
        <img
          src="${comment.author.avatar.url}"
          class="w-8 h-8 rounded-full border border-slate-700"
          alt="${comment.author.name}'s avatar"
        >
        <p class="text-sm font-semibold text-slate-100">${comment.author.name}</p>
      </div>
      <p class="text-sm text-slate-300">${comment.body}</p>
    </div>
  `,
      )
      .join("") ||
    "<p class='text-sm text-slate-400 border-t border-slate-700 pt-2 mt-4'>No comments yet</p>";

  content.innerHTML = `
  <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto space-y-3 text-slate-100">

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        ${posterAvatar}
        <p class="font-semibold text-slate-100">
          ${post.author.name}
        </p>
      </div>

      <p class="text-xs text-slate-400">${date}</p>
    </div>

    ${postTitle}
    ${postBody}

    ${
      post.media?.url
        ? `<img 
            class="w-full rounded-lg object-cover max-h-[500px] border border-slate-700" 
            src="${post.media.url}" 
            alt="${post.media?.alt ?? "Post image"}"
          >`
        : ""
    }

    <div class="mt-6 space-y-2">
      ${comments}
    </div>
  </div>
`;
}
