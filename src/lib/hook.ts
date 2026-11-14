const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Turns `*word*` into an italic serif hook. Everything else is escaped,
 * so the result is safe for `set:html`.
 *   hook("Build what *lasts*.") → 'Build what <em class="hook">lasts</em>.'
 */
export function hook(text: string): string {
  return escapeHtml(text).replace(/\*([^*]+)\*/g, '<em class="hook">$1</em>');
}

/** Like `hook`, but puts the final sentence on its own line:
 *  "Think clearly. Plan carefully.<br>Build what <em>lasts</em>." */
export function hookLastLine(text: string): string {
  const sentences = text.split(/(?<=\.)\s+/);
  if (sentences.length < 2) return hook(text);
  const last = sentences.pop() as string;
  return `${hook(sentences.join(" "))}<br />${hook(last)}`;
}

/** Plain-text version (asterisks removed) for titles, alt text and meta tags. */
export function plain(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "$1");
}

/** Wraps a middle initial ("B.") in a hook: "Mark George B. Reduca". */
export function hookInitial(name: string): string {
  return escapeHtml(name).replace(/\b([A-Z]\.)(?=\s)/, '<span class="hook">$1</span>');
}

/** Zero-padded index: 1 → "01" */
export const pad = (n: number) => String(n).padStart(2, "0");
