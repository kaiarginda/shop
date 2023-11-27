// // // import React from "react";
// // // import { cookies } from "next/headers";
// // // import { verify } from "jsonwebtoken";
// // // import AddToCart from "../components/AddToCart";
// // // const page = () => {
// // //   const cookieStore = cookies();
// // //   const token = cookieStore.get("OutSideJWT");

// // //   if (!token) {
// // //     return (
// // //       <div className="text-center">
// // //         <h1 className="text-3xl font-bold text-red-500 p-4">
// // //           You Are Not Logged In{" "}
// // //         </h1>
// // //         <p className="text-blue-500">
// // //           <a href="/login">Log In</a>
// // //         </p>
// // //       </div>
// // //     );
// // //   } else {
// // //     const user = verify(token.value, "secret");
// // //     return (
// // //       <div>
// // //         <AddToCart user={user} />
// // //       </div>
// // //     );
// // //   }
// // // };

// // // export default page;

// // import React from "react";
// // import { cookies } from "next/headers";
// // import { verify } from "jsonwebtoken";
// // import AddToCart from "../components/AddToCart";

// // const checkUserLoggedIn = () => {
// //   const cookieStore = cookies();
// //   const token = cookieStore.get("OutSideJWT");

// //   if (!token) {
// //     return {
// //       loggedIn: false,
// //     };
// //   } else {
// //     const user = verify(token.value, "secret");
// //     return {
// //       loggedIn: true,
// //       user,
// //     };
// //   }
// // };

// // const page = () => {
// //   const { loggedIn, user } = checkUserLoggedIn();

// //   if (!loggedIn) {
// //     return (
// //       <div className="text-center">
// //         <h1 className="text-3xl font-bold text-red-500 p-4">
// //           You Are Not Logged In{" "}
// //         </h1>
// //         <p className="text-blue-500">
// //           <a href="/login">Log In</a>
// //         </p>
// //       </div>
// //     );
// //   } else {
// //     return (
// //       <div>
// //         <AddToCart user={user} />
// //       </div>
// //     );
// //   }
// // };

// // export default page;

import React from "react";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import AddToCart from "../components/AddToCart";
const page = async () => {
  const cookieStore = await cookies();
  const token = await cookieStore.get("OutSideJWT");
  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 p-4">
          You Are Not Logged In{" "}
        </h1>
        <p className="text-blue-500">
          <a href="/login">Log In</a>
        </p>
      </div>
    );
  } else {
    const user = verify(token.value, "secret");
    return (
      <div>
        <AddToCart user={user} />
      </div>
    );
  }
};

export default page;
