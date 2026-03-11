import React from 'react';
import Image from 'next/image';
import { Product, ProductVariant } from '@/lib/inventory';

// ── Stock helpers ─────────────────────────────────────────────────────────────

function totalSimpleStock(stock: number | 'mto' | ProductVariant[]): number {
  if (stock === 'mto') return Infinity;
  if (typeof stock === 'number') return stock;
  // sum all non-null sizes across all variants
  return stock.reduce((total, variant) => {
    return total + Object.values(variant.sizes).reduce<number>((s, v) => s + (v ?? 0), 0);
  }, 0);
}

function StockBadge({ stock }: { stock: number | 'mto' | ProductVariant[] }) {
  if (stock === 'mto') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-melrose text-chambray">
        Made to Order
      </span>
    );
  }

  const total = totalSimpleStock(stock);

  if (total === 0) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
        Sold Out
      </span>
    );
  }

  if (typeof stock === 'number') {
    if (stock <= 3) {
      return (
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
            Low Stock
          </span>
          <span className="text-xs text-gray-500">{stock} left</span>
        </span>
      );
    }
    if (stock <= 5) {
      return <span className="text-xs text-gray-500">{stock} left</span>;
    }
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
      In Stock
    </span>
  );
}

// ── Sized variant table ───────────────────────────────────────────────────────

function SizeTable({ variants }: { variants: ProductVariant[] }) {
  // Collect all size keys across variants (preserves insertion order)
  const allSizes = Array.from(
    new Set(variants.flatMap((v) => Object.keys(v.sizes)))
  );

  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left py-1 pr-2 font-medium text-gray-500 whitespace-nowrap"></th>
            {allSizes.map((size) => (
              <th key={size} className="px-1.5 py-1 text-center font-medium text-gray-500">
                {size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant.label} className="border-t border-gray-100">
              <td className="py-1.5 pr-2 font-medium text-gray-700 whitespace-nowrap">
                {variant.label}
              </td>
              {allSizes.map((size) => {
                const count = variant.sizes[size];
                const isNull = count === null || count === undefined;
                const isSoldOut = count === 0;
                const isLow = typeof count === 'number' && count > 0 && count <= 3;

                return (
                  <td
                    key={size}
                    className={`px-1.5 py-1.5 text-center rounded ${
                      isNull || isSoldOut
                        ? 'text-gray-300'
                        : isLow
                        ? 'text-orange-600 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {isNull ? '—' : isSoldOut ? '0' : count}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

export default function ProductCard({ product }: { product: Product }) {
  const { name, price, image, description, stock } = product;
  const isSized = Array.isArray(stock);
  const isMTO = stock === 'mto';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-3"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-thunder text-base leading-tight">{name}</h3>
          <span className="text-chambray font-bold text-base whitespace-nowrap">${price}</span>
        </div>

        {description && (
          <p className="text-xs text-gray-500 mb-2">{description}</p>
        )}

        <div className="mt-auto pt-2">
          {isSized ? (
            <>
              <SizeTable variants={stock as ProductVariant[]} />
              <p className="text-xs text-gray-400 mt-1.5">Numbers show units remaining per size</p>
            </>
          ) : (
            <StockBadge stock={stock} />
          )}

          {isMTO && (
            <p className="text-xs text-gray-500 mt-1.5">
              We order the blank and apply the patch.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
