export const normalizeDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
