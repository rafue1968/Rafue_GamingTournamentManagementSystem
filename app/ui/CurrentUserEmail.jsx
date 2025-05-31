"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase" //"lib/firebase.js";


export default function CurrentUserEmail(){
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
            } else {
                setEmail(null);
            }
        });

        return () => unsubscribe();
    }, []);

    if (email === null){
        return <p>No user is currently logged in.</p>
    }

    return <p>Logged in as: <strong>{email}</strong></p>;
}