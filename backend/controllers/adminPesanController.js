const db = require("../config/db");
const xlsx = require("xlsx");
const path = require("path");

exports.importReviewFromExcel = (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "File Excel tidak ditemukan" });

    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const bulan = "Juli 2025";

    const values = data.map(row => [
      bulan,
      row["NAMA"] || "",
      row["FEEDBACK / REVIEW"] || "",
      row["RATING"] || ""
    ]);

    if (values.length === 0) {
      return res.status(400).json({ error: "Tidak ada data valid pada file" });
    }

    const sql = "INSERT INTO vc_reviews (bulan, nama, review, rating) VALUES ?";
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("❌ Gagal import ke database:", err);
        return res.status(500).json({ error: "Gagal menyimpan data ke database" });
      }

      res.json({ message: `${result.affectedRows} review berhasil diimport.` });
    });
  } catch (error) {
    console.error("❌ Gagal proses file Excel:", error);
    res.status(500).json({ error: "Gagal memproses file Excel" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM vc_reviews ORDER BY id ASC");
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

exports.getMessages = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM fans_messages ORDER BY id DESC");
    res.json(result);
  } catch (err) {
    console.error("❌ Gagal ambil pesan fans:", err);
    res.status(500).json({ error: "Gagal ambil pesan fans dari database" });
  }
};

exports.approveMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("UPDATE fans_messages SET is_approved = 1 WHERE id = ?", [id]);
    res.json({ message: "Pesan fans disetujui" });
  } catch (err) {
    console.error("❌ Gagal setujui pesan fans:", err);
    res.status(500).json({ error: "Gagal menyetujui pesan fans" });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM fans_messages WHERE id = ?", [id]);
    res.json({ message: "Pesan fans dihapus" });
  } catch (err) {
    console.error("❌ Gagal hapus pesan fans:", err);
    res.status(500).json({ error: "Gagal hapus pesan fans" });
  }
};

exports.createMessage = async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Nama dan pesan tidak boleh kosong" });
  }

  try {
    await db.query("INSERT INTO fans_messages (name, message) VALUES (?, ?)", [name, message]);
    res.json({ message: "Pesan fans berhasil disimpan" });
  } catch (err) {
    console.error("❌ Gagal simpan pesan fans:", err);
    res.status(500).json({ error: "Gagal simpan pesan fans ke database" });
  }
};
