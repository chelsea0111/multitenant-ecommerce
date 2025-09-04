import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY!, {
  apiVersion: "2025-08-27.basil",
  typescript: true,
});
