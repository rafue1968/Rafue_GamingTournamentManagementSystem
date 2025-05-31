"use server";
import { db } from "../../lib/firebase" //"lib/firebase.js";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteTournamentById(id) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid tournament ID.");
  }

  await deleteDoc(doc(db, "tournaments", id));
  return { success: true };
}
