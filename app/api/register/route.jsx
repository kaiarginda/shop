import { connectMongoDB } from "../../mongodb";
import User from "../../models/User";
const bcrypt = require("bcrypt");
export async function POST(req) {
  await connectMongoDB();
  const { username, email, password } = await req.json();

  const saltRounds = 10;
  const myPlaintextPassword = password;

  bcrypt.genSalt(saltRounds, async function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, async function (err, hash) {
      const user = await User.create({
        username,
        password: hash,
        email,
      });
    });
  });

  return new Response("response");
}
