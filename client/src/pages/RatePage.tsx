import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Star } from "lucide-react";
import { rushendApi } from "@/lib/rushendApi";

export default function RatePage({ params }: { params: { id: string } }) {
  const [, navigate] = useLocation();
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const submit = async () => { setBusy(true); setError(null); try { const token = await rushendApi.token(params.id); await rushendApi.rate({ business_id: token.queue.business_id || "", token_id: params.id, stars, comment: comment || undefined }); setDone(true); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to submit rating"); } finally { setBusy(false); } };
  return <main className="min-h-screen bg-[#120c12] px-5 py-10 text-[#f3f3e8] sm:px-10"><div className="mx-auto max-w-xl"><Link href={`/status/${params.id}`} className="inline-flex items-center gap-2 text-sm text-[#9ba89d]"><ArrowLeft size={15} /> Back to status</Link><section className="mt-10 rounded-3xl border border-white/[.10] bg-[#1d111b] p-7 sm:p-10">{done ? <><p className="eyebrow">Thank you</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.06em]">Your signal helps<br /><span className="text-[#ffbd4a]">the next person.</span></h1><button onClick={() => navigate("/")} className="mt-8 rounded-xl bg-[#ff8a2b] px-4 py-3 text-sm font-bold text-[#160b05]">Back to map</button></> : <><p className="eyebrow">After your visit</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.06em]">How was the<br /><span className="text-[#ffbd4a]">wait?</span></h1><div className="mt-8 flex gap-2">{[1, 2, 3, 4, 5].map(value => <button key={value} onClick={() => setStars(value)} aria-label={`${value} stars`}><Star size={30} fill={value <= stars ? "#ffbd4a" : "transparent"} className={value <= stars ? "text-[#ffbd4a]" : "text-[#657268]"} /></button>)}</div><textarea value={comment} onChange={event => setComment(event.target.value)} className="mt-7 min-h-28 w-full rounded-2xl border border-white/[.10] bg-[#120c12] p-4 text-sm outline-none" placeholder="Optional: what should people know?" />{error && <p className="mt-3 rounded-xl border border-[#d85a30]/30 bg-[#d85a30]/10 px-3 py-2 text-xs text-[#ff9c7b]">{error}</p>}<button disabled={busy} onClick={submit} className="mt-5 rounded-xl bg-[#ff8a2b] px-4 py-3 text-sm font-bold text-[#160b05]">{busy ? "Sending…" : "Submit rating"}</button></>}</section></div></main>;
}
