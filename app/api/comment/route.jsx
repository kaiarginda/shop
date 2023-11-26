import { connectMongoDB } from "@/app/mongodb";
import Comment from "../../models/Comments";

export async function POST(req) {
  await connectMongoDB();

  const body = await req.json();

  await Comment.create({
    text: body.comment,
    productId: body.postID,
    parentId: body.parentId,
    root: body.onroot,
    author: body.author,
  });

  return new Response("adf");
}
