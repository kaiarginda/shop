// // import React from "react";
// // import Payment from "../../../../models/Payment";
// // import Product from "../../../../models/Product";

// // const page = async ({ params }) => {
// //   const { date, username, string } = params;
// //   const payment = await Payment.findOne({ date });
// //   let obj;

// //   return (
// //     <div>
// //       {/* {date} {username} {string} */}
// //       {payment.productData.map(async (prod, i) => {
// //         // const product = await Product.findById({ _id: prod.prodId });
// //         const product = await Product.findById(prod.prodId);
// //         if (prod.prodId)
// //           return (
// //             <h1 key={i}>
// //               {product.name} x{prod.quantity}
// //             </h1>
// //           );
// //       })}
// //     </div>
// //   );
// // };

// // export default page;
// import React from "react";
// import Payment from "../../../../models/Payment";
// import Product from "../../../../models/Product";
// import mongoose from "mongoose"; // Import mongoose to check if prod.prodId is a valid ObjectId

// const page = async ({ params }) => {
//   const { date, username, string } = params;
//   const payment = await Payment.findOne({ date });
//   let obj;
//   return (
//     <div>
//       {/* {date} {username} {string} */}
//       {payment.productData.map(async (prod, i) => {
//         // Check if prod.prodId is a valid ObjectId
//         if (mongoose.Types.ObjectId.isValid(prod.prodId)) {
//           const product = await Product.findById(prod.prodId);
//           if (product) {
//             return (
//               <div>
//                 <h1 key={i}>
//                   {product.name} x{prod.quantity}
//                 </h1>

//                 <img src={product.image} alt="" />
//               </div>
//             );
//           }
//         }
//       })}
//       ${payment.totalPrice}
//     </div>
//   );
// };

// export default page;
import React from "react";
import Payment from "../../../../models/Payment";
import Product from "../../../../models/Product";
import mongoose from "mongoose"; // Import mongoose to check if prod.prodId is a valid ObjectId

const page = async ({ params }) => {
  const { date, username, string } = params;
  const payment = await Payment.findOne({ date });
  let obj;

  if (!payment) {
    return (
      <div className="text-center mt-10">
        <p className="text-2xl text-red-600 font-bold">
          Invalid URL. Please try again.
        </p>
        <a
          href="/dashboard"
          passHref
          className="text-blue-500 hover:underline block mt-2"
        >
          Go Back to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Payment went succesfully!</h1>

      <h1 className="text-3xl font-bold mb-6">Your Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payment.productData.map(async (prod, i) => {
          // Check if prod.prodId is a valid ObjectId
          if (mongoose.Types.ObjectId.isValid(prod.prodId)) {
            const product = await Product.findById(prod.prodId);
            if (product) {
              return (
                <div key={i} className="bg-white rounded-lg shadow-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="p-3 w-auto h-auto"
                  />
                  <div className="p-4">
                    <a
                      href={`/products/${product.productId}`}
                      className="text-xl font-semibold mb-2"
                    >
                      {product.name}
                    </a>
                    <p className="text-gray-600 mb-4">
                      Quantity: {prod.quantity}
                    </p>
                  </div>
                </div>
              );
            }
          }
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Total Price</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
          ${payment.totalPrice.toFixed(2)}
        </div>
      </div>

      <div className="flex items-center justify-center pt-4">
        <a href="/dashboard">Go back to dashboard</a>
      </div>
    </div>
  );
};

export default page;
