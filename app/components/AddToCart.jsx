"use client";
import { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const AddToCart = (user) => {
  const [checkoutPrice, setCheckoutPrice] = useState(0);
  const router = useRouter();
  const data = localStorage?.getItem("products");
  const productData = JSON.parse(data);
  if (!productData)
    return (
      <div class="bg-white p-8 rounded-lg shadow-lg text-center">
        <p class="text-xl text-gray-700">
          There Are No Items In The Cart. Add Items To Checkout.
        </p>
        <a href="/dashboard" class="text-blue-500 hover:underline mt-4 block">
          Go Back To Dashboard
        </a>
      </div>
    );
  const checkoutData = productData.reduce((accumulator, product) => {
    const existingProduct = accumulator.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      const number = parseFloat(existingProduct.price, 10);
      // .replace("$", "")
      existingProduct.quantity += 1;
      existingProduct.totalPrice = number * existingProduct.quantity;
    } else {
      accumulator.push({
        ...product,
        quantity: 1,
        totalPrice: parseFloat(product.price, 10),
        // .replace("$", "")
      });
    }

    return accumulator;
  }, []);

  const minusHandler = (product) => {
    let storedArray = JSON.parse(localStorage.getItem("products"));
    const indexToDelete = storedArray.findIndex(
      (item) => item.productId === product.productId
    );

    if (indexToDelete !== -1) {
      storedArray.splice(indexToDelete, 1);
      localStorage.setItem("products", JSON.stringify(storedArray));
      router.refresh();
    }
  };

  const plusHandler = (product) => {
    let storedArray = JSON.parse(localStorage.getItem("products"));
    storedArray = [...storedArray, product];
    localStorage.setItem("products", JSON.stringify(storedArray));
    router.refresh();
  };

  // Calculate checkout price using useEffect to avoid multiple re-renders
  useEffect(() => {
    const totalPrice = checkoutData.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
    setCheckoutPrice(totalPrice);
  }, [checkoutData]);

  const handleSubscription = (e) => {
    e.preventDefault();
    fetch("/api/crc", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ items: [...checkoutData], user }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((url) => {
        console.log(url, "url from yl");
        window.location = url.url;
      })
      .catch((e) => {
        console.log(e.error);
      });
    if (!user) {
      console.log("not loggedin");
      return;
    }
  };

  return (
    <div>
      {checkoutData.length === 0 || !checkoutData ? (
        <h1 className="text-2xl text-gray-500 font-semibold mt-4">
          No Items In The Cart
        </h1>
      ) : null}

      {checkoutData.map((product) => (
        <div
          key={product.productId}
          className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center mb-4"
        >
          <div className="flex items-center space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{`${product.name} x${product.quantity}`}</h1>
              <h2 className="text-gray-600">{`$${product.totalPrice.toFixed(
                2
              )}`}</h2>
            </div>
          </div>
          <div className="flex gap-3">
            <div
              onClick={() => {
                minusHandler(product);
              }}
              className="group inline-flex items-center justify-center w-12 h-12 border-2 border-blue-500 rounded-full cursor-pointer transition duration-300 transform hover:bg-blue-500 hover:text-white hover:scale-110"
            >
              <AiOutlineMinus className="text-blue-500 text-2xl group-hover:text-white" />
            </div>
            <div
              onClick={() => {
                plusHandler(product);
              }}
              className="group inline-flex items-center justify-center w-12 h-12 border-2 border-blue-500 rounded-full cursor-pointer transition duration-300 transform hover:bg-blue-500 hover:text-white hover:scale-110"
            >
              <AiOutlinePlus className="text-blue-500 text-2xl group-hover:text-white" />
            </div>
          </div>
        </div>
      ))}

      {/* <h1 className="text-2xl font-bold text-blue-500">
        {checkoutPrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </h1>

      <Link
        href={"/dashboard"}
        className="text-blue-500 hover:underline hover:text-blue-700 transition duration-300"
      >
        Go Back To Dashboard
      </Link> */}
      <div className="flex items-center justify-between mb-4 p-4">
        <h1 className="text-2xl font-bold text-blue-500">
          {checkoutPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h1>
        {/* <CheckoutBtn /> */}
        <button
          onClick={handleSubscription}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg transition duration-300"
        >
          Checkout
        </button>
        <Link
          href="/dashboard"
          className="text-blue-500 hover:underline hover:text-blue-700 transition duration-300"
        >
          Go Back To Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
