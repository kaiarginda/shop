import { connectMongoDB } from "../../mongodb";
import User from "../../models/User";
import { NextResponse, NextRequest } from "next/server";
export async function POST(req) {
  await connectMongoDB();
  const { username } = await req.json();
  const user = await User.findOne({ username });

  if (user) {
    return NextResponse.json({ user });
  }

  return NextResponse.json({ username });
}
