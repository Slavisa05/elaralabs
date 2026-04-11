"use client";

interface TestimonialCardProps {
    name: string;
    imageUrl: string;
    paragraph: string;
}

export default function TestimonialCard({ name, imageUrl, paragraph }: TestimonialCardProps) {
    return (
        <div className="p-5 rounded-xl shadow-lg border border-accent/40 bg-background flex flex-col gap-4 w-72 md:w-80 shrink-0">
            {/* Stars */}
            <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg leading-none">★</span>
                ))}
            </div>

            <p className="text-foreground/80 leading-relaxed flex-1">&ldquo;{paragraph}&rdquo;</p>

            <div className="flex items-center gap-3 pt-3 border-t border-foreground/10">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={imageUrl}
                    alt={name}
                />
                <strong className="font-semibold text-sm">{name}</strong>
            </div>
        </div>
    );
}