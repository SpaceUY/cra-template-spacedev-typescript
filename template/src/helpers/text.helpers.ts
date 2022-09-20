export function redact(value: string, visibleCharsCount = 0): string {
  const visibleChars = value.slice(0, visibleCharsCount);

  const asterisksLength =
    visibleCharsCount >= value.length ? 0 : value.length - visibleCharsCount;

  const asterisks = new Array(asterisksLength).fill('*').join('');

  return `${visibleChars}${asterisks}`;
}
