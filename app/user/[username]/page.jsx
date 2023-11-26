import React from "react";
import CreateProduct from "../../components/CreateProduct";
import User from "@/app/models/User";
import UserPage from "../../components/User";
import { verify } from "jsonwebtoken";
import UserProducts from "../../components/UserProducts";
import { cookies } from "next/headers";
import Product from "@/app/models/Product";
import Link from "next/link";
const Page = async ({ params }) => {
  const { username } = params;
  const user = await User.findOne({ username });
  const products = await Product.find({ author: username });
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");

  if (!token) return;

  const loggedUser = verify(token.value, "secret");
  if (!loggedUser) return;

  // Mock user data
  // const user = {
  //   username: username,
  //   profileImage: "https://example.com/user-avatar.jpg",
  //   bio: "Web Developer | UX Enthusiast",
  //   followers: [1000],
  //   following: [500],
  //   posts: [50],
  //   // Add more user details here
  // };

  return (
    <div className="container mx-auto mt-6">
      <UserPage user={user} loggedUser={loggedUser} />
      {loggedUser.username == username ? (
        <CreateProduct author={loggedUser.username} />
      ) : null}
      <UserProducts products={products} loggedUser={loggedUser} user={user} />
      <div className="flex items-center justify-center mt-5">
        {" "}
        <Link href={"/dashboard"}>Go Back To Dashboard</Link>
      </div>
    </div>
  );
};

export default Page;
