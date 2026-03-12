import React from 'react';
import { inventory } from '@/lib/inventory';
import ProductCard from '@/components/ProductCard';
import OrderForm from '@/components/OrderForm';

export const metadata = {
  title: 'Merch — South Hillbillies A.C.',
  description: 'South Hillbillies gear — singlets, tees, patches, and more.',
};

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-fall">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ── Page header ────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="bg-donkey rounded-t-lg py-4 px-4">
            <h1 className="text-2xl sm:text-3xl font-serif uppercase tracking-wide text-center text-thunder">
              Merch
            </h1>
          </div>
          <div className="bg-white rounded-b-lg border-x border-b border-danube px-4 py-3 text-center">
            <p className="text-sm text-thunder/70">
              This is a catalog, not a store. Pick what you want, fill out the form below, and James will sort it out.
            </p>
          </div>
        </div>

        {/* ── Product grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {inventory.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── Patch sewing callout ───────────────────────────────────────── */}
        <div className="bg-white border border-danube rounded-lg px-5 py-4 mb-10 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0" aria-hidden>🧵</span>
          <p className="text-sm text-thunder/80">
            <span className="font-[400] text-thunder">Got something you want a patch on?</span>{' '}
            We can sew it for you, just ask! Works on your own gear or on a made-to-order beanie or crewneck.
          </p>
        </div>

        {/* ── Order form ─────────────────────────────────────────────────── */}
        <div className="max-w-xl mx-auto">
          <div className="bg-donkey rounded-t-lg py-3 px-4">
            <h2 className="text-lg font-serif uppercase tracking-wide text-center text-thunder">Place an Order Request</h2>
          </div>
          <div className="bg-white rounded-b-lg border-x border-b border-danube p-5 sm:p-6">
            <OrderForm />
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <div className="mt-8 text-center text-thunder/50">
          <p className="font-serif italic text-sm">South Hillbillies A.C. © 2018</p>
        </div>

      </div>
    </main>
  );
}
