'use server';

import { auth } from "lib/firebase.js";
import { signOut } from "firebase/auth";


export async function logout(){
    try {
        await signOut(auth);
        return {success: true};
    } catch (err){
        console.log("Logout failed: ", err);
        return {error: "Logout failed."};
    }
}