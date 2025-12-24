import './globals.css'
import { Cairo } from 'next/font/google'

// Load the Arabic Font from Google
const cairo = Cairo({ subsets: ['arabic'] })

export const metadata = {
  title: 'متجر الساعات | م lahchStore',
  description: 'أفضل الساعات الفاخرة',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <main className="min-h-screen bg-gray-50">
           {/* This acts as a container for all pages */}
           {children}
        </main>
      </body>
    </html>
  )
}
