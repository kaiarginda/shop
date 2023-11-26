import React from "react";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import Nav from "../components/Nav";
import ProductsList from "../components/ProductsList";
import HeroPage from "../components/HeroPage";
import Link from "next/link";
import RenderHello from "../components/RenderHello";
import { connectMongoDB } from "../mongodb";
const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");
  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 p-4">
          No user found. Please try again.
        </h1>
        <p className="text-blue-500">
          <Link href="/login">Try Again</Link>
        </p>
      </div>
    );
  } else {
    const user = verify(token.value, "secret");
    // console.log("console fr frfr frfrfrf frf rf r", user);
    return (
      <div>
        <RenderHello name={user.username} />
        <Nav user={user} />
        <HeroPage />
        <ProductsList />
      </div>
    );
  }
};

export default page;
