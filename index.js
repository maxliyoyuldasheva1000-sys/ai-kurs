import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Tekshirish uchun
app.get("/", (req, res) => {
  res.send("AI server ishlayapti ✅");
});

// AI chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const savol = req.body.savol;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ✅ MANA SHU JOY TO‘G‘RILANDI
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sen IT savodxonligi bo‘yicha o‘zbek tilida tushuntiradigan yordamchisan"
          },
          {
            role: "user",
            content: savol
          }
        ]
      })
    });

    const data = await response.json();
    res.json({ javob: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server ishlayapti, port:", PORT);
});
