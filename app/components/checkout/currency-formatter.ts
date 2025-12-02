export const currencyFormatter = (value: number, currency = 'ZMW') => {
  // Format with K (Kwacha) prefix instead of $ (Dollar)
  if (currency === 'USD' || currency === 'ZMW') {
    return `K${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

