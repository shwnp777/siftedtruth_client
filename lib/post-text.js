/** All strings in a post that may contain Scripture references (safe for client and server). */
export function textOf(post) {
  const out = [post.dek];
  const walk = (blocks = []) => {
    for (const b of blocks ?? []) {
      if (b.text) out.push(b.text);
      if (b.title) out.push(b.title);
      if (b.items) out.push(...b.items);
    }
  };
  walk(post.body);
  walk(post.video?.transcript);
  if (post.claim) {
    out.push(
      post.claim.summary,
      post.claim.origin,
      ...(post.claim.evidence_for ?? []),
      ...(post.claim.evidence_against ?? [])
    );
  }
  for (const f of post.footnotes ?? []) out.push(f.text);
  return out.filter(Boolean);
}
