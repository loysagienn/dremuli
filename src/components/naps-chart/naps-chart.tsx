import React from "react";
import styles from "./naps-chart.module.css";
import { Timeline } from "./timeline";
import { Size } from "types";
import { Sidebar } from "./sidebar";

const headerHeight = 50;
const sidebarWidth = 60;

type StatisticsProps = {
  contentSize: Size;
};

export function NapsChart({ contentSize }: StatisticsProps) {
  return (
    <>
      <Sidebar contentSize={contentSize} headerHeight={headerHeight} />
      <Timeline
        width={contentSize.width - sidebarWidth}
        height={contentSize.height}
        headerHeight={headerHeight}
      />
    </>
  );
}
