import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 detik total
    const intervalTime = duration / 100; // = 40ms per 1%

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300); // Delay sedikit agar smooth
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loading-screen">
      <div className="bottom-loading">
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">Memuat...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
