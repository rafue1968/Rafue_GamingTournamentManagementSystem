import RegisterPage from "../ui/RegisterPage" //"app/ui/RegisterPage";

export default function Page (){
    return (
        <div>
            <RegisterPage />
            <button style={{marginLeft: "37.5%", marginTop: "30px"}}><a href="/login">Already have user account? Click here to Login</a></button>
            <button style={{marginLeft: "43%", marginTop: "30px"}}><a href="/">Go back to Home Page</a></button>
        </div>
    )
}