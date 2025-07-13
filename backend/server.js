const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jkt48Api = require("@jkt48/core");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.JKT48_API_KEY || "NK-SUJ1";

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json());

const adminPesanRoutes = require("./routes/adminPesan");
const vcScheduleRoutes = require("./routes/vcScheduleRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/vc-schedule", vcScheduleRoutes);
app.use("/api/admin-pesan", adminPesanRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/member/nayla", async (req, res) => {
  try {
    const members = await jkt48Api.members(apiKey);
    const nayla = members.find(m => m._id === "65ce68ed1dd7aa2c8c0ca780");

    if (!nayla) {
      return res.status(404).json({ error: "Data Nayla tidak ditemukan" });
    }

    res.json(nayla);
  } catch (error) {
    console.error("❌ Gagal mengambil data Nayla:", error.message);
    res.status(500).json({ error: "Gagal ambil data Nayla dari API JKT48" });
  }
});

app.get("/api/nayla/schedule", async (req, res) => {
  try {
    const result = await jkt48Api.theater(apiKey);
    const theater = Array.isArray(result) ? result : result?.data || [];

    const naylaSchedule = theater.filter(item =>
      item.members?.some(member =>
        member.toLowerCase().includes("nayla")
      )
    );

    res.json(naylaSchedule);
  } catch (error) {
    console.error("❌ Gagal ambil jadwal Nayla:", error.message);
    res.status(500).json({ error: "Gagal ambil jadwal Nayla" });
  }
});

app.get("/api/nayla/showroom", async (req, res) => {
  try {
    const liveShowroom = await jkt48Api.liveShowroom(apiKey);
    const naylaShowroom = liveShowroom.find(live => live.member_id === "65ce68ed1dd7aa2c8c0ca780");

    if (!naylaShowroom) {
      return res.status(404).json({ error: "Showroom Nayla tidak ditemukan atau tidak sedang live" });
    }

    res.json(naylaShowroom);
  } catch (error) {
    console.error("❌ Gagal ambil data Showroom Nayla:", error.message);
    res.status(500).json({ error: "Gagal ambil data Showroom Nayla" });
  }
});

app.get("/api/nayla/idnlive", async (req, res) => {
  try {
    const idnLive = await jkt48Api.liveIdn(apiKey);
    const naylaIDN = idnLive.find(live => live.member_id === "65ce68ed1dd7aa2c8c0ca780");

    if (!naylaIDN) {
      return res.status(404).json({ error: "IDN Live Nayla tidak ditemukan atau tidak sedang live" });
    }

    res.json(naylaIDN);
  } catch (error) {
    console.error("❌ Gagal ambil data IDN Live Nayla:", error.message);
    res.status(500).json({ error: "Gagal ambil data IDN Live Nayla" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
