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
      console.warn('Notification API call failed');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Failed to send notification:', error);
    return { success: false, error };
  }
}
