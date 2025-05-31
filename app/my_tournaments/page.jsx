import { getRegistrations } from "../actions/server"
import MyTournaments from "../ui/MyTournaments"

export default async function MyTournamentsPage(){
    const userId = "mockUser";

    const registerations = await getRegistrations(userId);

    return (
        <div>
            <h1>My Registered Tournaments</h1>
            <MyTournaments tournaments={registerations} />
        </div>
    )
}