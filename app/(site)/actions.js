'use server';

import { isSupabaseConfigured } from '@/lib/supabase/config';
import { publicClient } from '@/lib/supabase/public';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const text = (v, max) => String(v ?? '').trim().slice(0, max);

/** Newsletter sign-up from the home page. */
export async function subscribe(_prev, formData) {
  if (text(formData.get('company'), 100)) return { ok: true }; // filled only by bots
  const email = text(formData.get('email'), 254).toLowerCase();
  if (!EMAIL.test(email)) return { ok: false, message: 'Please enter a valid email address.' };
  if (!isSupabaseConfigured) return { ok: false, message: 'Sign-ups are unavailable right now. Please try again later.' };

  const { error } = await publicClient().from('subscribers').insert({ email, source: text(formData.get('source'), 60) || 'home' });
  // 23505 = already subscribed, which is a success from the reader's side.
  if (error && error.code !== '23505') {
    console.error('subscribe:', error.message);
    return { ok: false, message: 'Something went wrong. Please try again in a moment.' };
  }
  return { ok: true };
}

/** Contact and corrections form. */
export async function sendMessage(_prev, formData) {
  if (text(formData.get('company'), 100)) return { ok: true };
  const body = text(formData.get('body'), 5000);
  const email = text(formData.get('email'), 254);
  const topic = ['general', 'correction', 'tip'].includes(formData.get('topic')) ? formData.get('topic') : 'general';
  if (body.length < 5) return { ok: false, message: 'Please write a few words so we know what this is about.' };
  if (email && !EMAIL.test(email)) return { ok: false, message: 'That email address doesn’t look right.' };
  if (!isSupabaseConfigured) return { ok: false, message: 'Messages are unavailable right now. Please try again later.' };

  const { error } = await publicClient()
    .from('messages')
    .insert({
      topic,
      body,
      email: email || null,
      name: text(formData.get('name'), 200) || null,
      page_url: text(formData.get('page_url'), 500) || null,
    });
  if (error) {
    console.error('sendMessage:', error.message);
    return { ok: false, message: 'Something went wrong. Please try again in a moment.' };
  }
  return { ok: true };
}
