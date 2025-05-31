"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "lib/firebase.js";

const UserContext = createContext();

export function UserProvider({ children }){
    const [user, setUser] = useState(null);

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser){
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                // const userData = userDoc.exists() ? userDoc.data() : {};
                let userData = {};
                if (userDoc.exists()){
                    userData = userDoc.data();
                } else {
                    console.warn("User doc not found in Firestore");
                }
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    role: userData.role || "user",
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext)
}

// export function useUser(){
//     return useContext(UserContext);
// }