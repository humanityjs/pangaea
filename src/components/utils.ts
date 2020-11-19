export const formatMoney = (num: string | number) =>
  Number(parseInt(num as string).toFixed(1)).toLocaleString()