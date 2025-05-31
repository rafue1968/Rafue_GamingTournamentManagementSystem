"use server";

import { db } from "../../lib/firebase" //"lib/firebase.js";
import { collection, addDoc } from "firebase/firestore";

export async function addTournamentToFirestore({ title, date, location, spots,latitude,longitude }) {
  try {
    const docRef = await addDoc(collection(db, "tournaments"), {
      title,
      date,
      location,
      spots: parseInt(spots),
      latitude,
      longitude
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Failed to add a tournament:", error);
    return { success: false, message: error.message };
  }
}