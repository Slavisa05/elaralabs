function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-foreground/10 ${className ?? ''}`} />
  )
}

export default function MainLoading() {
  return (
    <main className="px-[5vw] flex flex-col gap-10">

      {/* HeroSection skeleton */}
      <section className="min-h-screen pt-[20vh] pb-10 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center gap-5">
            <Skeleton className="h-14 w-[85%]" />
            <Skeleton className="h-14 w-[70%]" />
            <Skeleton className="h-5 w-[80%] mt-2" />
            <Skeleton className="h-5 w-[65%]" />
            <div className="flex gap-4 mt-4 w-[80%]">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-full aspect-square max-w-sm rounded-2xl" />
          </div>
        </div>
      </section>

      {/* ProizvodSection skeleton */}
      <section className="rounded-2xl overflow-hidden bg-foreground/5 min-h-128">
        <div className="flex gap-2 p-4 md:hidden flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="hidden md:flex flex-row min-h-112">
          <div className="flex flex-col justify-center gap-2 p-8 border-r border-foreground/10 min-w-45">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-36 rounded-xl" />
            ))}
          </div>
          <div className="flex-1 p-12 flex items-center gap-10">
            <div className="flex flex-col gap-4 flex-1">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[75%]" />
              <Skeleton className="h-12 w-40 mt-4" />
            </div>
            <Skeleton className="w-64 h-64 rounded-2xl shrink-0" />
          </div>
        </div>
      </section>

      {/* ZastoMiSection skeleton */}
      <section className="py-10">
        <Skeleton className="h-10 w-64 mx-auto mb-10 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-start p-4">
              <Skeleton className="w-12 h-12 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TestimonialSection skeleton */}
      <section className="py-10 overflow-hidden">
        <Skeleton className="h-8 w-72 mx-auto mb-10" />
        <div className="flex gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shrink-0 w-72 md:w-80 p-5 rounded-xl bg-foreground/5 flex flex-col gap-4">
              <div className="flex items-center gap-4 pb-3 border-b border-foreground/10">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-5 w-28" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          ))}
        </div>
      </section>

      {/* ContactSection skeleton */}
      <section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <Skeleton className="h-10 w-52" />
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-[55%]" />
          </div>
          <div className="flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className={i === 2 ? 'h-40' : 'h-11'} />
              </div>
            ))}
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </section>

      {/* CTA skeleton */}
      <Skeleton className="w-full h-64 md:h-96 rounded-2xl mb-10" />

    </main>
  )
}
