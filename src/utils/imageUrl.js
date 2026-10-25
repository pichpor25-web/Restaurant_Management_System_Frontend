// DB stores a path like "menu-items/abc.jpg" (public disk) → served at /storage/...
// Full URLs, blob: previews and absolute paths are returned unchanged.
export const imageUrl = (value) => {
  if (!value) return ''
  return /^(https?:|data:|blob:|\/)/.test(value) ? value : `/storage/${value}`
}