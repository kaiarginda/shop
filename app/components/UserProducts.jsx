"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Grid, ThreeDots } from "react-loader-spinner";
import { useState } from "react";
const UserProducts = ({ products, loggedUser, user }) => {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const deleteHandler = async (i) => {
    setDeleteLoading(true);
    setDeleteId(i);
    await fetch("/api/deleteproduct", {
      method: "DELETE",
      body: JSON.stringify({ product: products[i] }),
    });

    setDeleteLoading(false);
    setDeleteId("");
    router.refresh();
  };
  return (
    <div className="pt-5">
      {console.log(products, "user products")}
      <h1 className="mb-8 text-3xl font-bold text-gray-800">User Products:</h1>
      {products.length == 0 ? <div>User Has No Products</div> : null}

      {products.map((pr, i) => {
        return (
          <div
            className="bg-white shadow-md p-4 rounded-md mb-4 flex items-center justify-between"
            key={i}
          >
            <div className="flex items-center space-x-4">
              <img
                src={pr.image}
                alt={pr.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h1 className="text-lg font-semibold">{pr.name}</h1>
                <p className="text-gray-600">{pr.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">${pr.price}</h1>
              {user.username == loggedUser.username ? (
                <AiFillDelete
                  className="text-red-500 text-2xl cursor-pointer"
                  onClick={() => {
                    deleteHandler(i);
                  }}
                />
              ) : null}
              {deleteLoading && deleteId == i ? (
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserProducts;
