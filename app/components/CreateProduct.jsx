"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
const Img = ({ author }) => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  function covertTo64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  }

  const buttonSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(+price, typeof +price);
    if (typeof +price !== "number") {
      alert("Price Must Be A Number");
      return;
    }
    if (typeof description != "string" || typeof name != "string") {
      alert("Name And Description should be strings.");
      return;
    }

    if (name == "" || description == "" || !price || !image) {
      alert("not enough details");
      return;
    }
    setSubmitLoading(true);
    await fetch("../api/addproduct/", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        productId: `${Math.random()}`,
        description,
        image,
        author,
      }),
    });

    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setSubmitLoading(false);
    router.refresh();
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center">Add Your Product</h2>
      <form action="" className="space-y-4" onSubmit={buttonSubmitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={covertTo64}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            SUBMIT
          </button>
          <div className="flex justify-center items-center">
            {submitLoading ? (
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
      </form>
      <div className="flex justify-center items-center">
        <Link
          href="/dashboard"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Go Back To Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Img;
