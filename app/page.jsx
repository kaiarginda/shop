// "use client";

import Image from "next/image";
import Nav from "./components/Nav";
import Search from "./components/Search";
import Login from "./components/Login";
import ProductsList from "./components/ProductsList";
import HeroPage from "./components/HeroPage";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");

  if (!token) {
    return (
      <div className="">
        <Nav />
        <HeroPage />
        <ProductsList />
      </div>
    );
  }
  if (token.value) {
    const user = verify(token.value, "secret");
    return (
      <div className="">
        <Nav user={user} />
        <HeroPage />
        <ProductsList />
      </div>
    );
  }
}
