"use client";
import { useState } from "react";
import SearchForm from "./SearchForm";
import AdminTournamentCard from "./AdminTournamentCard";
import { searchTournaments } from "../actions/searchTournaments";

export default function AdminTournamentList({ initialTournaments }) {
  const [tournaments, setTournaments] = useState(initialTournaments);

  const handleSearch = async (filters) => {
    const results = await searchTournaments(filters);
    setTournaments(results);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {tournaments.map(t => (
        <AdminTournamentCard key={t.id} tournament={t} />
      ))}
    </div>
  );
}
