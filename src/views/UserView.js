import { get, put } from "../api/apiClient.js";
import { userIcon, postIcon, usersIcon } from "../utils/icons.js";
import { createButton } from "../components/Button.js";
import { loadToken } from "../utils/storage.js";

export function UserView() {
  return /* HTML */ `
    <section
      id="profile-page"
      class="flex flex-col items-center max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-16 text-slate-100 text-sm"
    >
      <div id="btn-container" class="self-start w-full"></div>
      <h1 id="profileWelcome" class="font-semibold text-3xl text-center"></h1>
      <p id="user-email" class="!mt-0 text-slate-300"></p>
      <img id="avatar" class="w-24 h-24 rounded-full mt-4" />
      <div id="bio">
        <p id="user-bio" class="text-slate-300 "></p>
      </div>
      <div id="stats" class="flex w-full border-t-slate-500 border-t-2 ">
        <div id="followers" class="p-2 mt-2">
          <span id="followers-number" class="flex gap-1 text-white"></span>
        </div>
        <div id="posts-num" class="p-2 mt-2">
          <span id="posts-number" class="flex gap-1"></span>
        </div>
      </div>
    </section>
    <section>
      <h2
        id="posts-heading"
        class="my-6 text-slate-100 text-xl font-semibold"
      ></h2>
      <div id="posts" class="flex flex-col gap-12 items-start"></div>
    </section>
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
  const numOfPosts = document.getElementById("posts-number");
  const btnContainer = document.getElementById("btn-container");
  const followBtn = createButton("Follow");
  const postsHeading = document.getElementById("posts-heading");
  const userEmail = document.getElementById("user-email");

  // Follow button
  const currentUser = localStorage.getItem("username");
  let isFollowing = user.followers.some(
    (followers) => followers.name === currentUser,
  );

  updateButton();

  btnContainer.append(followBtn);

  function updateButton() {
    if (!isFollowing) {
      followBtn.textContent = "Follow";
    } else {
      followBtn.textContent = "Unfollow";
    }
  }
  followBtn.onclick = async () => {
    try {
      if (isFollowing) {
        await put(`social/profiles/${user.name}/unfollow`);
        isFollowing = false;
      } else {
        await put(`social/profiles/${user.name}/follow`);
        isFollowing = true;
      }
      updateButton();
    } catch (error) {
      alert(error.message);
    }
  };

  avatar.src = user.avatar.url;
  welcome.textContent = `${user.name}'s Profile`;
  userEmail.textContent = `@${user.email}`;

  if (user.posts.length > 0) {
    postsHeading.textContent = `${user.name}'s Posts`;
  } else {
    postsHeading.textContent = `${user.name} has not made any posts yet`;
  }

  if (user.bio === null) {
    bio.textContent = "This user has not updated their bio yet";
  } else {
    bio.textContent = user.bio;
  }

  btnContainer.append(followBtn);
  numOfFollowers.append(usersIcon());
  numOfFollowers.append(user.followers.length);

  numOfPosts.append(postIcon());
  numOfPosts.append(user.posts.length);

  const postsWrapper = document.getElementById("posts");

  console.log(user);
  //user posts rendering
  user.posts.forEach((post) => {
    const postCard = document.createElement("div");
    const title = document.createElement("h2");
    const body = document.createElement("p");
    const image = document.createElement("img");

    title.textContent = post.title;
    body.textContent = post.body;
    image.src = post.media.url;
    image.alt = post.media.alt;

    title.className = "text-slate-100 text-lg mb-2";
    body.className = "text-slate-400 text-sm mb-4";
    postCard.className = "bg-slate-800 p-4 rounded-lg shadow-md";
    image.className = "rounded-lg";

    postCard.append(title, body, image);
    postsWrapper.append(postCard);
  });
}
