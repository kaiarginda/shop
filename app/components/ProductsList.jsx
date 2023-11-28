"use client";
import React, { createContext, useContext } from "react";
import ProductItem from "./ProductItem";
import { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

const ProductsList = () => {
  const router = useRouter();
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch("/api/getproducts")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setProductData(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const [visibleProducts, setVisibleProducts] = useState(999);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 3);
  };

  const plusClickHandler = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      setItems(updatedCart.length);
      return updatedCart;
    });
  };

  const cartSubmitHandler = () => {
    const data = localStorage.getItem("products");
    const productData = JSON.parse(data) || [];
    // localStorage.setItem("products", JSON.stringify([...cart, ...productData]));

    if (Array.isArray(productData)) {
      // Update the local storage with the combined cart and productData
      localStorage.setItem(
        "products",
        JSON.stringify([...cart, ...productData])
      );
    } else {
      // If productData is not an array, handle it accordingly (e.g., set only the cart)
      localStorage.setItem("products", JSON.stringify(cart));
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <div className="mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Search for products..."
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          onClick={(e) => setSearch(search)}
        >
          Search
        </button>

        <div className="mt-4 flex justify-center items-center">
          <a href="/cart" className="flex gap-3 items-center">
            <FaCartPlus
              className="text-4xl text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={cartSubmitHandler}
            />
            <span className="text-white text-3xl">{items}</span>
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {loading ? (
          <Oval height={80} width={80} color="#4fa94d" visible={true} />
        ) : null}
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {productData
          .slice(0, visibleProducts)
          .filter((product) => product.name.toLowerCase().includes(search))
          .map((product, index) => (
            <div key={index} className="col-span-1 relative">
              <div className="bg-gray-900 text-white p-2 rounded-lg shadow-md">
                <div className="relative aspect-w-16 aspect-h-9">
                  <img
                    src={product.image}
                    alt="Product"
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                      onClick={() => plusClickHandler(product)}
                    >
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
                <h4 className="text-lg text-gray-500 pt-2">
                  Product Seller:{" "}
                  <Link href={`/user/${product.author}`}>{product.author}</Link>
                </h4>
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-400 text-sm">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                  <Link
                    href={`/products/${product.productId}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                  >
                    View Item
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div> */}

      {/*  */}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {productData
          .slice(0, visibleProducts)
          .filter((product) => product.name.toLowerCase().includes(search))
          .map((product, index) => (
            <div key={index} className="col-span-1 relative">
              <div className="bg-gray-900 text-white p-2 rounded-lg shadow-md">
                <div
                  className="relative flex justify-center items-center overflow-hidden aspect-w-16 aspect-h-9"
                  style={{ minHeight: "200px" }}
                >
                  <img
                    src={product.image}
                    alt="Product"
                    className=" rounded-lg w-60 h-40"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                      onClick={() => plusClickHandler(product)}
                    >
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
                <h4 className="text-lg text-gray-500 pt-2">
                  Product Seller:{" "}
                  <a href={`/user/${product.author}`}>{product.author}</a>
                </h4>
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 h-16">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                  <a
                    href={`/products/${product.productId}`}
                    className="bg-blue-500 hover-bg-blue-600 text-white p-2 rounded"
                  >
                    View Item
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/*  */}
      {visibleProducts < productData.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMoreProducts}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
