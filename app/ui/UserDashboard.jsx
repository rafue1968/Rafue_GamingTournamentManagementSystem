"use client";

import { useEffect, useState } from "react";
import { auth, db } from "lib/firebase.js";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

export default function UserDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTournaments = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const regQuery = query(
        collection(db, "tournament_registrations"),
        where("userId", "==", user.uid)
      );
      const regSnapshot = await getDocs(regQuery);

      const tournaments = await Promise.all(
        regSnapshot.docs.map(async (docSnap) => {
          const regData = docSnap.data();
          const tourRef = doc(db, "tournaments", regData.tournamentId);
          const tourSnap = await getDoc(tourRef);
          return {
            id: tourRef.id,
            ...tourSnap.data(),
            status: regData.status,
          };
        })
      );

      setRegistrations(tournaments);
      setLoading(false);
    };

    fetchUserTournaments();
  }, []);

  if (loading) return <p>Loading your tournaments...</p>;

  return (
    <div>
      <h2>Your Registered Tournaments</h2>
      {registrations.length === 0 ? (
        <p>You haven't registered for any tournaments yet.</p>
      ) : (
        <ul>
          {registrations.map((tour) => (
            <li key={tour.id}>
              <strong>{tour.title}</strong> <br />
              Date: {tour.date} <br />
              Location: {tour.location} <br />
              Status: {tour.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
