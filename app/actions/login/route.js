"use server";

import { auth } from "../../../firebase/config";

export default async function handler(req, res){
    const {email, password} = req.body;

    try{
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        res.status(200).json({ message: 'Login is successful', user });
    } catch (err) {
        res.status(401).json({ error: 'Invalid credentials'})
    }
}