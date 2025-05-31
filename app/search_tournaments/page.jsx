import TournamentList from "app/ui/TournamentList"

export default function Page ({children}){
    return (
        <div>
            <h1>Search Gaming Tournaments</h1>
            <TournamentList />
        </div>
    )
}