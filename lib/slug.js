export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function sanitizeSlug(slug) {
  return generateSlug(slug || '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// For reading/deleting existing posts: strips only path-dangerous parts while
// keeping the original case and underscores, so the slug still matches the
// actual filename (existing files may be like `Learning_React_Day_3.md`).
export function sanitizeReadSlug(slug) {
  return String(slug || '')
    .replace(/\\/g, '')
    .replace(/\//g, '')
    .replace(/\.{2,}/g, '.');
}
