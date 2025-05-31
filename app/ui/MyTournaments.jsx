"use client";
import TournamentCard from "./TournamentCard";

export default function MyTournaments({tournaments}){
    if (!tournaments || tournaments.length === 0){
        return <p>You haven't registered for any tournaments yet.</p>
    }

    return (
        <div>
            {tournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
        </div>
    )
}