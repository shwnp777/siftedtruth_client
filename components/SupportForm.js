'use client';

import { useState } from 'react';

const AMOUNTS = [10, 25, 50, 100];

/**
 * Giving form. In a later stage, "Continue" will POST { amount, frequency }
 * to an API route that creates a Stripe Checkout Session and redirects to it.
 * Stripe hosts the card form, so no payment details ever touch this site.
 */
export default function SupportForm() {
  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState('');
  const [note, setNote] = useState('');

  const value = custom ? Number(custom) : amount;
  const valid = Number.isFinite(value) && value >= 1;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setNote('Preview build: Stripe Checkout connects in a later stage.');
  };

  return (
    <form className="give-card" onSubmit={onSubmit}>
      <p className="label" style={{ marginBottom: 14 }}>
        Choose your gift
      </p>
      <div className="segmented" role="group" aria-label="Frequency">
        {['monthly', 'once'].map((f) => (
          <button key={f} type="button" aria-pressed={frequency === f} onClick={() => setFrequency(f)}>
            {f === 'monthly' ? 'Monthly' : 'One time'}
          </button>
        ))}
      </div>
      <div className="amounts" role="group" aria-label="Amount">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={!custom && amount === a}
            onClick={() => {
              setAmount(a);
              setCustom('');
            }}
          >
            ${a}
          </button>
        ))}
      </div>
      <label className="custom-amount">
        <span>$</span>
        <span className="sr-only">Other amount</span>
        <input
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          placeholder="Other amount"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </label>
      <button type="submit" className="btn" disabled={!valid}>
        {valid ? `Give $${value}${frequency === 'monthly' ? ' a month' : ''}` : 'Enter an amount'}
      </button>
      <p className="fine-print" role="status">
        {note || 'Secure checkout by Stripe. Cancel a monthly gift anytime.'}
      </p>
    </form>
  );
}
