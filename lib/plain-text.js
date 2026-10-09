/** Strip the inline markup used in posts (**bold**, *italic*, [^1] notes) for plain-text uses like share descriptions. */
export function plainText(text = '') {
  return String(text ?? '')
    .replace(/\[\^\d+\]/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}
