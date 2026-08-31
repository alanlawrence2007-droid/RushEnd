/* Queueless / Signal Cartography: errors stay useful and point back to the city map. */
import { ArrowLeft, MapPinned } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return <div className="page-in flex min-h-[calc(100vh-70px)] items-center justify-center px-5 py-16"><div className="max-w-[500px] text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d85a30]/30 bg-[#d85a30]/10 text-[#ed8864]"><MapPinned size={28} /></div><p className="eyebrow mt-7">404 / lost signal</p><h1 className="mt-4 font-display text-[50px] font-semibold leading-[.95] tracking-[-.065em]">This queue doesn't exist.</h1><p className="mx-auto mt-5 max-w-[390px] text-[14px] leading-6 text-[#9aa79c]">Might've moved, might've never been real. Either way, not here.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#f3f3e8] px-4 py-3 text-[12px] font-semibold text-[#0e1210] hover:bg-[#dce9df]"><ArrowLeft size={15} /> Back to the map</Link></div></div>;
}
