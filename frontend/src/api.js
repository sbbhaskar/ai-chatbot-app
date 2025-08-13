// Adjust BASE_URL when deploying the backend
export const BASE_URL = 'http://localhost:5000';

export async function sendChat(messages) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Request failed');
  }
  return res.json(); // { reply }
}
