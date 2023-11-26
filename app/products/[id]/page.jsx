import { connect } from "http2";
import { connectMongoDB } from "../../mongodb";
import React from "react";
import Product from "../../models/Product";
import Link from "next/link";
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
const page = async ({ params }) => {
  const { id } = params;
  const product = await Product.findOne({ productId: id });

  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");
  if (!token || !token.value) {
    return (
      <div className="bg-gray-900 text-white p-4 mx-auto   shadow-md w-[100%] h-[100vh]">
        <div className="grid grid-cols-12 gap-8 pb-4">
          {/* Product Image */}
          <div className="col-span-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg pb-4"
            />
            <p className="text-3xl font-semibold text-green-500">
              ${product.price}
            </p>
            <h1 className="text-4xl font-semibold">
              Seller:{" "}
              <Link href={`/user/${product.author}`}>{product.author}</Link>
            </h1>
          </div>

          {/* Product Details */}
          <div className="col-span-8">
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Product Description</h2>
              <p className="text-gray-400 text-lg mt-2">
                {product.description}
              </p>
            </div>

            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 mt-4 rounded-md text-lg">
          Add to Cart
        </button> */}
          </div>
        </div>

        <CommentList productId={id} />

        {/* Product Description */}

        <Link
          className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
          href="/"
        >
          Go Back To Dashboard
        </Link>
        {/* <CommentInput postID={id} author={user.username} /> */}
      </div>
    );
  }

  const user = verify(token.value, "secret");

  return (
    <div className="bg-gray-900 text-white p-4 mx-auto   shadow-md w-[100%] h-[100%]">
      <div className="grid grid-cols-12 gap-8 pb-4">
        {/* Product Image */}
        <div className="col-span-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg pb-4"
          />
          <p className="text-3xl font-semibold text-green-500">
            ${product.price}
          </p>
          <h1 className="text-4xl font-semibold">
            Seller:{" "}
            <Link href={`/user/${product.author}`}>{product.author}</Link>
          </h1>
        </div>

        {/* Product Details */}
        <div className="col-span-8">
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Product Description</h2>
            <p className="text-gray-400 text-lg mt-2">{product.description}</p>
          </div>

          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 mt-4 rounded-md text-lg">
            Add to Cart
          </button> */}
        </div>
      </div>

      <CommentList productId={id} />

      {/* Product Description */}

      <a
        className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
        href="/dashboard"
      >
        Go Back To Dashboard
      </a>
      <CommentInput postID={id} author={user.username} />
    </div>
  );
};

export default page;
