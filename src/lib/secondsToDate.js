export const secondsToDate = seconds => {
  const date = new Date(1970, 0, 1); // Epoch Time
  date.setSeconds(seconds);
  return date;
};
