import React from "react";
import SuccessPage from "../components/SuccessPage";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
const page = async () => {
  // const cookieStore = cookies();
  // const token = cookieStore.get("OutSideJWT");
  // const user = verify(token.value, "secret");
  return (
    <div>
      <SuccessPage />
    </div>
  );
};

export default page;
