const shortDateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' });

export function formatShortDate(isoDate: string): string {
  return shortDateFormatter.format(new Date(isoDate));
}
