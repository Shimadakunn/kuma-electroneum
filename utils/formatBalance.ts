export function formatNumberForDisplay(numberString: string) {
  if (numberString === undefined) return undefined;
  const decimalIndex = numberString.indexOf('.');
  if (decimalIndex !== -1) {
    const [integerPart, initialDecimalPart] = numberString.split('.');
    let decimalPart = initialDecimalPart.substring(0, 4);

    // Check if all decimal digits are 0
    if (!decimalPart || decimalPart.split('').every((d) => d === '0')) {
      return integerPart;
    }

    // Trim trailing zeros
    for (let i = decimalPart.length - 1; i >= 0; i--) {
      if (decimalPart[i] !== '0') {
        decimalPart = decimalPart.substring(0, i + 1);
        break;
      }
    }
    return `${integerPart}.${decimalPart}`;
  }
  return numberString;
}

export function formatBalance(value: string | number | undefined, decimals?: number): string {
  if (value === undefined || value === null) return 'N/A';

  const numberString = typeof value === 'number' ? value.toString() : value;

  if (typeof numberString !== 'string' || isNaN(Number(numberString))) {
    return 'Invalid';
  }

  const parts = numberString.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1] || '';

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart) {
    decimalPart = decimalPart.substring(0, decimals || 2);

    // Check if all decimal digits are 0
    if (!decimalPart || decimalPart.split('').every((d) => d === '0')) {
      return integerPart;
    }

    // Trim trailing zeros
    for (let i = decimalPart.length - 1; i >= 0; i--) {
      if (decimalPart[i] !== '0') {
        decimalPart = decimalPart.substring(0, i + 1);
        break;
      }
    }

    return `${integerPart}.${decimalPart}`;
  }

  return integerPart;
}
