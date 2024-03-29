import CNavBar from "./components/navbar";
import { MimicLogs } from "./api-mimic.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Log = { timestamp: number; message: string };

function App() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [lastFetchedTime, setLastFetchedTime] = useState(0) //timestamp
    const [timeDelta, setTimeDelta] = useState(5) // mins

    const [loading, setLoading] = useState(true);
    const [autoScroll, setAutoScroll] = useState(true);
    const [newLogs, setNewLogs] = useState(0);
    const scrollRef = useRef<HTMLSpanElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    function scrollToBottomLog(scrollType: ScrollBehavior) {
        scrollRef.current?.scrollIntoView({ behavior: scrollType });
    }

    async function fetchLogs() {
        const cur = new Date().getTime();
        const mins = 5;
        setLastFetchedTime(cur - mins * 60 * 1000)
        const resp = await MimicLogs.fetchPreviousLogs({
            startTs: cur - mins * 60 * 1000,
            endTs: cur,
            limit: 100,
        });
        setLogs([...resp].reverse());
        scrollToBottomLog("instant");
        setLoading(false);
    }
    useEffect(() => {
        fetchLogs();
    }, []);

    function handleAddLog(e: Log) {
        setLogs((prev) => {
            const lastN = prev.slice(-1500);
            return [...lastN, e];
        });
        if (autoScroll) {
            setNewLogs(0);
            scrollToBottomLog("smooth");
        }
        if (!autoScroll) setNewLogs((prev) => prev + 1);
    }

    useEffect(() => {
        const unsubscribe = MimicLogs.subscribeToLiveLogs(handleAddLog);
        return () => unsubscribe();
    }, [autoScroll]);

    scrollContainerRef.current?.addEventListener("wheel", function () {
        if (autoScroll) setAutoScroll(false);
    });

    function handleScroll() {
        if (scrollContainerRef.current?.scrollTop == 0) {
            console.log("top");
            setLoading(true);
        }
    }

    function handleEnableAutoScroll() {
        scrollToBottomLog("smooth");
        setAutoScroll(true);
    }

    return (
        <div className="container mx-auto px-2">
            <CNavBar />
            <p className="text-sm">Showing logs for 09/08/2023 10:10</p>
            {lastFetchedTime}
            <div className="relative">
                <div className="h-8 w-full bg-slate-900 flex justify-center items-center rounded-t-lg">
                    {loading && (
                        <>
                            <span className="loader"></span>
                            <p className="ms-2 font-mono text-slate-400 text-xs text-center align-middle inline-block">
                                Loading previous 100 logs
                            </p>
                        </>
                    )}
                </div>
                <div
                    className="h-[80vh] bg-slate-950 rounded-b-lg overflow-x-hidden overflow-y-scroll hide-scroll-bar"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                >
                    <div>
                        {logs &&
                            logs.map((log, idx) => {
                                const _d = new Date(log.timestamp);
                                const month = _d.toLocaleString("default", { month: "long" });
                                const date = _d.getDate();
                                const time = _d.toISOString().split("T")[1].slice(0, -1);
                                return (
                                    <div
                                        className="text-slate-300 text-xs flex items-start p-2 font-mono"
                                        key={idx}
                                    >
                                        <span className="rounded-left-border min-h-full"></span>
                                        <p className="inline-block text-[#5E7BAA] me-[9px]">
                                            {month}
                                        </p>
                                        <p className="inline-block text-[#5E7BAA] me-[9px]">
                                            {date}
                                        </p>
                                        <p className="inline-block text-[#5E7BAA] me-[9px]">
                                            {time}
                                        </p>
                                        <p className="inline-block text-[#5E7BAA] me-[9px]">
                                            [info]
                                        </p>

                                        <p className="inline-block text-[#A8C3E8] me-[9px]">
                                            {log.message}
                                        </p>
                                    </div>
                                );
                            })}
                        <span ref={scrollRef}></span>
                    </div>
                </div>
                {!autoScroll && (
                    <button
                        className="absolute text-white bottom-5 right-5 p-3 bg-[#4338CA] rounded-md text-xs align-middle"
                        onClick={handleEnableAutoScroll}
                    >
                        {newLogs} New {newLogs == 1 ? "Log" : "Logs"}
                        <img
                            src="arrow-up-long.png"
                            alt=""
                            className="inline w-[8px] ms-2 mt-[-2px]"
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
