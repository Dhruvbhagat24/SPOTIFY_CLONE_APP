export const getDisplayDate = (date: string) =>
  new Date(date).toLocaleDateString('default', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
