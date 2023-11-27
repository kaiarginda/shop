import React from "react";
const CreatedSucesfully = () => {
  return (
    <div className="text-center">
      <p className="text-lg text-green-500">
        User Created Successfully. Login to start shopping.
      </p>
      <a href="/login" className="text-blue-500 hover:text-blue-600">
        Login
      </a>
    </div>
  );
};

export default CreatedSucesfully;
