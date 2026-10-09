'use client';

import { useActionState } from 'react';
import { subscribe } from '@/app/(site)/actions';

export default function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, null);
  const done = state?.ok;

  return (
    <form action={action}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        className="input"
        type="email"
        required
        placeholder="Your email address"
        autoComplete="email"
        disabled={done}
      />
      {/* Hidden from people; bots fill it in. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
      <button type="submit" className="btn" disabled={done || pending}>
        {done ? 'Subscribed' : pending ? 'Subscribing…' : 'Subscribe'}
      </button>
      <p className="form-note" role="status">
        {done
          ? 'You’re on the list. Look for The Weekly Sift in your inbox.'
          : state?.message || 'One letter a week. Unsubscribe anytime.'}
      </p>
    </form>
  );
}
