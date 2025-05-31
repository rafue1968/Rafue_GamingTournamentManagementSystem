"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase/config";

const auth = getAuth();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) =>{
        const loginUserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = loginUserCredential.user;
    }

    const register = async (email, password) => {
        const createUserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = createUserCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: "user"
        });

        return userCredential;
    };


    const logout = async () => {
        await auth.signOut() //signOut(auth);
    }

    
    return (
        <AuthContext.Provider value={{user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);