import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover', // ✅ Fixed version
});

export async function POST(req: Request) {
  try {
    const { amount, sender, receiver, referenceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'php',
          product_data: { name: 'Booking Payment' },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL_LIVE}/receipts/refundsPayment?sender=${sender}&receiver=${receiver}&amount=${amount/100}&refId=${referenceId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL_LIVE}/pages/artist/booking`,
      metadata: { referenceId, sender, receiver },
    });

    // ✅ Return the checkout URL
    return NextResponse.json({ 
      checkoutUrl: session.url 
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


