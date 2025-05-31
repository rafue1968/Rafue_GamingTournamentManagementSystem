"use server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase" //"lib/firebase.js";

export async function updateTournamentById(id, updatedData) {
  const docRef = doc(db, "tournaments", id);
  await updateDoc(docRef, updatedData);
}
