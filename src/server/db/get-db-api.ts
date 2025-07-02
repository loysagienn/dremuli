import * as requests from "./requests";

type RequestKeys = keyof typeof requests;

export type DbApi = {
  [key in RequestKeys]: ReturnType<(typeof requests)[key]>;
};

function initDbApi(): DbApi {
  return Object.entries(requests).reduce(
    (acc, [key, request]) => ({ ...acc, [key]: request() }),
    {} as DbApi
  );
}

let db: DbApi | null = null;

export const getDbApi = async (): Promise<DbApi> => {
  if (!db) {
    db = initDbApi();
  }

  return db;
};
