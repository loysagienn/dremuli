import { ActionHandler } from "types";
import {
  selectCurrentTime,
  selectEventsReverse,
  selectTimeZone,
} from "selectors";
import { downloadJSON } from "utils/browser";
import { formatDate } from "utils/date";

function toIsoWithTimezone(date: Date) {
  const tzo = -date.getTimezoneOffset();
  const sign = tzo >= 0 ? "+" : "-";
  const pad = (num: number) =>
    String(Math.floor(Math.abs(num))).padStart(2, "0");

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    "." +
    String(date.getMilliseconds()).padStart(3, "0") +
    sign +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
}

export const exportToJson: ActionHandler<"EXPORT_TO_JSON"> = async ({
  action,
  dispatch,
  api,
  next,
  getState,
}) => {
  next(action);

  const { dateFrom, dateTo } = action;

  const fromTs = dateFrom.getTime();
  const toTsDate = new Date(dateTo);
  toTsDate.setDate(toTsDate.getDate() + 1);
  const toTs = toTsDate.getTime();

  const events = selectEventsReverse(getState());
  const timeZone = selectTimeZone(getState());
  const currentTime = selectCurrentTime(getState());

  const eventsData = events
    .filter(
      (event) =>
        event.timestamp.getTime() >= fromTs && event.timestamp.getTime() <= toTs
    )
    .map((event) => ({
      type: event.type,
      timestamp: toIsoWithTimezone(event.timestamp),
      comment: event.comment,
    }));

  const filename = `Dremuli ${formatDate(dateFrom, {
    lang: "en",
  })} - ${formatDate(dateTo, { lang: "en" })}.json`;

  const data = {
    description: `Export of baby sleep events from Dremuli ${location.origin}. Each event contains a type ('fell_asleep' or 'woke_up') and an ISO 8601 timestamp with timezone offset.`,
    generated_at: toIsoWithTimezone(currentTime),
    timeZone,
    events: eventsData,
  };

  downloadJSON(data, filename);
};
