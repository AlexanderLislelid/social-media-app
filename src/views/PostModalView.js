import { get, put } from "../api/apiClient.js";
import { createButton } from "../components/Button.js";

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
    if (e.key === "Escape") close();
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

  // follow
  followBtn.onclick = async () => {
    try {
      await put(`social/profiles/${post.author.name}/follow`);
      followBtn.textContent = "Following";
      followBtn.disabled = true;
      followBtn.classList.add("cursor-not-allowed");
    } catch (error) {
      alert(error.message);
    }
  };

  const dateStr = new Date(post.created).toLocaleString("no-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const wrapper = document.createElement("div");
  const header = document.createElement("div");
  const leftHeader = document.createElement("div");
  const authorName = document.createElement("p");
  const title = document.createElement("h2");
  const date = document.createElement("p");
  const body = document.createElement("p");

  wrapper.className =
    "bg-slate-800 border border-slate-700 rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto space-y-3 text-slate-100";
  header.className = "flex justify-between items-center";
  leftHeader.className = "flex items-center gap-2";
  authorName.className = "font-semibold text-slate-100";
  date.className = "text-xs text-slate-400";
  title.className = "text-lg font-semibold text-slate-100";
  body.className = "text-slate-300 leading-relaxed";

  authorName.textContent = post.author.name;
  date.textContent = dateStr;
  title.textContent = post.title;
  body.textContent = post.body;

  if (post.author?.avatar?.url) {
    const avatar = document.createElement("img");
    avatar.className =
      "w-14 h-14 rounded-full object-cover border border-slate-700";
    avatar.src = post.author.avatar.url;
    avatar.alt = `${post.author.name}'s profile picture`;
    leftHeader.append(avatar);
  }

  if (post.media?.url) {
    const img = document.createElement("img");
    img.className =
      "w-full rounded-lg object-cover max-h-[500px] border border-slate-700";
    img.src = post.media.url;
    img.alt = post.media?.alt ?? "Post image";
    wrapper.append(img);
  }

  const profileBtn = createButton("Profile", "profile");
  profileBtn.addEventListener("click", () => {
    window.location.hash = `#/user/${post.author.name}`;
  });

  leftHeader.append(authorName, profileBtn);
  wrapper.append(title);
  header.append(leftHeader, date);
  wrapper.append(body);

  //comments section
  const commentsWrapper = document.createElement("div");
  commentsWrapper.className = "mt-6 space-y-2";

  const comments = post.comments;

  if (comments.length === 0) {
    const empty = document.createElement("p");
    empty.className =
      "text-sm text-slate-400 border-t border-slate-700 pt-2 mt-4";
    empty.textContent = "No comments yet";
    commentsWrapper.append(empty);
  } else {
    comments.forEach((comment) => {
      const commentBox = document.createElement("div");
      const commentHeader = document.createElement("div");
      const commenterAvatar = document.createElement("img");
      const commentBody = document.createElement("p");
      const commenterName = document.createElement("p");

      commentBox.className = "border-t border-slate-700 pt-2 mt-4";
      commentHeader.className = "flex items-center gap-4 py-2";
      commenterName.className = "text-sm font-semibold text-slate-100";
      commentBody.className = "text-sm text-slate-300";

      commenterName.textContent = comment.author.name;
      commentBody.textContent = comment.body;

      commenterAvatar.className =
        "w-8 h-8 rounded-full border border-slate-700";
      commenterAvatar.src = comment.author.avatar.url;
      commenterAvatar.alt = `${comment.author.name}'s profile picture`;

      commentHeader.append(commenterAvatar, commenterName);
      commentBox.append(commentHeader, commentBody);
      commentsWrapper.append(commentBox);
    });
  }

  wrapper.append(header);
  wrapper.append(commentsWrapper);
  content.append(wrapper);
}
