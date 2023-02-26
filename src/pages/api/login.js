export default async function handler(req, res) {
  try {
    const baseToken = Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ":" + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')
    const result = await fetch("https://login.meteomatics.com/api/v1/token", {
      method: 'GET',
      headers: { 
        'Authorization': `Basic ${baseToken}`,
        'Content-Type': 'application/json',
      },
    });
    const { access_token } = await result.json();
    return res.status(200).json({ access_token })
  } catch (error) {
    return res.status(500).json({ success: false })
  }
}