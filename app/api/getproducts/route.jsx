import { connectMongoDB } from "../../mongodb";
import Product from "../../models/Product";
// export async function GET() {
//   await connectMongoDB();

//   const products = await Product.find({});
//   console.log(products, "prprprpr");

//   return new Response(JSON.stringify(products));
// }

// Example using async/await
export async function GET() {
  try {
    await connectMongoDB();

    const products = await Product.find({});
    console.log(products, "prprprpr");

    return new Response(JSON.stringify(products));
  } catch (err) {
    return new Response({});
  }
}
