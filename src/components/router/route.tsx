import { selectRoute } from "selectors";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { AppRoute } from "app/router";

type RouteProps = {
  routeKey: AppRoute["key"] | AppRoute["key"][];
  children: ReactNode;
};

export function Route({ routeKey, children }: RouteProps) {
  const currentRoute = useSelector(selectRoute);

  if (
    Array.isArray(routeKey)
      ? !routeKey.includes(currentRoute.key)
      : currentRoute.key !== routeKey
  ) {
    return null;
  }

  return children;
}
