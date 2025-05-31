"use client";
import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ title, date, location, latitude, longitude });
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
      <input type="text" placeholder="Game Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      <input type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}
