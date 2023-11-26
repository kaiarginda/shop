import Comment from "../../models/Comments";
export async function POST(req) {
  const body = await req.json();
  console.log(body, "from fucking reply");
  await Comment.create({
    text: body.reply,
    parentId: body.parentId,
    productId: body.productId,
    author: body.author,
  });
}
