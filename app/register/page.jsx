"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { create } from "domain";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState("");
  const [created, setCreated] = useState(false);
  // const submitHandler = async (e) => {
  //   setExists("");
  //   e.preventDefault();
  //   setLoading(true);
  //   setCreated(false);
  //   if (!password || !passwordConfirm || !username || !email) return;
  //   if (password !== passwordConfirm) return;

  //   await fetch("/api/exists", {
  //     method: "POST",
  //     body: JSON.stringify({ username }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return res.json().then((json) => Promise.reject(json));
  //     })
  //     .then((respo) => {
  //       setExists(respo.user.username);
  //       return;
  //     });

  //   await fetch("/api/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ username, email, password }),
  //   });

  //   if (!exists) {
  //     setCreated(true);
  //   }
  //   setUsername("");
  //   setEmail("");
  //   setPassword("");
  //   setPasswordConfirm("");
  //   setLoading(false);
  // };
  const submitHandler = async (e) => {
    setExists("");
    e.preventDefault();
    setLoading(true);
    setCreated(false);
    if (!password || !passwordConfirm || !username || !email) return;
    if (password !== passwordConfirm) return;

    try {
      // Check if the user exists
      const existsResponse = await fetch("/api/exists", {
        method: "POST",
        body: JSON.stringify({ username }),
      });

      if (!existsResponse.ok) {
        const errorData = await existsResponse.json();
        throw errorData;
      }

      const existsData = await existsResponse.json();

      if (existsData.user && existsData.user.username === username) {
        // User with that username already exists
        setExists(username);
      } else {
        // User doesn't exist, proceed to user creation
        const createUserResponse = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (!createUserResponse.ok) {
          const errorData = await createUserResponse.json();
          throw errorData;
        }

        // User created successfully
        setCreated(true);
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
      }
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        {exists ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
            User with that username already exists
          </div>
        ) : null}
        {created ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
            User created succesfully
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none transition-all duration-300 border border-gray-600 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none transition-all duration-300 border border-gray-600 focus:border-blue-500"
              placeholder="Enter your email"
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
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none transition-all duration-300 border border-gray-600 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-1">
              Confirm Password
            </label>
            <input
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              type="password"
              id="confirm-password"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none transition-all duration-300 border border-gray-600 focus:border-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Register
          </button>
          <div className="flex items-center justify-center">
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
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Log In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
