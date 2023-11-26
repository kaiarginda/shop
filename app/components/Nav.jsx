// "use client";

// import React from "react";
// import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
// import { FaSignOutAlt } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// // ...

// import Link from "next/link";
// const Nav = ({ user }) => {
//   const router = useRouter();

//   const data = [
//     {
//       name: "yle",
//     },
//     {
//       name: "tornike",
//     },
//   ];
//   const logoutHandler = async () => {
//     await fetch("/api/logout");
//     router.push("/login");
//   };

//   const cartClickHandler = () => {
//     router.push("/cart");
//   };
//   return (
//     <div className="bg-gray-900 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-2xl font-semibold">Your Brand</div>

//         <div className="flex items-center space-x-6">
//           <div className="relative">
//             <input
//               type="text"
//               className="bg-gray-800 text-white p-2 rounded focus:outline-none"
//               placeholder="Search..."
//             />
//             <button className="absolute right-0 top-0 h-full px-4">
//               <FaSearch className="text-gray-500" />
//             </button>
//           </div>
//           <Link
//             href={{
//               pathname: "/cart",
//               query: data, // the data
//             }}
//           >
//             <button
//               className="flex items-center space-x-2"
//               // onClick={cartClickHandler}
//             >
//               <FaShoppingCart className="text-2xl" />
//               <span>Cart</span>
//             </button>
//           </Link>
//           {user ? (
//             <div
//               className="flex cursor-pointer items-center space-x-2"
//               onClick={logoutHandler}
//             >
//               {" "}
//               <FaSignOutAlt className="text-2xl" />
//               <span>Logout</span>
//             </div>
//           ) : null}

//           <button className="flex items-center space-x-2">
//             <FaUser className="text-2xl" />
//             <span>
//               <Link href={user ? `/user/${user.username}` : "/login"}>
//                 {user ? user.username : "Log In / Register"}
//               </Link>
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav;
"use client";

import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiFoursquarecityguide } from "react-icons/si";
const Nav = ({ user }) => {
  const router = useRouter();

  const data = [
    {
      name: "yle",
    },
    {
      name: "tornike",
    },
  ];
  const logoutHandler = async () => {
    localStorage.clear(); // Clear local storage
    await fetch("/api/logout");
    router.push("/login");
  };

  const cartClickHandler = () => {
    router.push("/cart");
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-center lg:text-left mb-4 lg:mb-0 lg:mr-6">
          Gldanis Bazroba
        </div>

        <div className="flex items-center space-x-6">
          {/* <div className="relative">
            <input
              type="text"
              className="bg-gray-800 text-white p-2 rounded focus:outline-none"
              placeholder="Search..."
            />
            <button className="absolute right-0 top-0 h-full px-4">
              <FaSearch className="text-gray-500" />
            </button>
          </div> */}
          <Link
            href="/website-guide"
            className="text-blue-500 hover:text-blue-600 flex gap-3 items-center justify-center"
          >
            <SiFoursquarecityguide className="ml-1" />
            Website Guide
          </Link>

          <Link
            href={{
              pathname: "/cart",
              query: data,
            }}
          >
            <button
              className="flex items-center space-x-2"
              onClick={cartClickHandler}
            >
              <FaShoppingCart className="text-2xl" />
              <span>Cart</span>
            </button>
          </Link>
          {user ? (
            <div
              className="flex cursor-pointer items-center space-x-2"
              onClick={logoutHandler}
            >
              <FaSignOutAlt className="text-2xl" />
              <span>Logout</span>
            </div>
          ) : null}
          <button className="flex items-center space-x-2">
            <FaUser className="text-2xl" />
            <span>
              <Link href={user ? `/user/${user.username}` : "/login"}>
                {user ? user.username : "Log In / Register"}
              </Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
