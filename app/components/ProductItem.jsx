"use client";
import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const ProductItem = ({ product }) => {
  return (
    <div className="bg-gray-900 text-white p-2 rounded-lg shadow-md max-w-xs mx-auto mb-4">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={product.image}
            alt="Product"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="absolute top-2 right-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-400 text-sm">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-semibold">{product.price}</span>
        <a
          href={`/products/${product.productId}`}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          View Item
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
