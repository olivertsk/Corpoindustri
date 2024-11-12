export const normalizeAmounts = (amount: number) => {
  return Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
