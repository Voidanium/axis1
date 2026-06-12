export function ResearchSection() {
  return (
    <section className="w-full max-w-[1100px] px-6 mt-32 space-y-32 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="space-y-6">
          <span className="text-xs tracking-[0.4em] uppercase text-white/40 font-dot-matrix">Research &amp; Development</span>
          <h2 className="text-5xl font-bitsumishi text-white leading-tight">Advanced Molecule Synthesis</h2>
          <p className="text-white/60 text-lg max-w-md">
            Our laboratory pushes the boundaries of olfactory science, engineering synthetic compounds that mimic the raw complexity of industrial environments combined with natural essences.
          </p>
        </div>

        <div className="glass-card-inset rounded-[40px] aspect-square flex items-center justify-center p-12">
          <div className="w-full h-full border border-white/10 rounded-full flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-8xl text-white/20" style={{ fontVariationSettings: "'wght' 100" }}>
              science
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
