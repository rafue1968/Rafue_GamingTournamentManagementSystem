"use client";

import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import SearchForm from "./SearchForm";
import MapSearchForm from "./MapSearchForm";
import RegisterButton from "./RegisterButton";
import { createRoot } from "react-dom/client";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase" //"lib/firebase.js";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export default function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRefs = useRef({});
  const [tournaments, setTournaments] = useState([])


  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 6);
    mapRef.current = map;
    map.invalidateSize();

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    return () => map.remove();

    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tournaments"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTournaments(data);
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (!mapRef.current) return;

        Object.values(markerRefs.current).forEach(marker => {
            mapRef.current.removeLayer(marker);
        });
        markerRefs.current = {};

        tournaments.forEach((t) => {
        if (!t.latitude || !t.longitude) return;

        const popupId = `popup-register-${t.id}`;

        const marker = L.marker([t.latitude, t.longitude])
            .addTo(mapRef.current)
            .bindPopup(`
            <div>
                <strong>${t.title}</strong><br />
                ${t.date}<br />
                ${t.location}<br />
                <em>Spots: ${t.spots}</em>
                <div id="${popupId}">Loading...</div>
            </div>
            `);

            marker.on("popupopen", () => {
                const container = document.getElementById(popupId);
                if (container) {
                    const root = createRoot(container);
                    root.render(<RegisterButton tournamentId={t.id} />);
                }
            });

        markerRefs.current[t.id] = marker;
        });
    }, [tournaments]);

  
  const panToTournament = ({ title = "", location = "" }) => {
    const normalizedTitle = title.toLowerCase();
    const normalizedLocation = location.toLowerCase();
    
    const tour = tournaments.find((t) =>{
        const tTitle = t.title?.toLowerCase() || "";
        const tLocation = t.location?.toLowerCase() || "";
        return (
            (title && tTitle.includes(normalizedTitle)) ||
            (location && tLocation.includes(normalizedLocation))
        );
    });
  
    if (tour && tour.latitude && tour.longitude && mapRef.current) {
      mapRef.current.setView([tour.latitude, tour.longitude], 12);
      const marker = markerRefs.current[tour.id];
      if (marker) marker.openPopup();
    } else {
      alert("Tournament not found on map.");
    }
  };
  

  return (
    <div className="card">
      <MapSearchForm onPan={panToTournament} />
      <div
        ref={mapContainerRef}
        id="map"
        style={{ height: "500px", width: "100%", border: "2px solid #00bfff", marginTop: "1rem", borderRadius: "10px" }}
      />
    </div>
  );
}
