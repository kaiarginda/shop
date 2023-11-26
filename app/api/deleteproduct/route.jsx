import { connectMongoDB } from "../../mongodb";
import Product from "../../models/Product";
import Comment from "../../models/Comments";

export async function DELETE(req) {
  await connectMongoDB();
  const body = await req.json();
  await Product.findOneAndDelete({ ...body.product });

  const comments = await Comment.find();
  comments.forEach(async (com) => {
    if (com.productId == body.product.productId) {
      const commen = await Comment.findOne({ productId: com.productId });
      if (commen) {
        await Comment.findOneAndDelete({ productId: com.productId });
      }
    }
  });
}
