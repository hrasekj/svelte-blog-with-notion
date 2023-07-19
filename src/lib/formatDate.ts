export function formatDate(date: Date) {
  const intl = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return intl.format(date);
}
