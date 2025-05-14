import { ReactNode } from "react";

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import FooterComponent from "@/components/footer/footer.component";
import HeaderComponent from "@/components/header/header.component";
import ToasterComponent from "@/components/toaster/toaster.component";

import MingcuteInsFill from "@/icons/MingcuteInsFill";
import MingcuteLinkedinFill from "@/icons/MingcuteLinkedinFill";
import MingcuteTelegramFill from "@/icons/MingcuteTelegramFill";

import { MenuItemType } from "@/types/menu-item.type";
import { socialLinkType } from "@/types/social-link.type";

import "@/styles/typography.css";

import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "نوبت آنلاین",
  description: "سامانه نوبت‌دهی آنلاین",
};

const menu: MenuItemType[] = [
  {
    id: 0,
    title: "خانه",
    link: "/",
  },
  {
    id: 1,
    title: "جستجو",
    link: "/search",
  },
];

const socialMedia: socialLinkType[] = [
  {
    id: 0,
    icon: <MingcuteTelegramFill />,
    link: "https://t.me/alirrah81",
  },
  {
    id: 1,
    icon: <MingcuteLinkedinFill />,
    link: "https://www.linkedin.com/in/alireza-rahmani-samani-996477216/",
  },
  {
    id: 2,
    icon: <MingcuteInsFill />,
    link: "https://instagram.com/alirrah81",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body>
        <HeaderComponent menu={menu} />
        <main>{children}</main>
        <FooterComponent socialMedia={socialMedia} />
        <ToasterComponent />
      </body>
    </html>
  );
}
