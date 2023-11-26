import React from "react";
import Link from "next/link";
const CreatedSucesfully = () => {
  return (
    <div className="text-center">
      <p className="text-lg text-green-500">
        User Created Successfully. Login to start shopping.
      </p>
      <Link href="/login" className="text-blue-500 hover:text-blue-600">
        Login
      </Link>
    </div>
  );
};

export default CreatedSucesfully;
