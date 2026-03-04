// Stripe client setup — will be configured when keys are available
// For now, export placeholder config

export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  secretKey: process.env.STRIPE_SECRET_KEY ?? "",
} as const;

// Stripe will be initialized when keys are provided:
// import { loadStripe } from "@stripe/stripe-js";
// export const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);
