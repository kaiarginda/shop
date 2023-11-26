import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const isLoggedIn = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");
  if (!token) return false;
  const user = verify(token.value, "secret");
  if (!user) return false;
  return true;
};

module.exports = isLoggedIn;
