export async function fetcher(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  const data = await res.json();
  return data;
}
