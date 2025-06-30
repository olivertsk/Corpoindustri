export const normalizeDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// normalize with time 12H Format
export const normalizeDateWithTime = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
