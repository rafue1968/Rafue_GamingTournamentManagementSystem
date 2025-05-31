"use server";
import { db } from "../../lib/firebase" //"lib/firebase.js";
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  collection,
  getDoc,
  getDocs,
  where,
  runTransaction,
  query,
} from "firebase/firestore";

export async function registerForTournament({ tournamentId, userId, spotsBooked }) {

    // const tournamentIdType = typeof tournamentId;
    // console.log(tournamentIdType);

  if (!tournamentId || !userId || spotsBooked < 1){
    throw new Error("Invalid input provided.")
  }

    if (!tournamentId || typeof tournamentId !== "string") {
    throw new Error("Invalid tournament ID.");
  }
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid user ID.");
  }


  const tourRef = doc(db, "tournaments", tournamentId);
  const tourSnap = await getDoc(tourRef);

  if (!tourSnap.exists()) throw new Error("Tournament not found.");

  const existing = await getDocs(
    query(
      collection(db, "tournament_registrations"),
      where("tournamentId", "==", tournamentId),
      where("userId", "==", userId)
    )
  );
  if(!existing.empty) throw new Error("Already registered");

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(tourRef);
    const currentSpots = snap.data().spots || 0;

    if (currentSpots < spotsBooked) {
      throw new Error(`Only ${currentSpots} spots left`);
    }

    transaction.update(tourRef, {spots: currentSpots - spotsBooked});
  });

//   if (!tournamentId || typeof tournamentId !== "string") {
//     throw new Error("Invalid tournament ID.");
//   }

  await addDoc(collection(db, "tournament_registrations"), {
    userId,
    tournamentId,
    spotsBooked,
    date: new Date(),
    status: "registered",
  });

  // await updateDoc(tourRef, {
  //   spots: increment(-1),
  // });

  return { success: true };
}
