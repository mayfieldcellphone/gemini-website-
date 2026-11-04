export async function sendSMSNotification(type: 'booking' | 'quote' | 'corporate' | 'voice_message', data: any) {
  try {
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });
    
    if (!response.ok) {
      console.warn('Notification API call failed, trying /api/leads fallback');
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      }).catch(() => {});
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Failed to send notification via /api/notify, trying /api/leads fallback:', error);
    try {
      const fallbackRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      });
      return await fallbackRes.json();
    } catch (fallbackError) {
      return { success: false, error };
    }
  }
}
