import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./statistics-page.module.css";
import { Layout } from "components/layout";
import { useSelector } from "react-redux";
import { NapsChart } from "components/naps-chart";
import { StatChart } from "components/stat-chart";
import {
  selectContentSize,
  selectIsSharePage,
  selectRoute,
  selectSharePageToken,
} from "selectors";
import { Link, Route } from "components/router";
import { useText } from "lang/context";
import { cn } from "utils/cn";

export function StatisticsPage() {
  const { statisticsPage: text } = useText();
  const contentSize = useSelector(selectContentSize);
  const [hasMounted, setHasMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const route = useSelector(selectRoute);

  const sharePageToken = useSelector(selectSharePageToken);

  // client-side rendering only
  useEffect(() => {
    const contentNode = contentRef.current;

    if (contentNode) {
      contentNode.style.opacity = "1";
    }

    setHasMounted(true);
  }, []);

  const innerContentSize = useMemo(
    () => ({
      height: contentSize.height - 50,
      width: contentSize.width,
    }),
    [contentSize]
  );

  return (
    <Layout>
      {sharePageToken ? (
        <div className={styles.header}>
          <Link
            route={{ key: "share_statistics_naps", token: sharePageToken }}
            className={cn(
              styles.link,
              route.key === "share_statistics_naps" && styles.isActive
            )}
          >
            {text.naps}
          </Link>
          <Link
            route={{ key: "share_statistics_charts", token: sharePageToken }}
            className={cn(
              styles.link,
              route.key === "share_statistics_charts" && styles.isActive
            )}
          >
            {text.charts}
          </Link>
        </div>
      ) : (
        <div className={styles.header}>
          <Link
            route={{ key: "statistics_naps" }}
            className={cn(
              styles.link,
              route.key === "statistics_naps" && styles.isActive
            )}
          >
            {text.naps}
          </Link>
          <Link
            route={{ key: "statistics_charts" }}
            className={cn(
              styles.link,
              route.key === "statistics_charts" && styles.isActive
            )}
          >
            {text.charts}
          </Link>
        </div>
      )}
      <div className={styles.content} ref={contentRef}>
        {hasMounted && (
          <>
            <Route routeKey={["statistics_naps", "share_statistics_naps"]}>
              <NapsChart contentSize={innerContentSize} />
            </Route>
            <Route routeKey={["statistics_charts", "share_statistics_charts"]}>
              <StatChart contentSize={innerContentSize} />
            </Route>
          </>
        )}
      </div>
    </Layout>
  );
}
