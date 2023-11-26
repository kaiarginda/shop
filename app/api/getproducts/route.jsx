import { connectMongoDB } from "../../mongodb";
import Product from "../../models/Product";
import { NextRequest, NextResponse } from "next/server";
await connectMongoDB();
export async function GET() {
  const products = await Product.find();
  return new Response(JSON.stringify(products));
}
