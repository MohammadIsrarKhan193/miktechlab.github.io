
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message || '';
    // system prompt defines MÎK AI personality
    const systemPrompt = `You are "MÎK AI", a polite helpful assistant representing MoHaMmaD IsRaR KhAn. Be helpful, short and friendly.`;
    const payload = {
      model: "gpt-4o-mini", // or "gpt-4o" / "gpt-4" depending on access; change if unavailable
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 700
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I can't answer right now.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('Server running on', port));
