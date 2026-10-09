'use client';

import { useActionState } from 'react';
import { sendMessage } from '@/app/(site)/actions';

const TOPICS = [
  { value: 'general', label: 'A question or comment' },
  { value: 'correction', label: 'Report an error' },
  { value: 'tip', label: 'A story tip or a new find' },
];

export default function ContactForm({ topic = 'general', pageUrl = '' }) {
  const [state, action, pending] = useActionState(sendMessage, null);

  if (state?.ok) {
    return (
      <div className="contact-done" role="status">
        <h2>Thank you. Your message is in.</h2>
        <p>We read everything that comes in. If you left an email address, we’ll reply when we can.</p>
      </div>
    );
  }

  return (
    <form action={action} className="contact-form">
      <label>
        What is this about?
        <select name="topic" defaultValue={TOPICS.some((t) => t.value === topic) ? topic : 'general'}>
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <div className="row-2">
        <label>
          <span>
            Name <span className="hint">(optional)</span>
          </span>
          <input className="input" name="name" autoComplete="name" maxLength={200} />
        </label>
        <label>
          <span>
            Email <span className="hint">(optional, if you’d like a reply)</span>
          </span>
          <input className="input" name="email" type="email" autoComplete="email" maxLength={254} />
        </label>
      </div>
      <label>
        <span>
          Page it concerns <span className="hint">(optional)</span>
        </span>
        <input className="input" name="page_url" defaultValue={pageUrl} placeholder="Paste the link" maxLength={500} />
      </label>
      <label>
        Message
        <textarea name="body" required maxLength={5000} />
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <button type="submit" className="btn" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'}
        </button>
        {state?.message && (
          <p className="status error" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
