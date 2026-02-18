import { get } from "../api/apiClient.js";
import { userIcon, postIcon, usersIcon } from "../utils/icons.js";

export function UserView() {
  return /* HTML */ `
    <section
      id="profile-page"
      class="flex flex-col items-center max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-16 text-slate-100 text-sm"
    >
      <h1 id="profileWelcome" class="font-semibold text-2xl text-center"></h1>
      <img id="avatar" class="w-24 h-24 rounded-full mt-4" />
      <div id="bio">
        <p id="user-bio"></p>
      </div>
      <div id="stats">
        <div id="followers" class="flex items-center justify-center gap-2">
          <p>Followers</p>
          <span id="followers-number" class="flex items-center gap-1"></span>
        </div>
        <div id="posts-num" class="flex items-center justify-center gap-2">
          <p>Posts</p>
          <span id="posts-number" class="flex items-center gap-1"></span>
        </div>
      </div>
    </section>
    <div id="posts" class="mt-20 flex flex-col gap-12 items-center"></div>
  `;
}
/**
 * Fetches and renders a user profile page.
 *
 * Retrieves profile data from the Noroff Social API
 * the get request also includes (followers, following, and posts)
 *
 * Updates the DOM with:
 * user profile picture, name, bio, number of followers, number of posts, and all posts created by the user
 *
 * @async
 * @function renderUser
 * @param {string} username - The username of the profile to fetch and render.
 *
 */
export async function renderUser(username) {
  const user = (
    await get(
      `social/profiles/${username}?_following=true&_followers=true&_posts=true`,
    )
  ).data;

  const avatar = document.getElementById("avatar");
  const welcome = document.getElementById("profileWelcome");
  const bio = document.getElementById("user-bio");
  const numOfFollowers = document.getElementById("followers-number");
  const numOfPosts = document.getElementById("posts-num");

  avatar.src = user.avatar.url;
  welcome.textContent = `${user.name}'s Profile`;

  if (user.bio === null) {
    bio.textContent = "This user has not updated their bio yet";
  } else {
    bio.textContent = user.bio;
  }

  numOfFollowers.append(usersIcon());
  numOfFollowers.append(user.followers.length);

  numOfPosts.append(postIcon());
  numOfPosts.append(user.posts.length);

  const postsWrapper = document.getElementById("posts");

  //user posts rendering
  user.posts.forEach((post) => {
    const postCard = document.createElement("div");
    const title = document.createElement("h2");
    const body = document.createElement("p");

    postCard.className = "post-card";

    title.textContent = post.title;
    body.textContent = post.body;

    postCard.append(title, body);
    postsWrapper.append(postCard);
  });
}
