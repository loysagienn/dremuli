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
  onClick?: () => void;
};

export function Link({ route, children, className, web, onClick }: LinkProps) {
  const dispatch = useDispatch();

  const href = useMemo(() => router.writeRoute(route), [route]);

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (web || event.metaKey) {
        if (onClick) {
          onClick();
        }

        return;
      }

      dispatch(routeToAction(route));

      event.preventDefault();

      if (onClick) {
        onClick();
      }
    },
    [route, web]
  );

  return (
    <a
      href={href}
      className={cn(className, styles.link)}
      onClick={clickHandler}
    >
      {children}
    </a>
  );
}
