import { ReactNode } from "react";

import SidebarComponent from "@/app/dashboard/components/sidebar/sidebar.component";

import styles from "./layout.module.css";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className={styles.layout}>
      <SidebarComponent />
      {children}
    </div>
  );
}
