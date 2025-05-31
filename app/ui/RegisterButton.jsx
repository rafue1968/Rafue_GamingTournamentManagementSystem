// "use client";

// import { useEffect } from "react";
// const { useState } = require("react");
// import { auth, db } from "firebase.js";
// import { 
//     addDoc, 
//     collection, 
//     getDocs, 
//     query, 
//     where,
//     deleteDoc,
//     runTransaction,
// } from "firebase/firestore";

// export default function RegisterButton({tournamentID}){
//     const [registered, setRegistered] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [regDocId, setRegDocId] = useState(null);
//     // const [spotsLeft, setSpotsLeft] = useState(availableSpots);

//     useEffect(() => {
//         const checkRegistration = async () => {
//           const user = auth.currentUser;
//           if (!user) return;
    
//           const q = query(
//             collection(db, "tournament_registrations"),
//             where("userId", "==", user.uid),
//             where("tournamentId", "==", tournamentID)
//           );
    
//           const snapshot = await getDocs(q);
//           if (!snapshot.empty) {
//             const docSnap = snapshot.docs[0];
//             setRegistered(true);
//             setRegDocId(docSnap.id);
//           }
//           setLoading(false);
//         };
    
//         checkRegistration();
//     }, [tournamentID]);

//     const updateSpots = async (incrementBy) => {
//         const tourRef = doc(db, "tournaments", tournamentID);
//         await runTransaction(db, async (transaction) => {
//           const tourDoc = await transaction.get(tourRef);
//           if (!tourDoc.exists()) throw "Tournament does not exist!";
//           const currentSpots = tourDoc.data().spots || 0;
    
//           const newSpots = currentSpots + incrementBy;
//           if (newSpots < 0) throw "No spots available";
    
//           transaction.update(tourRef, { spots: newSpots });
//         });
//     };

//     const handleRegister = async () => {
//         const user = auth.currentUser;
//         if (!user) return alert("You must be logged in.");

//         try{
//             await addDoc(collection(db, "tournament_registrations"), {
//                 userId: user.uid,
//                 tournamentId: tournamentID,
//                 date: new Date(),
//                 status: "registered"
//             });
//             await updateSpots(-1);
//             setRegistered(true);
//         } catch (err){
//             alert("Failed to register: ", err.message);
//         }
//     };

//     const handleCancel = async () => {
//         const user = auth.currentUser;
//         if (!user || !regDocId) return; //alert("You must be logged in.");

//         try{
//             await deleteDoc(doc(db, "tournament_registrations", regDocId));
//             await updateSpots(+1);
//             setRegistered(false);
//             setRegDocId(null);
//         } catch (err){
//             alert("Failed to cancel registration: " + err.message);
//         }
//     };

//     //     const q = query(
//     //         collection(db, "tournament_registrations"),
//     //         where("userId", "==", user.uid),
//     //         where("tournamentId", "==", tournamentID)
//     //     );
//     //     const snapshot = await getDocs(q);

//     //     snapshot.forEach(async (docSnap) => {
//     //         await deleteDoc(doc(db, "tournament_registrations", docSnap.id));
//     //         setRegistered(false);
//     //     });
//     // };

//     if (loading) return <p>Loading...</p>

//     return registered ? (
//         <button onClick={handleCancel}>Cancel Registration</button>
//       ) : (
//         <button onClick={handleRegister}>Register</button>
//       );
// }



"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase" //"lib/firebase.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { registerForTournament } from "../actions/registerForTournament" //"app/actions/registerForTournament";
import { cancelTournamentRegistration } from "../actions/cancelTournamentRegistration" //"app/actions/cancelTournamentRegistration";

