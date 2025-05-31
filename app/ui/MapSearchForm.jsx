"use client";
import { useState } from "react";

export default function MapSearchForm({ onPan }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPan({ title, location });
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display:"flex", gap: "1rem", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Game Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Pan to Tournament</button>
    </form>
  );
}
