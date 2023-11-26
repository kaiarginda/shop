import Product from "../../models/Product";

export async function POST(req) {
  const body = await req.json();
  if (body) {
    await Product.create({ ...body });
  }
}
