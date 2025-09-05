import { Raleway, Roboto_Mono } from 'next/font/google'
import '../styles/globals.css'
import GlobalLoader from "@/components/GlobalLoader";

const raleway = Raleway({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata = {
  title: "Student ERP",
  description: "Teacher & Student ERP Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className} >
                <GlobalLoader />
        <div className="font-swap">{children}</div>
      </body>
    </html>
  )
}