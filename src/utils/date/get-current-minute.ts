export function getCurrentMinute() {
  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now;
}

export function getCurrentDay() {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now;
}
