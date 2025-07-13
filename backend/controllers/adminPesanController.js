const db = require("../config/db");

exports.getReviews = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM vc_reviews ORDER BY id DESC");
    res.json(result);
  } catch (err) {
    console.error("❌ Gagal ambil review:", err);
    res.status(500).json({ error: "Gagal ambil review dari database" });
  }
};

exports.createReview = async (req, res) => {
  const { bulan, nama, review } = req.body;

  if (!bulan || !nama || !review) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  try {
    await db.query(
      "INSERT INTO vc_reviews (bulan, nama, review) VALUES (?, ?, ?)",
      [bulan, nama, review]
    );
    res.json({ message: "Review berhasil ditambahkan" });
  } catch (err) {
    console.error("❌ Gagal tambah review:", err);
    res.status(500).json({ error: "Gagal tambah review ke database" });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM vc_reviews WHERE id = ?", [id]);
    res.json({ message: "Review berhasil dihapus" });
  } catch (err) {
    console.error("❌ Gagal hapus review:", err);
    res.status(500).json({ error: "Gagal hapus review dari database" });
  }
};
