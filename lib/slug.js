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
