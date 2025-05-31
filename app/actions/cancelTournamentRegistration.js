"use server";
import { db } from "../../lib/firebase" //"lib/firebase.js";
import { collection, query, where, getDocs, deleteDoc, doc, runTransaction } from "firebase/firestore";

export async function cancelTournamentRegistration({ tournamentId, userId }) { 
  //   if (!tournamentId || typeof tournamentId !== "string") {
  //   throw new Error("Invalid tournament ID.");
  // }
  // if (!userId || typeof userId !== "string") {
  //   throw new Error("Invalid user ID.");
  // }

  if (!tournamentId || !userId) throw new Error("Missing input");

  const q = query(
    collection(db, "tournament_registrations"),
    where("userId", "==", userId),
    where("tournamentId", "==", tournamentId)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    throw new Error("Registration not found.");
  }

  const regDoc = snapshot.docs[0];
  const spotsBooked = regDoc.data().spotsBooked || 1;
  const tourRef = doc(db, "tournaments", tournamentId);

  // await runTransaction(db, "tournaments", tournamentId);
  // for (const docSnap of snapshot.docs) {
  //   await deleteDoc(doc(db, "tournament_registrations", docSnap.id));
  // }

  await runTransaction(db, async (transaction) => {
    const tourSnap = await transaction.get(tourRef);
    const currentSpots = tourSnap.data().spots || 0;
    transaction.update(tourRef, {
      spots: currentSpots + spotsBooked,
    });
  });

  await deleteDoc(regDoc.ref);

  return { success: true };
}
