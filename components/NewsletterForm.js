'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Stage 2+: send to your newsletter provider (or a Supabase table) here.
    setDone(true);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        className="input"
        type="email"
        required
        placeholder="you@example.com"
        autoComplete="email"
        disabled={done}
      />
      <button type="submit" className="btn" disabled={done}>
        {done ? 'Subscribed' : 'Subscribe'}
      </button>
      <p className="form-note" role="status">
        {done ? 'Thanks! (Preview build: signups connect in a later stage.)' : 'One letter a week. Unsubscribe anytime.'}
      </p>
    </form>
  );
}
