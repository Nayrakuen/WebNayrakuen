const db = require("../config/db");

exports.getSchedule = (req, res) => {
  const query = "SELECT * FROM video_call_schedule ORDER BY sesi ASC";

  db.query(query, (err, result) => {
    if (err) {
      console.error("❌ Error ambil data jadwal VC:", err);
      return res.status(500).json({ error: "Gagal ambil data dari database" });
    }
    res.json(result);
  });
};

exports.createSchedule = (req, res) => {
  const { sesi, nama, preparation, masuk, status } = req.body;

  if (!sesi || !nama || !preparation || !masuk || !status) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  const sql = "INSERT INTO video_call_schedule (sesi, nama, preparation, masuk, status) VALUES (?, ?, ?, ?, ?)";
  const values = [sesi, nama, preparation, masuk, status];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Jadwal berhasil ditambahkan" });
  });
};

exports.deleteSchedule = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM video_call_schedule WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Jadwal berhasil dihapus" });
  });
};

exports.updateSchedule = (req, res) => {
  const { id } = req.params;
  const { sesi, nama, preparation, masuk, status } = req.body;

  db.query(
    'UPDATE video_call_schedule SET sesi = ?, nama = ?, preparation = ?, masuk = ?, status = ? WHERE id = ?',
    [sesi, nama, preparation, masuk, status, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Jadwal diperbarui' });
    }
  );
};
