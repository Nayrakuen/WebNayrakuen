const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM mini_profile ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { content } = req.body;
  try {
    await db.execute(
      "INSERT INTO mini_profile (content) VALUES (?)",
      [content]
    );
    res.status(201).json({ message: "Narasi berhasil ditambahkan." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM mini_profile WHERE id = ?", [id]);
    res.json({ message: "Narasi berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
