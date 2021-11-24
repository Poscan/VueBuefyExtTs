export function convertStringTime(value: string): string {
  const hours = parseInt(value);

  return hours == 0
    ? "после полуночи"
    : `сегодня после ${hours < 0 ? "0" + hours : hours}:00`;
}
