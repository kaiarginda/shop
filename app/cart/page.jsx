// import React from "react";
// import CardComponent from "../components/CardComponent";
// import { connectMongoDB } from "../mongodb";
// import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";
// import AddToCart from "../components/AddToCart";
// const page = async ({ searchParams }) => {
//   await connectMongoDB();
//   const cookieStore = cookies();
//   const token = cookieStore.get("OutSideJWT");

//   if (!token) {
//     return (
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-red-500 p-4">
//           You Are Not Logged In{" "}
//         </h1>
//         <p className="text-blue-500">
//           <a href="/login">Log In</a>
//         </p>
//         {/* <AddToCart /> */}
//       </div>
//     );
//   } else {
//     const user = verify(token.value, "secret");
//     return (
//       <div>
//         <AddToCart user={user} />
//         {/* <CardComponent user={user} /> */}
//       </div>
//     );
//   }
// };

// export default page;

import React, { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import { connectMongoDB } from "../mongodb";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import AddToCart from "../components/AddToCart";

const Page = ({ searchParams }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await connectMongoDB();
        const cookieStore = cookies();
        const token = cookieStore.get("OutSideJWT");

        if (!token) {
          setLoggedIn(false);
        } else {
          const decodedUser = verify(token.value, "secret");
          setUser(decodedUser);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <div>
      {loggedIn ? (
        <AddToCart user={user} />
      ) : (
        // Uncomment the line below if you want to render CardComponent as well
        // <CardComponent user={user} />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 p-4">
            You Are Not Logged In{" "}
          </h1>
          <p className="text-blue-500">
            <a href="/login">Log In</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
