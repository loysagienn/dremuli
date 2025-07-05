export function getCurrentMinute() {
  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now;
}
