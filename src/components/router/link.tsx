import { selectRoute } from "selectors";
import { useDispatch, useSelector } from "react-redux";
import { MouseEvent, ReactNode, useCallback, useMemo } from "react";
import { AppRoute, router } from "app/router";
import { routeToAction, RouteToAction } from "actions";
import React from "react";
import { cn } from "utils/cn";
import styles from "./route.module.css";

type LinkProps = {
  route: AppRoute;
  children: ReactNode;
  className?: string;
  web?: boolean;
};

export function Link({ route, children, className, web }: LinkProps) {
  const dispatch = useDispatch();

  const href = useMemo(() => router.writeRoute(route), [route]);

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (web) {
        return;
      }

      dispatch(routeToAction(route));

      event.preventDefault();
    },
    [route, web]
  );

  return (
    <a href={href} className={cn(className, styles.link)} onClick={onClick}>
      {children}
    </a>
  );
}
