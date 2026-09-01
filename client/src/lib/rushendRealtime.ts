import { createClient, type RealtimeChannel, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } }) : null;

export type QueueRealtimeEvent = "token_joined" | "token_called" | "token_served" | "token_skipped" | "priority_changed" | "token_left";

export function subscribeToQueue(queueId: string, onEvent: (event: QueueRealtimeEvent, payload: unknown) => void) {
  if (!supabase) return () => undefined;
  const channel = supabase.channel(`queue:${queueId}`);
  const events: QueueRealtimeEvent[] = ["token_joined", "token_called", "token_served", "token_skipped", "priority_changed", "token_left"];
  events.forEach((event) => channel.on("broadcast", { event }, ({ payload }) => onEvent(event, payload)));
  channel.subscribe();
  return () => { void supabase.removeChannel(channel); };
}

export function subscribeToBusiness(businessId: string, onEvent: (event: "token_called", payload: unknown) => void) {
  if (!supabase) return () => undefined;
  const channel: RealtimeChannel = supabase.channel(`business:${businessId}`);
  channel.on("broadcast", { event: "token_called" }, ({ payload }) => onEvent("token_called", payload));
  channel.subscribe();
  return () => { void supabase.removeChannel(channel); };
}
