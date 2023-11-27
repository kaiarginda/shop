// import React from "react";
// import Link from "next/link";
// const Page = () => {
//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold">Website Guide</h1>
//         <p className="capitalize">
//           {" "}
//           This is the best Shopping Website in the world. Of course it is
//           "Gldanis Bazroba". you can register by clicking register/login. you
//           can comment and repy on other peoples comments in the individual
//           products link. you can also add products in the cart and ther make
//           payment.of course the website is not real and dont make real payment.
//           you can add product by clicking on your user icon and filling up the
//           form. You will understand the rest...
//         </p>
//       </div>
//       <div className="flex justify-center items-center">
//         <Link href="/dashboard">Go back to dashboard</Link>
//       </div>
//     </div>
//   );
// };

// export default Page;
import React from "react";

const Page = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Website Guide</h1>
        <p className="capitalize">
          {" "}
          This is the best Shopping Website in the world. Of course, it is
          &quot;Gldanis Bazroba&quot;. You can register by clicking
          register/login. You can comment and reply on other people&apos;s
          comments in the individual products link. You can also add products to
          the cart and then make payment. Of course, the website is not real,
          and don&apos;t make real payments. You can add a product by clicking
          on your user icon and filling up the form. You will understand the
          rest...
        </p>
      </div>
      <div className="flex justify-center items-center">
        <a href="/dashboard">Go back to dashboard</a>
      </div>
    </div>
  );
};

export default Page;
