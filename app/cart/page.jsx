import React from "react";
import CardComponent from "../components/CardComponent";
import { connectMongoDB } from "../mongodb";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import AddToCart from "../components/AddToCart";
import Link from "next/link";
const page = ({ searchParams }) => {
  // await connectMongoDB();
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");

  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 p-4">
          You Are Not Logged In{" "}
        </h1>
        <p className="text-blue-500">
          <Link href="/login">Log In</Link>
        </p>
        {/* <AddToCart /> */}
      </div>
    );
  } else {
    const user = verify(token.value, "secret");
    return (
      <div>
        <AddToCart user={user} />
        {/* <CardComponent user={user} /> */}
      </div>
    );
  }
};

export default page;
