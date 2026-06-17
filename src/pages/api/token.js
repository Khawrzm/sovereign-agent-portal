export default async function handler(req, res) {
  const secret = process.env.DIRECT_LINE_SECRET;
  
  if (!secret) {
    return res.status(500).json({ error: 'Direct Line Secret is not configured on the server.' });
  }

  try {
    const response = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secret}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(response.status).json({ error: 'Failed to generate token', details: errorData });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
