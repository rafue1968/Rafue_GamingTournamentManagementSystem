"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../lib/firebase" //"lib/firebase.js";
import AddTournamentForm from "../ui/AddTournamentForm" //"app/ui/AddTournamentForm";
import AdminDashboard from "../ui/AdminDashboard" //"app/ui/AdminDashboard";
import TournamentList from "../ui/TournamentList" //"app/ui/TournamentList";
import dynamic from "next/dynamic";
import RegistrationHistory from "../ui/RegistrationHistory" //"app/ui/RegistrationHistory";
import LogoutButton from "../ui/LogoutButton" //"app/ui/LogoutButton";
import CurrentUserEmail from "../ui/CurrentUserEmail" //"app/ui/CurrentUserEmail";

const MapView = dynamic(() => import("../ui/MapView"), { ssr: false }); //import("app/ui/MapView"), { ssr: false });

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tournaments, setTournaments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try{
          const snap = await getDoc(doc(db, "users", user.uid));
          console.log("User snapshot exists: ", snap.exists());
          console.log("User snapshot data: ", snap.data());
          const data = snap.exists() ? snap.data() : null; //: "user";
          const role = data?.role;
          console.log("User role: ", role);


          console.log(role);
          if (role === "admin") {
            console.log("Authorized as admin!!")
            setAuthorized(true);
            const querySnapshot = await getDocs(collection(db, "tournaments"));
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setTournaments(data);
            setLoading(false);
          } else {
            alert("Not authorized as admin.");
            router.push("/login");
            return;
          }
        } catch (err) {
          console.log("Error fetching user or tournaments: ", err);
          router.push("/login")
          return;
        }
      } else {
        console.log("No user logged in");
        // setTimeout(()=> {
        //   if (!auth.currentUser){
        //     router.push("/login");
        //   }
        // }, 1000)
        router.push("/login");
        return;
        
      }
      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;

  return (
    <div>
      <div className="logout currentUserEmail">
        <div><LogoutButton /></div>
        <div id="currentUserEmailWhiteBox"><CurrentUserEmail /></div>
      </div>


      <h1>Admin Dashboard</h1>
        <AddTournamentForm />
        <AdminDashboard />
        <TournamentList initialTournaments={tournaments} showRegister={true} />
        <RegistrationHistory />
        <MapView tournaments={tournaments} />
    </div>
  );
}
