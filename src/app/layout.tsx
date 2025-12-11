import Providers from "./providers";
import "./globals.css";

export const metadata = {
    title: "E-Commerce Lab | Cloud Infrastructure Store",
    description: "A heterogeneous microservices ecosystem for studying cloud architecture with AWS EKS, multiple message brokers, and various storage types.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
