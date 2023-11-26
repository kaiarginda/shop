// // import { connectMongoDB } from "@/app/mongodb";
// // import User from "../../models/User";

// // export async function POST(req) {
// //   await connectMongoDB();
// //   const body = await req.json();
// //   const sigHeader = req.headers["stripe-signature"];
// //   try {
// //     const event = stripe.webhooks.constructEvent(
// //       req.rawBody,
// //       sigHeader,
// //       "your_webhook_secret"
// //     );
// //     // Handle the event
// //     if (event == "payment_intent.succeeded") {
// //       console.log("event fr frf r payment succesfully");
// //     }
// //   } catch (err) {
// //     console.error("Webhook signature verification failed:", err);
// //     return res.status(400).send("Webhook Error");
// //   }
// // }
// import Payment from "../../models/Payment";
// const stripe = require("stripe")(
//   "sk_test_51O4OVQEDG6lAAoEQq08STgyhP1FpFROMY1zQdL9aFsJHHf17peqbGfzzlVvFdPGetKQpA5FygbFDDMfuw301KxHB00hHCfak9B"
// );

// const endpointSecret =
//   "whsec_5f4ecd560020ea22398735de4f9d0f13cbf9c754e554bdc2968011244960ec0f";

// export async function POST(request) {
//   let event;
//   const sig = request.headers.get("stripe-signature");
//   let success_url;
//   try {
//     // Get the raw request body as a string
//     const rawBody = await request.text();

//     // Pass the raw body to constructEvent
//     event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
//     // console.log(event.type, "event type");
//     if (event.data.object.success_url) {
//       if (!success_url) {
//         success_url = event.data.object.success_url;
//       }
//     }
//   } catch (err) {
//     console.log(err.message, "error");
//     return new Response(err.message, { status: 400 });
//   }

//   if (event.type == "payment_intent.succeeded") {
//     console.log("succesfully payed the price", success_url);
//   }

//   // console.log(success_url, "success fucking url");
//   // console.log(event);
//   return new Response("asdas");
// }
import { connectMongoDB } from "@/app/mongodb";
import Payment from "../../models/Payment";

const stripe = require("stripe")(
  "sk_test_51O4OVQEDG6lAAoEQq08STgyhP1FpFROMY1zQdL9aFsJHHf17peqbGfzzlVvFdPGetKQpA5FygbFDDMfuw301KxHB00hHCfak9B"
);

const endpointSecret =
  "whsec_5f4ecd560020ea22398735de4f9d0f13cbf9c754e554bdc2968011244960ec0f";

let success_url; // Move the declaration outside of the try block

export async function POST(request) {
  await connectMongoDB();
  console.log("workin just fine");
  let event;
  const sig = request.headers.get("stripe-signature");

  try {
    // Get the raw request body as a string
    const rawBody = await request.text();

    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    console.log(event.type, "event types");
    if (event.type == "checkout.session.completed") {
      success_url = event.data.object.success_url;
      const amountSubtotal = event.data.object.amount_subtotal;
      console.log(amountSubtotal, "TOTAL PRICE IN DOLLARS FR");
      // console.log(success_url, "from working correctly.");
      let obj = [];
      const data = success_url.split("/")[4];
      const username = success_url.split("/")[5];
      const allProds = success_url.split("/")[6];
      const prodInfo = allProds.split(":::");
      prodInfo.forEach((prod) => {
        const quantity = prod.split("!!!")[1];
        const prodId = prod.split("!!!")[0];
        // obj = { ...obj, quantity, prodId };
        obj = [...obj, { quantity, prodId }];
      });
      await Payment.create({
        username,
        date: data,
        productData: obj,
        totalPrice: amountSubtotal,
      });
    }
  } catch (err) {
    console.log(err.message, "error");
    return new Response(err.message, { status: 400 });
  }

  // Log success_url

  // ...
  return new Response("asdas");
}
