import { useState } from "react";
import CNavBar from "./components/navbar";
import CTerminal from "./components/terminal";

function App() {
    const [lastFetchedTime, setLastFetchedTime] = useState(new Date().getTime()); //timestamp

    return (
        <div className="container mx-auto px-2">
            <CNavBar />
            
            <p className="text-sm">Showing logs for 09/08/2023 10:10</p>
            {lastFetchedTime}

            <CTerminal lastFetchedTime={lastFetchedTime} setLastFetchedTime={setLastFetchedTime}/>        
        </div>
    );
}

export default App;
