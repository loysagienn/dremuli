import React from "react";
import styles from "./navigation.module.css";
import { cn } from "utils/cn";
import { useSelector } from "react-redux";
import { selectRoute } from "selectors";
import { AppRouteKey } from "app/router";
import { Link } from "components/router";
import TimelineSvg from "svg/timeline.svg";
import ProfileSvg from "svg/profile.svg";
import StatisticsSvg from "svg/statistics.svg";
import SettingsSvg from "svg/settings-2.svg";

type NavigationProps = {
  className?: string;
};

const timelineRoutes: AppRouteKey[] = ["home"];
const profileRoutes: AppRouteKey[] = ["profile", "profile_password"];
const settingsRoutes: AppRouteKey[] = ["settings"];
const statisticsRoutes: AppRouteKey[] = ["statistics"];

export function Navigation({ className }: NavigationProps) {
  const route = useSelector(selectRoute);

  return (
    <div className={cn(className, styles.navigation)}>
      <div className={styles.content}>
        <Link
          className={cn(
            styles.tab,
            timelineRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "home" }}
        >
          <TimelineSvg className={styles.tabIcon} />
          Timeline
        </Link>
        <Link
          className={cn(
            styles.tab,
            statisticsRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "statistics" }}
        >
          <StatisticsSvg className={cn(styles.tabIcon, styles.statistics)} />
          Statistics
        </Link>
        <Link
          className={cn(
            styles.tab,
            profileRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "profile" }}
        >
          <ProfileSvg className={cn(styles.tabIcon, styles.profile)} />
          Profile
        </Link>
        <Link
          className={cn(
            styles.tab,
            settingsRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "settings" }}
        >
          <SettingsSvg className={cn(styles.tabIcon, styles.settings)} />
          Settings
        </Link>
      </div>
    </div>
  );
}
