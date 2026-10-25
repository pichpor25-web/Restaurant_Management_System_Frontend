export const isValidName = (name) => name.trim().length >= 2
// Cambodian phone: 8-9 digits, optional leading 0 / +855
export const isValidPhone = (phone) =>
  /^(\+?855|0)?\d{8,9}$/.test(phone.replace(/[\s-]/g, ''))
