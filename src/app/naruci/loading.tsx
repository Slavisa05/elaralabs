function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-foreground/10 ${className ?? ''}`} />
  )
}

export default function NaruciLoading() {
  return (
    <main className="relative px-[5vw] pt-10 flex flex-col gap-10">

      {/* Nazad link */}
      <div className="absolute top-5 left-2.5 flex items-center gap-4">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-5 w-40 rounded-md" />
      </div>

      <section>
        <div className="grid grid-cols-[2fr_1fr] md:grid-cols-2 gap-8 pt-8 md:p-8">

          {/* LEVO — Kutija skeleton */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-full">
                {/* Poklopac */}
                <Skeleton className="w-full h-8 rounded-t-xl rounded-b-none bg-amber-200" />
                {/* Telo */}
                <div className="w-full h-80 rounded-b-xl rounded-tr-xl border-4 border-foreground/10 bg-amber-50/50 relative overflow-hidden">
                  {/* Simulirani red proizvoda */}
                  <div className="absolute bottom-2 left-2 right-2 flex flex-col-reverse gap-1">
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="w-20 h-20 bg-amber-200/60 rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESNO — Proizvodi skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <Skeleton className="w-24 h-24 md:w-48 md:h-48 rounded-xl" />
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}
