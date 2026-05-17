export default function Header() {
  return (
    <header className="h-16 bg-[#111111] border-b border-[#2A2A2A] flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-4">
        {/* Notifications, messages, avatar placeholders */}
        <button className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A0A0A0] text-xs flex items-center justify-center">
          N
        </button>
        <button className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A0A0A0] text-xs flex items-center justify-center">
          M
        </button>
        <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black text-xs font-bold">
          U
        </div>
      </div>
    </header>
  )
}
