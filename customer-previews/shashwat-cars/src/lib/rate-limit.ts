const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, max = 6, windowMs = 60_000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  current.count += 1;
  buckets.set(key, current);
  return { ok: current.count <= max, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
}
