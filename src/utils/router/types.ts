export type Route = {
  key: string;
};

export type RouteConfig<TRoute extends Route = Route> = {
  key: TRoute["key"];
  readRoute: (path: string, searchParams: URLSearchParams) => TRoute | null;
  writeRoute: (route: TRoute) => string;
};

export type InferRoute<T> = T extends RouteConfig<infer R> ? R : never;
