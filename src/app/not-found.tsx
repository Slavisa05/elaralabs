import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500">Stranica nije pronađena</p>
      <Link href="/" className="bg-black text-white px-6 py-2 rounded-xl">
        Nazad na početnu
      </Link>
    </div>
  )
}