export default function RegisterButton({ tournamentId }) {
  
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [regDocId, setRegDocId] = useState(null);
  const [spotsToBook, setSpotsToBook] = useState(1);
  const [bookedSpots, setBookedSpots] = useState(0);

  // useEffect(() => {
  //   const checkRegistration = async () => {
  //     const user = auth.currentUser;
  //     if (!user || !tournamentId) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const q = query(
  //         collection(db, "tournament_registrations"),
  //         where("userId", "==", user.uid),
  //         where("tournamentId", "==", tournamentId)
  //       );
  //       const snapshot = await getDocs(q);
  //       if (!snapshot.empty) {
  //         const docSnap = snapshot.docs[0];
  //         setRegistered(true);
  //         setRegDocId(docSnap.id);
  //       }
  //     } catch (err) {
  //       console.error("Registration check failed:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkRegistration();
  // }, [tournamentId]);


  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !tournamentId) return;
    
    const q = query(
      collection(db, "tournament_registrations"),
      where("userId", "==", user.uid),
      where("tournamentId", "==", tournamentId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty){
        const docSnap = snapshot.docs[0];
        setRegistered(true);
        setRegDocId(docSnap.id);
        setBookedSpots(docSnap.data()?.spotsBooked || 1);
      } else {
        setRegistered(false);
        setRegDocId(null);
        setBookedSpots(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tournamentId])

  // const updateSpots = async (incrementBy) => {

  //   if (!tournamentId) throw new Error("Invalid tournament ID");
  //   const tourRef = doc(db, "tournaments", tournamentId);

  //   await runTransaction(db, async (transaction) => {
  //     const tourDoc = await transaction.get(tourRef);
  //     if (!tourDoc.exists()) throw new Error("Tournament does not exist!");
      
  //     const currentSpots = tourDoc.data().spots || 0;
  //     const newSpots = currentSpots + incrementBy;
  //     if (newSpots < 0) throw new Error("Not enough spots available");

  //     transaction.update(tourRef, { spots: newSpots });
  //   });
  // };

  const handleRegister = async () => {
    const user = auth.currentUser;
    if (!user) return alert("You must log in first.");
    if (spotsToBook < 1) return alert("Please enter at least 1 spot.")

    try{
      await registerForTournament({
        tournamentId,
        userId: user.uid,
        spotsBooked: spotsToBook,
      });
    } catch (err){
      alert("Registration failed: " + err.message);
    }
  };



  //   const tourRef = doc(db, "tournaments", tournamentId);
  //   const tourDoc = await getDoc(tourRef);

  //   // if (!tourRef.exists()) return alert("Tournament not found.");
  //   const availableSpots = tourDoc.data().spots || 0;

  //   if (availableSpots < spotsToBook){
  //     return alert(`Only ${availableSpots} spot(s) available. Please reduce quantity.`);
  //   }


  //   try {

  //     await runTransaction(db, async (transaction) => {
  //       const latestDoc = await transaction.get(tourRef);
  //       const currentSpots = latestDoc.data().spots || 0;
  //       if (currentSpots < spotsToBook) throw new Error("Spots sold out.");

  //       transaction.update(tourRef, {spots: currentSpots - spotsToBook});
  //     })

  //     await addDoc(collection(db, "tournament_registrations"), {
  //       userId: user.uid,
  //       tournamentId,
  //       spotsToBook: spotsToBook,
  //       date: new Date(),
  //       status: "registered",
  //     });

  //     await updateSpots(-spotsToBook);
  //     // onUpdateSpots?.(-spotsToBook);
  //     // setRegistered(true);
  //   } catch (err) {
  //     console.error("Registration error:", err);
  //     alert("Failed to register: " + err.message);
  //   }
  // };

  const handleCancel = async () => {
    const user = auth.currentUser;
    if (!user || !regDocId) return;

    try {
      // await deleteDoc(doc(db, "tournament_registrations", regDocId));
      // await updateSpots(+bookedSpots);
      // onUpdateSpots?.(+bookedSpots);
      // setRegistered(false);
      // setRegDocId(null);
      await cancelTournamentRegistration({
        tournamentId,
        userId: user.uid,
      });
    } catch (err) {
      console.error("Cancel registration error:", err.message);
      alert("Failed to cancel registration: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {registered ? (
          <>
            <p>You booked {bookedSpots} spot(s).</p>
            <button className="primary" onClick={handleCancel}>Cancel Registration</button>
          </>
        ) : (
          <>
            <input type="number" min="1" value={spotsToBook} onChange={(e) => setSpotsToBook((Number(e.target.value || 1)))} style={{marginRight: "1rem", width: "60px"}} />
            <button className="cancel" onClick={handleRegister}>Register</button>
          </>
        )}
    </div>
)
}
