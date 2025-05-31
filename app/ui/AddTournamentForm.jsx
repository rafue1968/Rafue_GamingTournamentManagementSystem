"use client";
import { useState } from "react";
import { addTournamentToFirestore } from "../actions/addTournament" //"app/actions/addTournament";

export default function AddTournamentForm({onAdd}){
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [spots, setSpots] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        // client-side use
        // if (!title || !date || !location || !spots){
        //     alert("Please fill out all the fields.");
        //     return;
        // }

        // const newTournament = {
        //     id: Date.now(),
        //     title,
        //     date,
        //     location,
        //     spots: parseInt(spots)
        // };

        // console.log("New Tournament: ", newTournament);

        // if(onAdd){
        //     onAdd(newTournament);
        // }

        // setTitle("");
        // setDate("");
        // setLocation("");
        // setSpots("");


        //Server-side use
        const result = await addTournamentToFirestore({
            title,
            date,
            location,
            spots,
            latitude,
            longitude
        });

        if (result.success){
            alert("Tournament added!");
            setTitle("");
            setDate("");
            setLocation("");
            setSpots("");
            setLatitude("")
            setLongitude("")
        } else {
            alert("Error: " + result.message);
        }
    };

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h2>Add New Tournament</h2>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                <input 
                    type="text"
                    placeholder="Game title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />

                <input 
                    type="date"
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}
                />
                
                <input 
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e)=> setLocation(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}    
                />

                <input 
                    type="text"
                    placeholder="Available spots"
                    value={spots}
                    onChange={(e)=> setSpots(e.target.value)}
                />
                

                <button className="primary" type="submit">
                    Add Tournament
                </button>
            </div>
        </form>
    )

};