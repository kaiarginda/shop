import { connectMongoDB } from "../../mongodb";
import Product from "../../models/Product";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return new Response(JSON.stringify(products));
}
