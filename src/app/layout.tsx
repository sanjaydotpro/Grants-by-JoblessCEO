import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { nunito, roboto, roboto_condensed, overpass } from "@/fonts/fonts";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./Providers";
import FooterSlim from "@/components/footer/FooterSlim";
import PlausibleProvider from "next-plausible";

export const metadata = {
	metadataBase: new URL("https://cavefinance.org"),
	title: "Cave - Your Finance Partner",
	description:
		"Discover and manage credit cards flawlessly, know the best card to use before you shop anywhere to maximize the rewards. Stay updated on best credit cards, loans, and insurance products in the market.",
	openGraph: {
		images: [
			{
				url: "/images/og-image.webp",
				width: 1200,
				height: 630,
				alt: "Cave - Your Finance Partner",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${nunito.variable} ${roboto.variable} ${roboto_condensed.variable} ${overpass.variable} flex flex-col min-h-screen`}
			>
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</Providers>
				<Toaster />
				<FooterSlim />
				<PlausibleProvider
					domain="cavefinance.org"
					customDomain="https://plausible.kapybara.site"
					selfHosted
					trackOutboundLinks
					trackFileDownloads
					taggedEvents
				/>
			</body>
		</html>
	);
}
