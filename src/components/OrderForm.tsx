'use client';

import React, { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function OrderForm() {
  const [name, setName] = useState('');
  const [items, setItems] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, items, notes }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setItems('');
        setNotes('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-800 font-semibold text-lg mb-1">Order received!</p>
        <p className="text-green-700 text-sm">
          James will reach out to confirm and sort out Venmo. Keep an eye on your messages.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-700 underline underline-offset-2 hover:text-green-900"
        >
          Submit another order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-thunder mb-1.5">
          Your name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name is fine"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-thunder placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-danube focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="items" className="block text-sm font-medium text-thunder mb-1.5">
          What do you want? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="items"
          required
          rows={3}
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="e.g. 1 women's singlet size M, 2 stickers, 1 beanie"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-thunder placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-danube focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-thunder mb-1.5">
          Anything else?
        </label>
        <textarea
          id="notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. want a patch sewn on my crewneck, picking up at the track, etc."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-thunder placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-danube focus:border-transparent resize-none"
        />
      </div>

      <p className="text-sm text-gray-500 italic">
        James will reach out to confirm your order. You can Venmo him then.
      </p>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong — try again or just text James directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-chambray hover:bg-danube disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-danube focus:ring-offset-2 transition-colors"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Order Request'}
      </button>
    </form>
  );
}
