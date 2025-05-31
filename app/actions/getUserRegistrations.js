"use server";
import { db } from "../../lib/firebase" //"lib/firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

export async function getUserRegistrations(userId) {
  if (!userId) throw new Error("User ID is required.");

  const q = query(
    collection(db, "tournament_registrations"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);
  const registrations = [];

  for (const regDoc of snapshot.docs) {
    const regData = regDoc.data();
    const tournamentRef = doc(db, "tournaments", regData.tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);

    if (tournamentSnap.exists()){ //&& regData.spotsBooked && regData.spotsBooked > 0){
      registrations.push({
        id: regDoc.id,
        tournamentId: regData.tournamentId,
        status: regData.status || "registered",
        registeredAt: regData.date?.toDate().toISOString() || null,
        spotsBooked: regData.spotsBooked || 1,
        tournament: tournamentSnap.data(), //tournamentSnap.exists() ? tournamentSnap.data() : null,
      });
    }
  }

  return registrations;
}
