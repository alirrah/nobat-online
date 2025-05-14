import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo/logo.svg";

import { socialLinkType } from "@/types/social-link.type";

import styles from "./footer.module.css";

export default function FooterComponent({
  socialMedia,
}: {
  socialMedia: socialLinkType[];
}): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image src={Logo} alt="nobat online logo" />
        <p>نوبت آنلاین</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.row}>
        <p className={styles.copy}>
          © استفاده از مطالب سایت تنها با درج لینک مستقیم به آن مطلب مجاز است.
        </p>
        <ul>
          {socialMedia.map((socialItem) => (
            <li key={socialItem.id}>
              <Link href={socialItem.link} target="_blank">
                {socialItem.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
