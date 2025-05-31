"use client";

import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase" //"lib/firebase.js";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (err) {
            console.log("Logout failed: ", err);
        }
    };


    return (
        <button className="primary" onClick={handleLogout}>Logout</button>
    )
}