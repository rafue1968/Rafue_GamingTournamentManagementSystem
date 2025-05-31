"use server";
import { db } from "../../lib/firebase" //"lib/firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function searchTournaments({ title, date, location, latitude, longitude }) {
  const querySnapshot = await getDocs(collection(db, "tournaments"));

  const results = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(t => {
      const matchesTitle = !title || t.title?.toLowerCase().includes(title.toLowerCase());
      const matchesDate = !date || t.date === date;
      const matchesLocation = !location || t.location?.toLowerCase().includes(location.toLowerCase());
      const matchesLat = !latitude || Number(t.latitude) === Number(latitude);
      const matchesLng = !longitude || Number(t.longitude) === Number(longitude);
      return matchesTitle && matchesDate && matchesLocation && matchesLat && matchesLng;
    });

  return results;
}
