"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../lib/firebase"; //"lib/firebase.js";
// import UserDashboard from "app/ui/UserDashboard";
import TournamentList from "../ui/TournamentList" //"app/ui/TournamentList";
// import MapView from "app/ui/MapView";
import dynamic from "next/dynamic";
const MapView = dynamic(()=> import("../ui/MapView"), {ssr: false}); //import("app/ui/MapView"), {ssr: false});
import RegistrationHistory from "../ui/RegistrationHistory" //"app/ui/RegistrationHistory";
import LogoutButton from "../ui/LogoutButton"  //"app/ui/LogoutButton";
import CurrentUserEmail from "../ui/CurrentUserEmail";


export default function Page(){
    const router = useRouter();
    const [tournaments, setTournaments] = useState([]);
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const checkAccessAndFetch = async () => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const snap = await getDoc(doc(db, "users", user.uid));
            const role = snap.exists() ? snap.data().role : "user";
  
            if (role === "user") {
              setAuthorized(true);
              const querySnapshot = await getDocs(collection(db, "tournaments"));
              const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setTournaments(data);
            } else {
              alert("Only regular users may access this page.");
              router.push("/");
            }
          } else {
            router.push("/login");
          }
          setLoading(false);
        });
      };
  
      checkAccessAndFetch();
    }, []);
    
      if (loading) return <p>Loading...</p>;
      if (!authorized) return null;
    
      return (
        <div>
          <div className="logout currentUserEmail">
            <div><LogoutButton /></div>
            <div id="currentUserEmailWhiteBox"><CurrentUserEmail /></div>
          </div>


          <h1>User Dashboard</h1>
          {/* <p>Welcome to your dashboard. Here you can view tournaments and more!</p> */}
          <TournamentList initialTournaments={tournaments} />
          <RegistrationHistory />
          <MapView tournaments={tournaments} />
          
          
          {/* <UserDashboard /> */}
        </div>
      );
}