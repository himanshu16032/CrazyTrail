const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export async function submitForm(data) {
  if (!SCRIPT_URL) {
    await new Promise(r => setTimeout(r, 2000));
    return { status: 'success', message: 'Demo mode - no Google Script URL configured' };
  }

  const payload = JSON.stringify({
    timestamp: new Date().toISOString(),
    platform: data.platform,
    email: data.email,
    topics: data.topics,
    channelLink: data.channelLink || '',
    month: data.month,
  });

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: payload,
  });

  return { status: 'success' };
}
