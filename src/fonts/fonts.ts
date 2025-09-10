import { Nunito, Roboto, Roboto_Condensed, Overpass } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  weight: ["300", "400","700"],
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});
