"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, firestore } from "../../firebase/config" //"firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";


function RegisterForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [role, setRole] = useState("user"); //sets the default role for users
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(firestore, "users", user.uid), {
                email: user.email,
                role: "user", //default role for user
            });
            
            alert("Registeration successful!");
            router.push("/user");
        } catch (error) {
            setError("Registration failed: ", error.message);
            // alert("Signup failed: ", error.message);
        }
    }

    return (
        <form onSubmit={handleRegister} className="card">
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                <h2>Register as a New User</h2>

                {error && <p style={{color: "red"}}>{error}</p>}

                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    minLength={6}
                />

                <button>Register</button>
            </div>
        </form>
    );

}

export default RegisterForm;