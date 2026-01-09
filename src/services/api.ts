export async function fetchJSON<T = any>(url: string, cache = true): Promise<T> {
  const cacheKey = `api_cache:${url}`;
  if (cache && typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached) as T;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const data = (await res.json()) as T;
  if (cache && typeof window !== 'undefined') sessionStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
}

export async function postJSON<T = any>(url: string, body: any): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Failed to POST ${url}: ${res.status}`);
  return (await res.json()) as T;
}
