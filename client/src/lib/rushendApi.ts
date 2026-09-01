export const RUSHEND_API_URL = (import.meta.env.VITE_RUSHEND_API_URL || "https://rushend-api.onrender.com").replace(/\/$/, "");

export type Session = { access_token: string; refresh_token?: string; expires_in?: number };
export type AuthUser = { id: string; email?: string; full_name?: string; area?: string | null; phone?: string | null; role?: "customer" | "staff"; language_pref?: string; created_at?: string };
export type Business = { id: string; name: string; category: string; address: string; area?: string | null; lat?: number | null; lng?: number | null; qr_code_id?: string; avg_rating?: number | null; total_ratings?: number; is_active?: boolean; counters?: Counter[]; queues?: Queue[] };
export type Counter = { id: string; business_id: string; name: string; identifier?: string | null; is_open: boolean };
export type Queue = { id: string; business_id: string; counter_id?: string | null; service_name: string; service_code?: string | null; avg_service_time_mins: number; is_active?: boolean };
export type Token = { id: string; queue_id: string; customer_id?: string | null; token_number: number; status: "waiting" | "ready" | "called" | "served" | "skipped" | "left"; is_priority: boolean; is_manual_entry?: boolean; predicted_wait_mins?: number | null; actual_wait_mins?: number | null; position_at_join?: number | null; joined_at: string; called_at?: string | null; served_at?: string | null; notes?: string | null };
export type LiveQueue = { queue_id: string; queue_name: string; business_name?: string; waiting_count: number; open_counters: number; counters: Counter[]; avg_wait_mins: number; currently_serving: Array<{ id: string; token_number: number; called_at: string }> };
export type TokenStatus = { token: Token; position: number | null; predicted_wait_mins?: number; queue: { service_name: string; business_name?: string; avg_service_time_mins?: number; business_id?: string } };
export type ApiError = { error?: string; errors?: Array<{ msg?: string; path?: string }>; details?: string };

let accessToken = localStorage.getItem("rushend_access_token");
export const authStore = {
  get token() { return accessToken; },
  set session(session: Session | null) { accessToken = session?.access_token ?? null; if (accessToken) localStorage.setItem("rushend_access_token", accessToken); else localStorage.removeItem("rushend_access_token"); },
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (authStore.token) headers.set("Authorization", `Bearer ${authStore.token}`);
  const response = await fetch(`${RUSHEND_API_URL}${path}`, { ...init, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((payload as ApiError).error || (payload as ApiError).errors?.[0]?.msg || `Request failed (${response.status})`);
  return payload as T;
}

export const rushendApi = {
  signup: (body: { email: string; password: string; full_name: string; role: "customer" | "staff"; area?: string; phone?: string; language_pref?: string }) => request<{ user: AuthUser; session: Session }>("/auth/signup", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) => request<{ user: AuthUser; session: Session }>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request<{ user: AuthUser }>("/auth/me"),
  updateMe: (body: Partial<Pick<AuthUser, "full_name" | "area" | "phone" | "language_pref">>) => request<{ profile: AuthUser }>("/auth/me", { method: "PATCH", body: JSON.stringify(body) }),
  logout: () => request<{ message: string }>("/auth/logout", { method: "POST" }),
  businesses: (params: { area?: string; category?: string; search?: string; limit?: number; offset?: number } = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== undefined && value !== "").map(([key, value]) => [key, String(value)]));
    return request<{ businesses: Business[]; total: number; limit: number; offset: number }>(`/business/?${query}`);
  },
  business: (id: string) => request<Business>(`/business/${id}`),
  joinQueue: (queueId: string, is_priority = false) => request<{ token: Token; position: number; predicted_wait_mins: number }>(`/queue/${queueId}/join`, { method: "POST", body: JSON.stringify({ is_priority }) }),
  liveQueue: (queueId: string) => request<LiveQueue>(`/queue/${queueId}/live`),
  token: (tokenId: string) => request<TokenStatus>(`/token/${tokenId}`),
  leaveToken: (tokenId: string) => request<{ message: string }>(`/token/${tokenId}/leave`, { method: "POST" }),
  shareToken: (tokenId: string) => request<{ share_url: string; share_code: string; expires_at: string }>(`/token/${tokenId}/share`, { method: "POST" }),
  shared: (shareCode: string) => request<TokenStatus & { share_expires_at: string }>(`/shared/${shareCode}`),
  rate: (body: { business_id: string; token_id: string; stars: number; comment?: string }) => request("/rating", { method: "POST", body: JSON.stringify(body) }),
  myRatings: () => request("/rating/my"),
  createBusiness: (body: { name: string; category: string; address: string; area?: string; lat?: number; lng?: number }) => request<{ business: Business; qr_code: { url: string; data_url: string } }>("/business/", { method: "POST", body: JSON.stringify(body) }),
  createCounter: (businessId: string, body: { name: string; identifier?: string }) => request<Counter>(`/business/${businessId}/counter`, { method: "POST", body: JSON.stringify(body) }),
  createQueue: (businessId: string, body: { service_name: string; service_code?: string; avg_service_time_mins?: number; counter_id?: string }) => request<Queue>(`/business/${businessId}/queue`, { method: "POST", body: JSON.stringify(body) }),
  updateCounter: (id: string, body: { is_open?: boolean; name?: string }) => request<Counter>(`/business/counter/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  queueTokens: (queueId: string, status?: string[]) => request<{ tokens: Token[] }>(`/queue/${queueId}/tokens${status?.length ? `?status=${status.join(",")}` : ""}`),
  manualToken: (body: { queue_id: string; full_name?: string; phone?: string; is_priority?: boolean }) => request<{ token: Token; position: number; predicted_wait_mins: number }>("/token/manual", { method: "POST", body: JSON.stringify(body) }),
  priority: (tokenId: string, is_priority: boolean) => request<Token>(`/token/${tokenId}/priority`, { method: "PATCH", body: JSON.stringify({ is_priority }) }),
  callNext: (queueId: string) => request<Token>(`/token/${queueId}/call-next`, { method: "POST" }),
  serve: (tokenId: string) => request<{ token: Token; actual_wait_mins: number }>(`/token/${tokenId}/serve`, { method: "POST" }),
  skip: (tokenId: string) => request<{ token: Token }>(`/token/${tokenId}/skip`, { method: "POST" }),
  analytics: (businessId: string) => request<{ today: string; hourly_buckets: Array<{ hour: number; count: number; avg_queue_length: number }>; peak_hours: number[]; stats: Record<string, number> }>(`/business/${businessId}/analytics`),
};
