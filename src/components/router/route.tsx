import { selectRoute } from "selectors";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { AppRoute } from "app/router";

type RouteProps = {
  routeKey: AppRoute["key"];
  children: ReactNode;
};

export function Route({ routeKey, children }: RouteProps) {
  const currentRoute = useSelector(selectRoute);

  if (currentRoute.key !== routeKey) {
    return null;
  }

  return children;
}
