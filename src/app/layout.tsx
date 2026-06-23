import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Nusa Perdana Cipta | Integrated Procurement Partner",
  description:
    "PT Nusa Perdana Cipta supports government, defense, BUMN, and industrial teams with technical apparel, IT infrastructure, manufacturing, military support, and oil and gas services.",
  keywords:
    "PT Nusa Perdana Cipta, NPC, procurement, tactical apparel, IT infrastructure, manufacturing, military solutions, oil and gas services",
  authors: [{ name: "PT Nusa Perdana Cipta" }],
  openGraph: {
    title: "PT Nusa Perdana Cipta | Integrated Procurement Partner",
    description:
      "Indonesia based procurement partner for institutions that need reliable goods, technical apparel, IT infrastructure, and operational services.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
