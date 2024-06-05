import prisma from "@/lib/db";
import Stripe from 'stripe'

declare const global: Global & {stripe: Stripe};

export let stripe: Stripe;

if(typeof window === 'undefined') {
    if(process.env['NODE_ENV'] === 'production') {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    } else {
        if(!global.stripe) {
            global.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
        }
        stripe = global.stripe;
    }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;
  const webhookSecret =  process.env.STRIPE_WEBHOOK_SECRET as string

  // verify webhook came from Stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.log("Webhook verification failed", error);
    return Response.json(null, { status: 400 });
  }

  // fulfill order
  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email as string,
        },
        data: {
          hasAccess: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // return 200 OK
  return Response.json(null, { status: 200 });
}