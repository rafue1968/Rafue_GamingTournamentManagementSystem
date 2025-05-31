export default function Page() {
    return (
        <div className="container">
            <div className="card homepage" >            
                <h1 style={{textAlign: "center"}}>Welcome to the<br />Gaming Tournament Management System</h1>
                <div className="button-container">
                    <button><a href="/login">Login</a></button><br />
                    <button><a href="/register">Register</a></button>
                </div>
            </div>
        </div>
    )
    
}