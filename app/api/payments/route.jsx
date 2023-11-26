import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request) {
  const stripe = new Stripe(
    "sk_test_51O4OVQEDG6lAAoEQq08STgyhP1FpFROMY1zQdL9aFsJHHf17peqbGfzzlVvFdPGetKQpA5FygbFDDMfuw301KxHB00hHCfak9B"
  );

  let data = await req.json();
  let priceId = data.priceId;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  });
  return NextResponse.json(session.url);
}
