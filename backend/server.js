const express = require("express");
const cors = require("cors");
const jkt48Api = require("@jkt48/core"); // Import tanpa destructuring

const app = express();
const PORT = 3001;
const apiKey = "J-D55B"; // Gunakan API key dari dokumentasi

app.use(cors());

app.get("/api/theater", async (req, res) => {
  try {
    const theater = await jkt48Api.theater(apiKey); // Ambil data teater
    res.json(theater);
  } catch (error) {
    console.error("Gagal mengambil data teater:", error);
    res.status(500).json({ error: "Gagal ambil data dari API JKT48" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
