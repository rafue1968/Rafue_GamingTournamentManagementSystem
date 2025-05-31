"use client";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import TournamentCard from "./TournamentCard";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase" //"lib/firebase.js";
import { searchTournaments } from "../actions/searchTournaments" //"app/actions/searchTournaments";

export default function TournamentList({ initialTournaments }) {
  const [tournaments, setTournaments] = useState(initialTournaments || []);

  
  useEffect(() => {
    // if (!initialTournaments?.length) {
    //   const fetchTournaments = async () => {
    //     const querySnapshot = await getDocs(collection(db, "tournaments"));
    //     const data = querySnapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setTournaments(data);
    //   };
    //   fetchTournaments();
    // }


    const unsubscribe = onSnapshot(collection(db, "tournaments"), (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setTournaments(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async (filters) => {
    const results = await searchTournaments(filters);
    setTournaments(results);
  };


//   const handleUpdateSpots = (tournamentId, delta) => {
//     setTournaments((prev) =>
//         prev.map((t) =>
//             t.id === tournamentId ? {...t, spots: t.spots + delta} : t
//         )
//     );
//   };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {tournaments.map(t => (
        <TournamentCard 
        key={t.id} 
        tournament={t} 
        showRegister
        />
      ))}
    </div>
  );
}
