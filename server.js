import express from "express";
import Stripe from "stripe";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { plan, email } = req.body;

  let price_id = "";

  if (plan === "proyecto") {
    price_id = "price_1TOWnH0uySre09m0LpHFkiw8";
  }

  if (plan === "mensual") {
    price_id = "price_1TOWdH0uySre09m0ZJo3OSEu";
  }

  if (plan === "anual") {
    price_id = "price_1TOWkv0uySre09m0SGq81qf8";
  }

  const session = await stripe.checkout.sessions.create({
    mode: plan === "proyecto" ? "payment" : "subscription",
    customer_email: email,
    line_items: [{ price: price_id, quantity: 1 }],
    success_url: "https://foliador.kailox.app/success",
    cancel_url: "https://foliador.kailox.app/error",
  });

  res.json({ url: session.url });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));
