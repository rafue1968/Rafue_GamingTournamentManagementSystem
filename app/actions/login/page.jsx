"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "lib/firebase.js";
import { useUser } from "UserContext";

export default function Page() {
  const { setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.data()?.role || "user";

      setUser({ uid: user.uid, email: user.email, role });
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleLogin} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <button><a href="/">Go back to Home Page</a></button>
    </div>
  );
}
