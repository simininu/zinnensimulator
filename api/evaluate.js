// api/evaluate.js - Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sentence, answer, lang } = req.body;

  if (!sentence || !answer) {
    return res.status(400).json({ error: 'Missing sentence or answer' });
  }

  const feedbackLang = lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : 'Portuguese';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: `You are a Dutch language teacher. A student is completing a Dutch sentence for the NT2 A2 exam.

Sentence: "${sentence}"
Student wrote: "${answer}"

Evaluate and respond ONLY with JSON:
{"score":7,"correct":true,"feedback":"Good answer!","example":"naar huis.","grammar_tip":""}

Rules:
- score: 0-10
- correct: true if score >= 6
- feedback: 1-2 sentences in ${feedbackLang}
- example: one good Dutch continuation
- grammar_tip: short tip in ${feedbackLang} if relevant, else ""`
        }]
      })
    });

    const data = await response.json();
    const text = data.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    const result = JSON.parse(jsonMatch[0]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
