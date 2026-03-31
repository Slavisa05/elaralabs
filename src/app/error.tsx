'use client' // ← ovo je obavezno za error.tsx!

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold">Nešto je pošlo naopako</h2>
      <button
        onClick={reset} // pokušaj ponovo
        className="bg-black text-white px-6 py-2 rounded-xl"
      >
        Pokušaj ponovo
      </button>
    </div>
  )
}