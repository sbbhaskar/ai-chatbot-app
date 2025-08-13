import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';

const app = express();

// Security & middleware
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';
app.use(cors({ origin: CLIENT_ORIGIN }));

// Basic rate limiting (tune for production)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30, // 30 requests/min/IP
});
app.use('/api/', limiter);

// OpenAI client (API key stays on the server)
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Missing OPENAI_API_KEY in environment');
  process.exit(1);
}
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages[] is required' });
    }

    // Call OpenAI Chat Completions
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      '…(no response)';

    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err?.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to get response from AI',
      details: err?.response?.data || undefined
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
