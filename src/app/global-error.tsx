'use client'

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-6xl font-bold">500</h1>
        <p className="text-gray-500">Došlo je do neočekivane greške</p>
        <button
          onClick={reset}
          className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Pokušaj ponovo
        </button>
      </body>
    </html>
  )
}