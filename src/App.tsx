import { BrowserRouter, Route, Routes } from "react-router-dom";
import PLogs from "./pages/logspage";
import PMetrics from "./pages/metrics";
import CNavBar from "./components/navbar";
import { useState } from "react";

function App() {
    const [lastFetchedTime, setLastFetchedTime] = useState(new Date().getTime()); //timestamp
    const [timeDelta, setTimeDelta] = useState(5); //mins

    return (
        <div className="container mx-auto px-2">
            <BrowserRouter>
                <CNavBar
                    lastFetchedTime={lastFetchedTime}
                    setLastFetchedTime={setLastFetchedTime}
                    timeDelta={timeDelta}
                    setTimeDelta={setTimeDelta}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <p className="font-bold">Go to:</p>
                                <p className="text-blue-800 underline">
                                    <a href="/metrics">/metrics</a>
                                </p>
                                <p className="text-blue-800 underline">
                                    <a href="/logs">/logs</a>
                                </p>
                            </>
                        }
                    />
                    <Route
                        path="/logs"
                        element={
                            <PLogs
                                lastFetchedTime={lastFetchedTime}
                                setLastFetchedTime={setLastFetchedTime}
                                timeDelta={timeDelta}
                                setTimeDelta={setTimeDelta}
                            />
                        }
                    />
                    <Route
                        path="/metrics"
                        element={
                            <PMetrics
                                lastFetchedTime={lastFetchedTime}
                                timeDelta={timeDelta}
                                setLastFetchedTime={setLastFetchedTime}
                                setTimeDelta={setTimeDelta}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
