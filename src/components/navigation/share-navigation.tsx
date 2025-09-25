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
import { useText } from "lang/context";

type NavigationProps = {
  className?: string;
};

const timelineRoutes: AppRouteKey[] = ["share_timeline"];
const statisticsRoutes: AppRouteKey[] = [
  "share_statistics_naps",
  "share_statistics_charts",
];

export function ShareNavigation({ className }: NavigationProps) {
  const route = useSelector(selectRoute);
  const { navigation: text } = useText();

  if (
    route?.key !== "share_timeline" &&
    route?.key !== "share_statistics_naps" &&
    route?.key !== "share_statistics_charts"
  ) {
    return null;
  }

  const token = route.token;

  return (
    <div className={cn(className, styles.navigation)}>
      <div className={styles.content}>
        <Link
          className={cn(
            styles.tab,
            styles.shareTab,
            timelineRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "share_timeline", token }}
        >
          <TimelineSvg className={styles.tabIcon} />
          {text.timeline}
        </Link>
        <Link
          className={cn(
            styles.tab,
            styles.shareTab,
            statisticsRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "share_statistics_naps", token }}
        >
          <StatisticsSvg className={cn(styles.tabIcon, styles.statistics)} />
          {text.statistics}
        </Link>
        {/* <Link
          className={cn(
            styles.tab,
            profileRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "profile" }}
        >
          <ProfileSvg className={cn(styles.tabIcon, styles.profile)} />
          {text.profile}
        </Link>
        <Link
          className={cn(
            styles.tab,
            settingsRoutes.includes(route.key) && styles.isActive
          )}
          route={{ key: "settings" }}
        >
          <SettingsSvg className={cn(styles.tabIcon, styles.settings)} />
          {text.settings}
        </Link> */}
      </div>
    </div>
  );
}
