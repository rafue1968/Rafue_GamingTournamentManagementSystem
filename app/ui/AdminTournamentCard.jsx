"use client";
import { useState } from "react";
import { deleteTournamentById } from "../actions/deleteTournament";
import EditTournamentForm from "./EditTournamentForm";

export default function AdminTournamentCard({ tournament }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await deleteTournamentById(tournament.id);
      alert("Tournament deleted.");
      window.location.reload(); // Refresh to update UI
    } catch (err) {
      setError("Failed to delete: " + err.message);
    }
  };

  return (
    <div className="admin-card">
      {editing ? (
        <EditTournamentForm
          tournament={tournament}
          onDone={() => setEditing(false)}
        />
      ) : (
        <>
          <h3>{tournament.title}</h3>
          <p>{tournament.date}</p>
          <p>{tournament.location}</p>
          <p>Spots: {tournament.spots}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Cancel Tournament</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
}
