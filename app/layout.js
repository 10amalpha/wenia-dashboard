import "./globals.css";

export const metadata = {
  title: "Wenia × 10AMPRO — Sponsor Dashboard",
  description: "Dashboard de rendimiento para sponsors de 10AMPRO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
