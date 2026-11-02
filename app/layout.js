
import { OpportunityProvider } from "../context/OpportunityContext";
import "./globals.css";

export const metadata = {
  title: "OpportunityHub",
  description: "Discover and track student opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <OpportunityProvider>
          {children}
        </OpportunityProvider>
      </body>
    </html>
  );
}
