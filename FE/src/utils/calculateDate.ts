export function calculateMinutesBetweenDates(startAt: string, endAt: string) {
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

  return differenceInMinutes;
}

export function formatDateTime(dateTime: string) {
  const dateObject = new Date(dateTime);

  const year = String(dateObject.getFullYear()).slice(-2);
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const date = String(dateObject.getDate()).padStart(2, "0");

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${date} ${hours}:${minutes}`;
}
