"use client";
import LoginPage from "../ui/LoginPage" //"app/ui/LoginPage.jsx";


export default function Page(){
    return (
        <div>
            <LoginPage />
            <button style={{marginLeft: "37.5%", marginTop: "30px"}}><a href="/register">Don't have a user account? Click here to Register</a></button>
            <button style={{marginLeft: "43%", marginTop: "30px"}}><a href="/">Go back to Home Page</a></button>
        </div>
    );
}