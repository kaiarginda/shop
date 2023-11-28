// import { connect } from "http2";
// import { connectMongoDB } from "../../mongodb";
// import React from "react";
// import Product from "../../models/Product";
// import CommentInput from "../../components/CommentInput";
// import CommentList from "../../components/CommentList";
// import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";
// const page = async ({ params }) => {
//   const { id } = params;
//   const product = await Product.findOne({ productId: id });
//   console.log(product, "product");
//   const cookieStore = cookies();
//   const token = cookieStore.get("OutSideJWT");
//   if (!token || !token.value) {
//     return (
//       <div className="bg-gray-900 text-white p-4 mx-auto   shadow-md w-[100%] h-[100vh]">
//         <div className="grid grid-cols-12 gap-8 pb-4">
//           <div className="col-span-4">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full rounded-lg shadow-lg pb-4"
//             />
//             <p className="text-3xl font-semibold text-green-500">
//               ${product.price}
//             </p>
//             <h1 className="text-4xl font-semibold">
//               Seller: <a href={`/user/${product.author}`}>{product.author}</a>
//             </h1>
//           </div>

//           <div className="col-span-8">
//             <h1 className="text-4xl font-semibold">{product.name}</h1>
//             <div className="mt-8">
//               <h2 className="text-2xl font-semibold">Product Description</h2>
//               <p className="text-gray-400 text-lg mt-2">
//                 {product.description}
//               </p>
//             </div>
//           </div>
//         </div>

//         <CommentList productId={id} />

//         <a
//           className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
//           href="/"
//         >
//           Go Back To Dashboard
//         </a>
//       </div>
//     );
//   }

//   const user = verify(token.value, "secret");
//   console.log(user, "user for real tho");
//   return (
//     <div className="bg-gray-900 text-white p-4 mx-auto   shadow-md w-[100%] h-[100%]">
//       <div className="grid grid-cols-12 gap-8 pb-4">
//         <div className="col-span-4">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full rounded-lg shadow-lg pb-4"
//           />
//           <p className="text-3xl font-semibold text-green-500">
//             ${product.price}
//           </p>
//           <h1 className="text-4xl font-semibold">
//             Seller: <a href={`/user/${product.author}`}>{product.author}</a>
//           </h1>
//         </div>
//         <div className="col-span-8">
//           <h1 className="text-4xl font-semibold">{product.name}</h1>
//           <div className="mt-8">
//             <h2 className="text-2xl font-semibold">Product Description</h2>
//             <p className="text-gray-400 text-lg mt-2">{product.description}</p>
//           </div>
//         </div>
//       </div>

//       <CommentList productId={id} />

//       <a
//         className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
//         href="/dashboard"
//       >
//         Go Back To Dashboard
//       </a>
//       <CommentInput postID={id} author={user.username} />
//     </div>
//   );

//   return (
//     <div>
//       {params.id} : {product.name}
//     </div>
//   );
// };

// export default page;

import React from "react";
import { connectMongoDB } from "../../mongodb";
import Product from "../../models/Product";
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const Page = async ({ params }) => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    const { id } = params;

    // Fetch product details
    console.log("Fetching product details...");
    const product = await Product.findOne({ productId: id });
    console.log("Product details:", product);

    const cookieStore = cookies();
    const token = cookieStore.get("OutSideJWT");

    if (!token || !token.value) {
      // User not authenticated
      console.log("User not authenticated");

      return (
        <div className="bg-gray-900 text-white p-4 mx-auto shadow-md w-[100%] h-[100vh]">
          {/* Render content for unauthenticated user */}
          <div className="grid grid-cols-12 gap-8 pb-4">{/* ... */}</div>

          <a
            className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
            href="/"
          >
            Go Back To Dashboard
          </a>
        </div>
      );
    }

    // User authenticated
    const user = verify(token.value, "secret");
    console.log("Authenticated user:", user);

    return (
      <div className="bg-gray-900 text-white p-4 mx-auto   shadow-md w-[100%] h-[100%]">
        <div className="grid grid-cols-12 gap-8 pb-4">
          <div className="col-span-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg pb-4"
            />
            <p className="text-3xl font-semibold text-green-500">
              ${product.price}
            </p>
            <h1 className="text-4xl font-semibold">
              Seller: <a href={`/user/${product.author}`}>{product.author}</a>
            </h1>
          </div>
          <div className="col-span-8">
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Product Description</h2>
              <p className="text-gray-400 text-lg mt-2">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <CommentList productId={id} />

        <a
          className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
          href="/dashboard"
        >
          Go Back To Dashboard
        </a>
        <CommentInput postID={id} author={user.username} />
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    // Handle the error, return an error page, or redirect as needed
    return <div>Error loading page. Please try again later.</div>;
  }
};

export default Page;
