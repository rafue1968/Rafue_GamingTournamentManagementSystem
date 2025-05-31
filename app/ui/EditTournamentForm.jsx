"use client";
import { useState } from "react";
import { updateTournamentById } from "../actions/updateTournamentById";

export default function EditTournamentForm({ tournament, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: tournament.title,
    date: tournament.date,
    location: tournament.location,
    spots: tournament.spots,
    latitude: tournament.latitude,
    longitude: tournament.longitude
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await updateTournamentById(tournament.id, form);
    // onSave({...form, id: tournament.id});

    const updatedTournament = {
      ...tournament,
      title: form.title,
      date: form.date,
      location: form.location,
      spots: parseInt(form.spots),
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
    };
    await onSave(updatedTournament);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 style={{marginBottom: "1rem"}}>Edit Tournament</h3>
      <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
        <label>Title:</label><input name="title" value={form.title} onChange={handleChange} />
        <label>Date:</label><input name="date" value={form.date} onChange={handleChange} />
        <label>Location:</label><input name="location" value={form.location} onChange={handleChange} />
        <label>Available Spots:</label><input name="spots" type="number" value={form.spots} onChange={handleChange} />
        <label>Latitude:</label><input name="latitude" type="number" step="any" value={form.latitude} onChange={handleChange} />
        <label>Longitude:</label><input name="longitude" type="number" step="any" value={form.longitude} onChange={handleChange} />
        
        <button className="primary" type="submit">Save Changes</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel">Cancel</button>
        )}
      </div>
    </form>
  );
}
