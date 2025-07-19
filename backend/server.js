const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  theater,
  theaterDetail,
  liveShowroom,
  liveIdn,
  members: getAllMembers,
} = require("@jkt48/core");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.JKT48_API_KEY || "NK-SUJ1";
const NAYLA_ID = "65ce68ed1dd7aa2c8c0ca780";

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json());

const adminPesanRoutes = require("./routes/adminPesan");
const vcScheduleRoutes = require("./routes/vcScheduleRoutes");
const authRoutes = require("./routes/authRoutes");
const galleryRoutes = require('./routes/gallery');
const newsRoutes = require('./routes/news');
const aboutNaylaRoute = require('./routes/aboutNayla');
const miniProfileRoutes = require("./routes/miniProfile");
const tentangKamiRoute = require("./routes/tentangKami");
const teaterRoutes = require('./routes/teater');
const exportRoute = require('./routes/export');

app.use("/api/vc-schedule", vcScheduleRoutes);
app.use("/api/admin-pesan", adminPesanRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/about-nayla', aboutNaylaRoute);
app.use("/api/mini-profile", miniProfileRoutes);
app.use("/api/tentang-kami", tentangKamiRoute);
app.use('/api/teater', teaterRoutes);
app.use('/api', exportRoute);

app.get("/api/member/nayla", async (req, res) => {
  try {
    const allMembers = await getAllMembers(apiKey);
    const nayla = allMembers.find(m => m._id === NAYLA_ID);

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
    const result = await theater(apiKey);
    const shows = result.theater || [];

    const details = await Promise.all(
      shows.map(show => theaterDetail(show.id, apiKey).catch(() => null))
    );

    const filtered = [];

    const today = new Date();
    const twoWeeksAhead = new Date();
    twoWeeksAhead.setDate(today.getDate() + 7);

    for (const detail of details) {
      const showDetail = detail?.shows?.[0];
      if (!showDetail) continue;

      const showDate = new Date(showDetail.date);
      const isUpcoming = showDate >= today && showDate <= twoWeeksAhead;

      const adaNayla = showDetail.members?.some(
        m => m.url_key?.toLowerCase() === "nayla"
      );

      if (isUpcoming && adaNayla) {
        filtered.push({
          id: showDetail.id,
          title: showDetail.title,
          date: showDetail.date,
          url: showDetail.url,
          members: showDetail.members,
          seitansai: showDetail.seitansai || [],
        });
      }
    }

    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(filtered);

  } catch (error) {
    console.error("❌ Gagal ambil jadwal Nayla:", error.message);
    res.status(500).json({ error: "Gagal ambil jadwal Nayla" });
  }
});

app.get("/api/nayla/showroom", async (req, res) => {
  try {
    const liveSR = await liveShowroom(apiKey);
    const naylaSR = liveSR.find(live => live.member_id === NAYLA_ID);

    if (!naylaSR) {
      return res.status(404).json({ error: "Showroom Nayla tidak ditemukan atau tidak sedang live" });
    }

    res.json(naylaSR);
  } catch (error) {
    console.error("❌ Gagal ambil data Showroom Nayla:", error.message);
    res.status(500).json({ error: "Gagal ambil data Showroom Nayla" });
  }
});

app.get("/api/nayla/idnlive", async (req, res) => {
  try {
    const idnLive = await liveIdn(apiKey);

    const naylaLives = idnLive.filter(item =>
      item?.creator?.username === "jkt48_nayla"
    );

    if (!naylaLives.length) {
      return res.status(404).json({ error: "IDN Live Nayla tidak ditemukan atau tidak sedang live" });
    }

    const sorted = naylaLives.sort((a, b) =>
      new Date(b.live_at) - new Date(a.live_at)
    );

    const latestLive = sorted[0];
    res.json(latestLive);

  } catch (error) {
    console.error("❌ Gagal ambil data IDN Live Nayla:", error.message);
    res.status(500).json({ error: "Gagal ambil data IDN Live Nayla" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
