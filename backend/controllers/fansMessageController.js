const db = require("../config/db");

exports.getMessages = (req, res) => {
  db.query("SELECT * FROM fans_messages ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.postMessage = (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: "Name and message required" });

  db.query("INSERT INTO fans_messages (name, message) VALUES (?, ?)", [name, message], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
};

exports.deleteMessage = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM fans_messages WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
};
