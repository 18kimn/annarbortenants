export function printFormattedDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
    timeZone: "UTC",
  });
  return formatter.format(date);
}
