"use client";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase" //"lib/firebase.js";
import { getUserRegistrations } from "../actions/getUserRegistrations";
import { cancelTournamentRegistration } from "../actions/cancelTournamentRegistration";

export default function RegistrationHistory() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            const data = await getUserRegistrations(user.uid);
            setRegistrations(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching registrations:", err);
            setLoading(false);
        }
    }
  };

  const handleCancel = async (tournamentId) => {
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in");

    try {
      await cancelTournamentRegistration({ tournamentId, userId: user.uid });
      alert("Registration cancelled.");
      fetchHistory();
    } catch (err) {
      alert("Failed to cancel: " + err.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <p>Loading your registrations...</p>;
  if (registrations.length === 0) return <p>You have no tournament registrations.</p>;

  return (
    <div>
      <h2>Your Registration History</h2>
      {registrations.map((reg) => (
        <div
          key={reg.id}
          className="card"
        >
          <h3>{reg.tournament?.title || "Unknown Tournament"}</h3>
          <p><strong>Date:</strong> {reg.tournament?.date}</p>
          <p><strong>Location:</strong> {reg.tournament?.location}</p>
          <p><strong>Status:</strong> {reg.status}</p>
          <p><strong>Spots Booked:</strong> {reg.spotsBooked}</p>
          {reg.registeredAt && (
            <p>
              <strong>Registered on:</strong>{" "}
              {new Date(reg.registeredAt).toLocaleDateString()}
            </p>
          )}
          <button onClick={() => handleCancel(reg.tournamentId)}>
            Cancel Registration
          </button>
        </div>
      ))}
    </div>
  );
}
