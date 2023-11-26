"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);

    router.push("/dashboard");
    router.refresh();
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Log In
          </button>
          <div className="p-4 flex items-center justify-center">
            {loading ? (
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
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
