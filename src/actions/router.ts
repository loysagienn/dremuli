import { AppRoute } from "app/router";

export type RouteToAction = {
  type: "ROUTE_TO";
  route: AppRoute;
};

export function routeToAction(route: AppRoute): RouteToAction {
  return {
    type: "ROUTE_TO",
    route,
  };
}
