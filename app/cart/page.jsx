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

// import React from "react";
// import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";
// import AddToCart from "../components/AddToCart";

// let hasCheckedUser = false;
// let loggedIn = false;
// let user = null;

// const checkUserLoggedIn = () => {
//   if (!hasCheckedUser) {
//     const cookieStore = cookies();
//     const token = cookieStore.get("OutSideJWT");

//     if (token) {
//       try {
//         user = verify(token.value, "secret");
//         loggedIn = true;
//       } catch (error) {
//         console.error("Error verifying token:", error);
//       }
//     }

//     hasCheckedUser = true;
//   }

//   return { loggedIn, user };
// };

// const Page = () => {
//   const { loggedIn, user } = checkUserLoggedIn();

//   if (!loggedIn) {
//     return (
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-red-500 p-4">
//           You Are Not Logged In{" "}
//         </h1>
//         <p className="text-blue-500">
//           <a href="/login">Log In</a>
//         </p>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <AddToCart user={user} />
//       </div>
//     );
//   }
// };

// export default Page;

import React from "react";

const page = () => {
  return <div>Hello World</div>;
};

export default page;
