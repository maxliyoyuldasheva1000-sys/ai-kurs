import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("AI server ishlayapti");
});

app.post("/chat", async (req, res) => {
  try {
    const savol = req.body.savol;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sen IT savodxonligi bo‘yicha yordamchisan" },
        { role: "user", content: savol }
      ]
    });

    res.json({ javob: response.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 10000);
