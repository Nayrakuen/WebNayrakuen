import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NayArt.css";

const API_KEY = "AIzaSyAqDY86j9WjLohe6X0YyYe1zPJjCrmBfpg";
const FOLDER_ID = "1OviHG3paiJSGQEochiVp53UOB1pYLbUg";

function NayArt() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)&includeItemsFromAllDrives=true&supportsAllDrives=true`
        );

        const data = await res.json();
        console.log("📦 RESPON API:", data);

        if (!data.files || !Array.isArray(data.files)) {
          console.warn("⚠️ Struktur data tidak sesuai.");
          setImages([]);
          return;
        }

        const imageFiles = data.files.filter((file) =>
          file.mimeType && file.mimeType.startsWith("image/")
        );

        const imageUrls = imageFiles.map((file) => ({
          id: file.id,
          name: file.name,
          url: `https://drive.google.com/uc?export=view&id=${file.id}`,
        }));

        setImages(imageUrls);
      } catch (error) {
        console.error("❌ Gagal mengambil gambar dari Google Drive:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="nayart-section py-5">
      <div className="nayart-container">
        <div className="section-header mb-4 text-center">
          <h2 className="nayart-title">#NaylArt Gallery</h2>
          <p className="nayart-subtitle">
            Kumpulan karya kreatif dari para penggemar Nayla Suji.
          </p>
        </div>

        {loading ? (
          <p className="text-center">Sedang memuat gambar...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-muted">
            Tidak ada gambar untuk ditampilkan.
          </p>
        ) : (
          <div className="masonry">
            {images.map((img, index) => (
              <img
                key={img.id}
                src={img.url}
                alt={img.name || `Art ${index + 1}`}
                className="masonry-img"
                data-aos="fade-up"
                onError={(e) => {
                  console.warn(`❌ Gambar gagal dimuat: ${img.url}`);
                  e.target.style.display = "none";
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NayArt;
