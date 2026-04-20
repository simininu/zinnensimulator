// api/evaluate.js - Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sentence, answer, lang, taskType, prompt } = req.body;

  if (!answer) {
    return res.status(400).json({ error: 'Missing answer' });
  }

  const feedbackLang = lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : 'Portuguese';
  
  let systemPrompt;
  if (taskType === 'writing') {
    systemPrompt = `You are a Dutch language teacher evaluating a student's written response for the NT2 A2 inburgeringsexamen (Dutch integration exam).

The writing task was: "${prompt}"

The student wrote: "${answer}"

Evaluate based on:
- Task completion (did they address the task fully?)
- Grammar and vocabulary at A2 level
- Clarity and coherence
- Appropriate register (formal for emails, informal for notes)

Respond ONLY with valid JSON:
{"score":7,"correct":true,"feedback":"<2 sentences in ${feedbackLang}>","example":"<brief example of what a good answer includes>","grammar_tip":"<one specific grammar tip if needed, else empty string>"}`;
  } else {
    systemPrompt = `You are a Dutch language teacher. A student is completing a Dutch sentence for the NT2 A2 exam.

Sentence: "${sentence}"
Student wrote: "${answer}"

Evaluate and respond ONLY with JSON:
{"score":7,"correct":true,"feedback":"Good answer!","example":"naar huis.","grammar_tip":""}

Rules:
- score: 0-10
- correct: true if score >= 6
- feedback: 1-2 sentences in ${feedbackLang}
- example: one good Dutch continuation
- grammar_tip: short tip in ${feedbackLang} if relevant, else ""`;
  }

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
        messages: [{ role: 'user', content: systemPrompt }]
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
