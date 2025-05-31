import dynamic from "next/dynamic";
import { collection, getDocs } from "firebase/firestore";
// import MapView from "app/ui/MapView";
import { db } from "lib/firebase.js";
import MapPage from "app/ui/MapPage";


// const MapView = dynamic(() => import ("../ui/MapView"), {ssr: false});

export default async function Page(){
    const query = await getDocs(collection(db, "tournaments"));
    const tournaments = query.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),

    }));


    return (
        <div>
            <h1>Gaming Tournament Map</h1>
            <MapPage tournaments={tournaments} />
        </div>
    );
}