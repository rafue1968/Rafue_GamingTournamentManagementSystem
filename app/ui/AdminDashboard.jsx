"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase" //"lib/firebase.js";
import { deleteTournamentById } from "../actions/deleteTournament";
import { updateTournamentById } from "../actions/updateTournamentById";
import { searchTournaments } from "../actions/searchTournaments";
import SearchForm from "./SearchForm";
import EditTournamentForm from "./EditTournamentForm";

export default function AdminDashboard() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // const fetchTournaments = async () => {
    //   const snapshot = await getDocs(collection(db, "tournaments"));
    //   const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setTournaments(data);
    // };
    // fetchTournaments();

    const unsubscribe = onSnapshot(collection(db, "tournaments"), (snapshot) => {
      const tourData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTournaments(tourData);
      // setFiltered(tourData);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async (criteria) => {
    try {
      const results = await searchTournaments(criteria);

      if (results.length === 0) {
        setSelectedTournament(null);
        setError("No tournaments found.");
      } else {
        setSelectedTournament(results[0]); // or let user pick from dropdown
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Search failed.");
    }
  };

  const handleUpdate = async (updated) => {
    await updateTournamentById(updated.id, updated);
    // setTournaments(prev =>
    //   prev.map(t => (t.id === updated.id ? updated : t))
    // );
    setSelectedTournament(null);
  };

  const handleDelete = async (id) => {
    await deleteTournamentById(id);
    setTournaments(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="">
      <h1>Admin: Edit Tournament</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedTournament && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
          <EditTournamentForm tournament={selectedTournament} onSave={handleUpdate} onCancel={() => setSelectedTournament(null)} />
        </div>
      )}

      <h2>All Tournaments</h2>
      {tournaments.map(t => (
        <div className="card" key={t.id} style={{ marginBottom: "1rem" }}>
          <div><strong>{t.title}</strong></div>
          <div>{t.date}</div>
          <div>{t.location}</div>
          <div><em><strong>Spots: </strong>{t.spots}</em></div>
          {/* <br /> */}
          <button onClick={() => setSelectedTournament(t)}>Edit</button>
          <button onClick={() => handleDelete(t.id)} style={{ marginLeft: "0.5rem" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
