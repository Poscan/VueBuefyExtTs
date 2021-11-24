import { countToCustomString } from "./countToCustomString";

export function convertStringDate(value: string): string {
  const countDays = parseInt(value);

  return countDays >= 21 && countDays % 7 == 0
    ? countToCustomString(countDays / 7, "неделя", "недели", "недель")
    : countToCustomString(countDays, "день", "дня", "дней");
}
