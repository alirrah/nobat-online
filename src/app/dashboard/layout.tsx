import { ReactNode } from "react";

import styles from "./layout.module.css";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return <div className={styles.layout}>{children}</div>;
}
