import { connect } from "http2";
import { connectMongoDB } from "../../mongodb";
import React from "react";
import Product from "../../models/Product";
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
const page = async ({ params }) => {
  const product = await Product.findOne({ productId: params.id });
  return (
    <div>
      {params.id} : {product.name}
    </div>
  );
};

export default page;
/*
  const { id } = params;
  console.log(product, "product");
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");
  if (!token || !token.value) {
    return (
      <div className="bg-gray-900 text-white p-4 mx-auto   shadow-md w-[100%] h-[100vh]">
        <div className="grid grid-cols-12 gap-8 pb-4">
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
              Seller: <a href={`/user/${product.author}`}>{product.author}</a>
            </h1>
          </div>

          <div className="col-span-8">
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Product Description</h2>
              <p className="text-gray-400 text-lg mt-2">
                {product.description}
              </p>
            </div>

           
          </div>
        </div>

        <CommentList productId={id} />


        <a
          className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
          href="/"
        >
          Go Back To Dashboard
        </a>
      </div>
    );
  }

  const user = verify(token.value, "secret");
  console.log(user, "user for real tho");
  return (
    <div className="bg-gray-900 text-white p-4 mx-auto   shadow-md w-[100%] h-[100%]">
      <div className="grid grid-cols-12 gap-8 pb-4">
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
            Seller: <a href={`/user/${product.author}`}>{product.author}</a>
          </h1>
        </div>
        <div className="col-span-8">
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Product Description</h2>
            <p className="text-gray-400 text-lg mt-2">{product.description}</p>
          </div>

       
        </div>
      </div>

      <CommentList productId={id} />


      <a
        className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
        href="/dashboard"
      >
        Go Back To Dashboard
      </a>
      <CommentInput postID={id} author={user.username} />
    </div>
  );
*/
