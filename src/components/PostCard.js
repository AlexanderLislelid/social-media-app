import { heartIcon } from "../utils/icons.js";
import { openPostModal } from "../views/PostModalView.js";

/**
 *creates a post card prom a post object
 *
 *
 * @param {object} post  post data from the api
 * @returns {HTMLDivElement} A DOM element representing the post card
 *
 * @example
 * const card = createPostCard(post);
 * postsContainer.append(card);
 */
export function createPostCard(post) {
  const card = document.createElement("div");
  const title = document.createElement("h2");
  const body = document.createElement("p");
  const date = document.createElement("p");
  const imageContainer = document.createElement("div");
  const header = document.createElement("div");
  const leftHeader = document.createElement("div");
  const username = document.createElement("span");
  const avatarWrapper = document.createElement("div");
  const bottomCard = document.createElement("div");
  const commentCount = document.createElement("p");
  const reactionsWrapper = document.createElement("div");
  const reactions = document.createElement("p");

  card.style.cursor = "pointer";
  card.className = "post-card";
  date.className = "text-xs text-slate-400";
  body.className =
    "post-textarea bg-slate-700 text-slate-100 border border-slate-800 shadow-md";
  header.className = "flex justify-between items-center text-slate-400";
  leftHeader.className = "flex items-center gap-2";
  avatarWrapper.className = "w-10 h-10 rounded-full overflow-hidden";
  commentCount.className = "text-sm text-slate-400 ml-2 mt-2";
  reactions.className = "text-sm text-slate-400";
  bottomCard.className = "flex justify-between";
  reactionsWrapper.className =
    "flex items-center gap-1 text-sm text-slate-400 ml-2 mt-2";

  if (post.media?.url) {
    const img = document.createElement("img");
    img.src = post.media.url;
    img.alt = "Post image";
    imageContainer.append(img);
  }

  if (post.author?.avatar?.url) {
    const userAvatar = document.createElement("img");
    userAvatar.src = post.author.avatar.url;
    userAvatar.alt = `${post.author.name} avatar`;
    userAvatar.className = "w-10 h-10 rounded-full";
    avatarWrapper.append(userAvatar);
  }

  const formattedDateString = new Date(post.updated).toLocaleString("no-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  title.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1);
  body.textContent = post.body;
  date.textContent = formattedDateString;
  username.textContent = post.author?.name || "Unknown user";
  commentCount.textContent = `${post._count.comments} Comments`;
  reactions.textContent = post._count.reactions;

  card.onclick = () => openPostModal(post.id);

  reactionsWrapper.append(reactions, heartIcon());
  bottomCard.append(commentCount, reactionsWrapper);
  leftHeader.append(avatarWrapper, username);
  header.append(leftHeader, date);
  card.append(header, title, imageContainer, body, bottomCard);

  return card;
}
