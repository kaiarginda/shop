const stripe = require("stripe")(
  "sk_test_51O4OVQEDG6lAAoEQq08STgyhP1FpFROMY1zQdL9aFsJHHf17peqbGfzzlVvFdPGetKQpA5FygbFDDMfuw301KxHB00hHCfak9B"
);

const endpointSecret =
  "whsec_5f4ecd560020ea22398735de4f9d0f13cbf9c754e554bdc2968011244960ec0f";

export async function POST(req) {
  const body = await req.json();

  let string = "";
  body.items.forEach((item) => {
    string += `:::${item._id}!!!${item.quantity}`;
  });
  const customer = await stripe.customers.create({
    metadata: {
      userId: body.user._id,
      cart: JSON.stringify(body.items._id),
    },
  });
  try {
    const username = body.user.user.username;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer: customer.id,
      line_items: body.items.map((item) => {
        const storeItem = item;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/payments/${Date.now()}/${username}/${string}`,
      cancel_url: "http://localhost:3000",
    });
    return new Response(JSON.stringify({ url: session.url }));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }));
  }
}
