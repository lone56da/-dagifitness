// server.js
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public"));   // Serve index.html, css, js from /public
app.use(express.json());             // Parse JSON request bodies

// Coaches API (example)
app.get("/api/coaches", (req, res) => {
  res.json([
    { name: "Coach Daniel", background: "Certified in Strength Training", experience: 5 },
    { name: "Coach Sarah", background: "Nutrition Expert & Bodybuilding", experience: 7 },
    { name: "Coach Mike", background: "CrossFit Level 2 Trainer", experience: 6 },
  ]);
});

// Contact API (accepts form submissions)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter (Gmail example)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lonestorecompany@gmail.com",   // your Gmail
      pass: "your-app-password"             // Gmail App Password (not your normal password)
    }
  });

  try {
    await transporter.sendMail({
      from: email,  // sender (user’s email)
      to: "lonestorecompany@gmail.com", // your inbox
      subject: `Message from ${name}`,
      text: message
    });

    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});