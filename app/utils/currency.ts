export const USD_TO_HCASH_RATE = 1

export function usdToHCash(usd: number): number {
  return usd * USD_TO_HCASH_RATE
}

export function hCashToUSD(hCash: number): number {
  return hCash / USD_TO_HCASH_RATE
}

export function formatHCash(amount: number): string {
  return `${amount.toFixed(2)} HCash`
}

