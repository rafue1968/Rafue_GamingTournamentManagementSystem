import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";


export async function getUserRole(uid) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()){
        return userSnap.data().role;
    } else {
        return null;
    }
}