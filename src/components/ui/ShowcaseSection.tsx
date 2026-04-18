import Image from "next/image"

export default function ShowcaseSection() {
    return(
        <section className="relative px-[5vw] py-25 bg-linear-to-b from-background via-background to-accent">
            <h2 className="mb-3 text-center">Upoznajte ukuse</h2>
            <p className="mb-10 md:mb-15 text-center">Pet pažljivo razvijenih ukusa — prirodni sastojci, bez kompromisa.</p>
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="w-full flex items-center justify-center">
                    <Image 
                        src="/kutija.png"
                        alt="slika kutije"
                        width={600}
                        height={600}
                        className="rounded-xl w-70 md:w-90"
                    />
                </div>

                <div className="w-full flex items-center justify-between">
                    <Image 
                        src="/grupna_slika.png"
                        alt="labelo med"
                        width={400}
                        height={400}
                        className="rounded-xl w-full"
                    />
                </div>
            </div>
        </section>
    )
}