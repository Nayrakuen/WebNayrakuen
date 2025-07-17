import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MiniProfile.css";

function MiniProfile() {
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    fetchMiniProfile();
  }, []);

  const fetchMiniProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mini-profile");
      const formattedContent = (res.data.content || "").replace(/\\n/g, "\n");
      setContent(formattedContent);
      setUpdatedContent(formattedContent);
    } catch (err) {
      console.error("Error fetching mini profile:", err);
    }
  };

  const saveContent = async () => {
    try {
      const contentToSave = updatedContent.replace(/\n/g, "\\n");
      await axios.put("http://localhost:5000/api/mini-profile", {
        content: contentToSave,
      });
      setContent(updatedContent);
      setEditMode(false);
    } catch (err) {
      console.error("Error saving mini profile:", err);
    }
  };

  return (
    <div className="mini-profile-container">
      <h2>Mini Profile</h2>
      {editMode ? (
        <>
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            rows={10}
            placeholder="Tulis mini profile di sini..."
          />
          <button onClick={saveContent}>Simpan</button>
          <button onClick={() => setEditMode(false)}>Batal</button>
        </>
      ) : (
        <>
          <p style={{ whiteSpace: "pre-line" }}>{content}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default MiniProfile;
