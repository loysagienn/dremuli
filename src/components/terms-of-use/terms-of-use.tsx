import React, { lazy, Suspense } from "react";
import styles from "./terms-of-use.module.css";
import { Header } from "components/header";
import { useSelector } from "react-redux";
import { selectRoute } from "selectors";

const Content = lazy(() => import("./content"));
const ContentRu = lazy(() => import("./content-ru"));

export function TermsOfUse() {
  const route = useSelector(selectRoute);

  const isRuVersion = route.key === "terms_of_use" && route.lang === "ru";

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>
            {isRuVersion ? "Условия использования" : "Terms of Use"}
          </div>
          <Suspense>{isRuVersion ? <ContentRu /> : <Content />}</Suspense>
        </div>
      </div>
    </div>
  );
}
