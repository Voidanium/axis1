export function Footer() {
  return (
    <footer className="bg-black text-white/60 py-12 px-12 border-t border-white/5 relative z-30">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-end">
        <div className="space-y-4">
          <h2 className="font-bitsumishi text-4xl text-white tracking-widest">AXIS</h2>
          <p className="text-[10px] uppercase tracking-widest">© 2024 AXIS LABORATORY. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="flex gap-10 mt-8 md:mt-0">
          <a className="text-[11px] uppercase tracking-widest hover:text-white transition-colors" href="#">
            Privacy
          </a>
          <a className="text-[11px] uppercase tracking-widest hover:text-white transition-colors" href="#">
            Terms
          </a>
          <a className="text-[11px] uppercase tracking-widest hover:text-white transition-colors" href="#">
            Shipping
          </a>
        </div>
      </div>
    </footer>
  )
}
