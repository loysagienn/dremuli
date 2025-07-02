import { RouteConfig, InferRoute } from "./types";
import { parseUrl } from "./parse-url";

export function initRouter<Routes extends RouteConfig[]>(...configs: Routes) {
  const readRoute = (url: string): InferRoute<Routes[number]> | null => {
    const [path, searchParams] = parseUrl(url);

    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];

      const route = config.readRoute(path, searchParams);

      if (route) {
        return route as InferRoute<Routes[number]>;
      }
    }

    return null;
  };

  const writeRoute = (route: InferRoute<Routes[number]>): string => {
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];

      if (config.key === route.key) {
        return config.writeRoute(route);
      }
    }

    return "/";
  };

  return { readRoute, writeRoute };
}
