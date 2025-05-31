import "./globals.css"
// import { UserProvider } from "UserContext.jsx";

export const metadata = {
  title: 'Tournament Admin',
  description: 'Manage tournaments',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
