import User from "../../models/User";

export async function PATCH(req) {
  const { following, followerUsername } = await req.json();

  const followerUser = await User.findOne({ username: followerUsername });

  if (following.followers.includes(followerUsername)) {
    following.followers.splice(
      following.followers.indexOf(followerUsername),
      1
    );
    followerUser.following.splice(
      followerUser.following.indexOf(following.username),
      1
    );
    await User.findOneAndUpdate(
      { username: following.username },
      {
        followers: following.followers,
      }
    );

    await User.findOneAndUpdate(
      {
        username: followerUsername,
      },
      {
        following: [...followerUser.following],
      }
    );
    return new Response("af");
  }
  await User.findOneAndUpdate(
    { username: following.username },
    {
      followers: [...following.followers, followerUsername],
    }
  );
  await User.findOneAndUpdate(
    {
      username: followerUsername,
    },
    {
      following: [...followerUser.following, following.username],
    }
  );
  return new Response("af");
}
