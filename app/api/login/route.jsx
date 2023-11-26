import User from "@/app/models/User";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { connectMongoDB } from "../../mongodb";
export async function POST(req) {
  await connectMongoDB();
  const { username, password } = await req.json();
  if (!username || !password) {
    console.log("Insufficient credentials");
    return new Response("Insufficient credentials", { status: 400 });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return new Response("User does not exist", { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return new Response("Password does not match", { status: 401 });
  } else {
    const secret = "secret";
    const token = sign({ username }, secret, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const serialized = serialize("OutSideJWT", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    const response = {
      message: "authenticated",
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  }
}
