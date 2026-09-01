import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Clock3, Radio, Users } from "lucide-react";
import { rushendApi, type TokenStatus } from "@/lib/rushendApi";

export default function SharedStatusPage({ params }: { params: { code: string } }) {
  const [data, setData] = useState<(TokenStatus & { share_expires_at?: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { void rushendApi.shared(params.code).then(setData).catch(cause => setError(cause instanceof Error ? cause.message : "Shared status unavailable")); }, [params.code]);
  if (error) return <main className="grid min-h-screen place-items-center bg-[#120c12] px-5 text-center text-[#ff9c7b]"><div><p>{error}</p><Link href="/" className="mt-4 inline-block text-sm text-[#ffbd4a]">Open RushEnd</Link></div></main>;
  if (!data) return <main className="grid min-h-screen place-items-center bg-[#120c12] text-[#9ba89d]">Loading shared status…</main>;
  const isCalled = data.token.status === "called";
  return <main className="min-h-screen bg-[#120c12] px-5 py-10 text-[#f3f3e8] sm:px-10"><div className="mx-auto max-w-xl"><Link href="/" className="text-sm font-semibold text-[#f3f3e8]">RushEnd</Link><section className="mt-10 rounded-3xl border border-white/[.10] bg-[#1d111b] p-7 sm:p-10"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em]" style={{ color: isCalled ? "#f05b63" : "#8dd7b6" }}><Radio size={15} /> {isCalled ? "Come now" : "Live shared status"}</div><h1 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em]">{data.queue.business_name || "RushEnd queue"}</h1><p className="mt-2 text-sm text-[#9ba89d]">{data.queue.service_name}</p><div className="mt-9 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/[.08] bg-[#120c12] p-4"><p className="eyebrow">Token</p><p className="mt-2 font-display text-4xl font-semibold text-[#ffbd4a]">{data.token.token_number}</p></div><div className="rounded-2xl border border-white/[.08] bg-[#120c12] p-4"><p className="eyebrow">Position</p><p className="mt-2 font-display text-4xl font-semibold">{data.position ?? "—"}</p></div></div><div className="mt-4 rounded-2xl border border-white/[.08] bg-[#18211b] p-4"><p className="flex items-center gap-2 text-sm text-[#cdd8ce]"><Clock3 size={15} className="text-[#ffbd4a]" /> Estimated wait: {data.token.predicted_wait_mins ?? "—"} minutes</p><p className="mt-2 flex items-center gap-2 text-xs text-[#89968b]"><Users size={14} /> This link is view-only and expires automatically.</p></div></section></div></main>;
}
