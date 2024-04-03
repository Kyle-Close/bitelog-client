export function getCurrentISODate() {
  const now = new Date();
  const isoDate = now.toISOString();
  return isoDate;
}
