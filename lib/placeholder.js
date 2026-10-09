/**
 * Safety net for the public site: text that is still a bracketed placeholder,
 * such as "[Your bio]" or "[Photo credit]", is treated as empty so it never
 * shows to readers.
 */
export function isPlaceholder(text) {
  return typeof text === 'string' && /^\s*\[[^\]]*\]\s*\.?\s*$/.test(text);
}

export function clean(text) {
  if (text == null) return text;
  return isPlaceholder(text) ? null : text;
}

/** Posts that are still sample material from the original setup. */
export function isSamplePost(post) {
  return typeof post?.title === 'string' && /^\s*\[sample\]/i.test(post.title);
}
