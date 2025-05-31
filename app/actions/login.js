"use server";

// import { admin } from ""


import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../lib/firebase" //"lib/firebase.js";
import {doc, getDoc} from "firebase/firestore";
import { cookies } from "next/headers";

// import { admin } from "firebaseadmin";


export async function login(email, password){
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Firebase User:", user);
  
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        console.log("Firestore Document:", snap.exists(), snap.data());

        if (!snap.exists()){
            return {error: "User record not found."};
        }

        const role = snap.data().role;


        (await cookies()).set("uid", user.uid);

        return {success: true, role};

    } catch (err){
        console.log("Login failed:", err.message);
        return {error: err.message};
    }
}
