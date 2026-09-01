import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, BellRing, Check, Copy, LogOut, Radio, Share2 } from "lucide-react";
import { rushendApi, type TokenStatus } from "@/lib/rushendApi";
import { subscribeToQueue } from "@/lib/rushendRealtime";

function statusMeta(status: TokenStatus["token"]["status"], position: number | null) {
  if (status === "called") return { label: "Come now", color: "#f05b63", message: "Your turn is up. Head to the counter." };
  if (status === "served") return { label: "Served", color: "#1d9e75", message: "Your visit is complete." };
  if (position !== null && position <= 2) return { label: "Get ready", color: "#ffbd4a", message: "You are close. Keep your phone nearby." };
  return { label: "Relax", color: "#1d9e75", message: "You can move freely while RushEnd watches the queue." };
}

export default function LiveStatusPage({ params }: { params: { id: string } }) {
  const [, navigate] = useLocation();
  const [data, setData] = useState<TokenStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shared, setShared] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const load = async () => { try { const next = await rushendApi.token(params.id); if (active) setData(next); } catch (cause) { if (active) setError(cause instanceof Error ? cause.message : "Unable to load token"); } };
    void load();
    let cleanup: () => void = () => undefined;
    void rushendApi.token(params.id).then((next) => { if (next.token.queue_id) cleanup = subscribeToQueue(next.token.queue_id, () => void load()); });
    return () => { active = false; cleanup(); };
  }, [params.id]);
  if (error) return <main className="min-h-screen bg-[#120c12] px-5 py-12 text-[#f3f3e8]"><p className="text-[#ff9c7b]">{error}</p><Link href="/" className="mt-5 inline-block text-sm text-[#ffbd4a]">Back to RushEnd</Link></main>;
  if (!data) return <main className="grid min-h-screen place-items-center bg-[#120c12] text-[#9ba89d]">Loading your live status…</main>;
  const meta = statusMeta(data.token.status, data.position);
  const share = async () => { const result = await rushendApi.shareToken(params.id); await navigator.clipboard?.writeText(result.share_url); setShared(result.share_url); };
  const leave = async () => { await rushendApi.leaveToken(params.id); navigate("/"); };
  return <main className="min-h-screen bg-[#120c12] px-5 py-8 text-[#f3f3e8] sm:px-10 lg:px-20"><div className="mx-auto max-w-4xl"><Link href="/" className="inline-flex items-center gap-2 text-sm text-[#9ba89d] hover:text-white"><ArrowLeft size={16} /> RushEnd</Link><div className="mt-10 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Live queue status</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">{data.queue.business_name || "Your queue"}</h1><p className="mt-3 text-[#9ba89d]">{data.queue.service_name}</p></div><span className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold" style={{ color: meta.color, borderColor: `${meta.color}55`, background: `${meta.color}12` }}><Radio size={14} /> Live</span></div><section className="mt-10 grid gap-4 md:grid-cols-[1.2fr_.8fr]"><div className="rounded-3xl border border-white/[.10] bg-[#1d111b] p-7 sm:p-10"><div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ background: meta.color, boxShadow: `0 0 18px ${meta.color}` }} /><span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: meta.color }}>{meta.label}</span></div><p className="mt-7 text-sm text-[#9ba89d]">{meta.message}</p><div className="mt-10 flex items-end gap-10"><div><p className="eyebrow">Position</p><p className="mt-2 font-display text-7xl font-semibold tracking-[-.08em]">{data.position ?? "—"}</p></div><div><p className="eyebrow">Predicted wait</p><p className="mt-2 font-display text-5xl font-semibold tracking-[-.07em]" style={{ color: meta.color }}>{data.token.predicted_wait_mins ?? "—"}<span className="ml-1 text-lg">min</span></p></div></div></div><div className="rounded-3xl border border-white/[.10] bg-[#18211b] p-7"><p className="eyebrow">Your token</p><p className="mt-3 font-display text-6xl font-semibold tracking-[-.08em] text-[#ffbd4a]">{data.token.token_number}</p><div className="mt-8 rounded-2xl border border-white/[.08] bg-[#120c12] p-4"><div className="flex items-center gap-3 text-sm text-[#cdd8ce]"><BellRing size={17} className="text-[#ffbd4a]" /> We’ll keep this status live.</div><p className="mt-2 text-xs leading-5 text-[#77867b]">You can share the link with family without exposing your account.</p></div></div></section><div className="mt-5 flex flex-wrap gap-3"><button onClick={share} className="inline-flex items-center gap-2 rounded-xl bg-[#ff8a2b] px-4 py-3 text-sm font-bold text-[#160b05]"><Share2 size={16} /> Share status</button><button onClick={leave} className="inline-flex items-center gap-2 rounded-xl border border-white/[.12] px-4 py-3 text-sm font-semibold text-[#b2beb3]"><LogOut size={16} /> Leave queue</button>{shared && <span className="inline-flex items-center gap-2 rounded-xl border border-[#1d9e75]/30 bg-[#1d9e75]/10 px-4 py-3 text-xs text-[#8dd7b6]"><Copy size={14} /> Link copied</span>}{data.token.status === "served" && <Link href={`/rate/${data.token.id}`} className="inline-flex items-center gap-2 rounded-xl border border-[#ffbd4a]/30 px-4 py-3 text-sm font-semibold text-[#ffbd4a]"><Check size={16} /> Rate service</Link>}</div></div></main>;
}
