import Stripe from "stripe";

export const getStripe = () => {
  const trimmedSecret = process.env.STRIPE_KEY?.trim();
  return new Stripe(trimmedSecret!, {
    apiVersion: "2020-08-27",
  });
};
