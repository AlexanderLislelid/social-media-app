noroff api docs url: https://docs.noroff.dev/docs/v2/social/profiles

Use examples of get, post, put, delete (url: "https://v2.api.noroff.dev/";)

- Get posts
  await get("social/posts");

- Get profile
  await get(`social/profiles/${username}`);

- Create new post
  await post("social/posts", {
  title: "my first post",
  body: "this is a testpost"
  });

- Login
  await post("auth/login", {
  email,
  password,
  });

- Update post
  await put(`social/posts/${postId}`, {
  title: "Updated title",
  body: "new text",
  });

- Update profile
  await put(`social/profiles/${username}`, {
  bio: "Frontend developer in progress 🚀",
  });

- deleting a post
  await del(`social/posts/${postId}`);

- Follow & Unfollow profile
  await put(`/social/profiles/${username}$/follow`)
  await put(`/social/profiles/${username}$/unfollow`)
