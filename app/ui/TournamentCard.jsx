// "use client";

// import RegisterButton from "./RegisterButton";

// export default function TournamentCard({ tournament, showRegister }) {
//     return (
//         <div>
//             <h2>{tournament.title}</h2>
//             <p><strong>Date:</strong> {tournament.date}</p>
//             <p><strong>Location:</strong> {tournament.location}</p>
//             <p><strong>Available Spots:</strong> {tournament.spots}</p>

//             {showRegister && (
//                 <RegisterButton tournamentId={tournament.id} />
//             )}

//         </div>
//     );
// }


"use client";

import RegisterButton from "./RegisterButton";

export default function TournamentCard({ tournament, showRegister, onUpdateSpots }) {
  return (
    <div className="card" >
      <h2>{tournament.title}</h2>
      <p><strong>Date:</strong> {tournament.date}</p>
      <p><strong>Location:</strong> {tournament.location}</p>
      <p><strong>Available Spots:</strong> {tournament.spots}</p>

      {showRegister && (
        <RegisterButton
          tournamentId={tournament.id}
          onUpdateSpots={onUpdateSpots}
          className="primary"
          
        />
      )}
    </div>
  );
}
