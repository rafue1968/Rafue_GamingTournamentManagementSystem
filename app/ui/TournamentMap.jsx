"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


export default function TournamentMap({tournaments}){
    const mapRef = useRef(null);

    useEffect(()=> {
        if (!mapRef.current) return;
    
        const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        tournaments.forEach((tournament) => {
            if (!tournament.lat || !tournament.lng) return;

            const marker = L.marker([tournament.lat || tournament.lng]).addTo(map);

            marker.bindPopup(`
                <strong>${tournament.title}</strong><br/>    
                ${tournament.date}<br/>
                ${tournament.location}<br/>
                <button onclick="alert('Registering for ${tournament.title}')">Register</button>
            `);
        });

        return () => {
            map.remove();
        };
    }, [tournaments])


    return (
        <div>
            <h2>Tournament Map</h2>
            <div ref={mapRef} style={{height: "500px", width: "100%"}}></div>
        </div>
    );
}