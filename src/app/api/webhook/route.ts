import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db"; // adjust based on your Petsoft structure

const { log } = console;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;

      if (email) {
        await prisma.user.update({
          where: {
            email: event.data.object.customer_email!,
          },
          data: {
            hasAccess: true,
          },
        });
        log(`✅ Access granted for ${email}`);
      }
      break;
    }

    default:
      log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
