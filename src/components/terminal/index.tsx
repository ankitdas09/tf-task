import React from "react";
import { MimicLogs } from "../../api-mimic.ts";
import { useEffect, useRef, useState } from "react";
import CLog from "./components/log";
// import { v4 as uuidv4 } from "uuid";
export type Log = { timestamp: number; message: string };

type Props = {
    lastFetchedTime: number;
    setLastFetchedTime: React.Dispatch<React.SetStateAction<number>>;
};

const CTerminal = (props: Props) => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [liveLogs, setLiveLogs] = useState<Log[]>([]);
    const [timeDelta, setTimeDelta] = useState(5); // mins

    const [loading, setLoading] = useState(true);
    const [autoScroll, setAutoScroll] = useState(true);
    const [newLogs, setNewLogs] = useState(0);
    const scrollRef = useRef<HTMLSpanElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    function scrollToBottomLog(scrollType: ScrollBehavior) {
        scrollRef.current?.scrollIntoView({ behavior: scrollType });
    }

    async function fetchLogs() {
        const cur = new Date(props.lastFetchedTime).getTime();
        const mins = timeDelta;
        props.setLastFetchedTime(cur - mins * 60 * 1000);
        const resp = await MimicLogs.fetchPreviousLogs({
            startTs: cur - mins * 60 * 1000,
            endTs: cur,
            limit: 100,
        });
        setLogs([...resp].reverse());
        scrollToBottomLog("instant");
        setLoading(false);
    }

    async function fetchPreviousLogs() {
        if (loading) return;
        setLoading(true);
        const cur = new Date(props.lastFetchedTime).getTime();
        const mins = timeDelta;
        props.setLastFetchedTime(cur - mins * 60 * 1000);
        const resp = await MimicLogs.fetchPreviousLogs({
            startTs: cur - mins * 60 * 1000,
            endTs: cur,
            limit: 100,
        });
        const reversed = resp.reverse();
        setLogs((prev) => [...reversed, ...prev]);
        props.setLastFetchedTime(cur - mins * 60 * 1000);
        setLoading(false);
    }

    useEffect(() => {
        // if(scrollContainerRef.current){
        //     const curHt = scrollContainerRef.current.scrollHeight
        //     const diff = curHt - prevScrollHeight
        //     console.log(diff)
        //     setPrevScrollHeight(scrollContainerRef.current.scrollHeight)
        //     if(scrollContainerRef.current.scrollTop === 0) scrollContainerRef.current.scrollTop += diff
        //     else scrollContainerRef.current.scrollTop -= diff
        // }
        // if (!firstLog) {
        document.getElementById("log-100")?.scrollIntoView();
        // return;
        // }
        // firstLog.scrollIntoView();
    }, [logs]);

    useEffect(() => {
        fetchLogs();
    }, []);

    function handleAddLog(e: Log) {
        // setLogs((prev) => {
        //     const lastN = prev.slice(-1500);
        //     return [...lastN, e];
        // });
        setLiveLogs((prev) => [...prev, e]);
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
            // setPrevScrollHeight(scrollContainerRef.current.scrollHeight);
            fetchPreviousLogs();
        }
    }

    function handleEnableAutoScroll() {
        scrollToBottomLog("smooth");
        setAutoScroll(true);
    }
    return (
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
                    {logs && logs.map((log, idx) => <CLog log={log} index={idx} />)}
                    {liveLogs && liveLogs.map((log, idx) => <CLog log={log} index={idx} />)}
                    <span ref={scrollRef}></span>
                </div>
            </div>
            {!autoScroll && (
                <button
                    className="absolute text-white bottom-5 right-5 p-3 bg-[#4338CA] rounded-md text-xs align-middle"
                    onClick={handleEnableAutoScroll}
                >
                    {newLogs} New {newLogs == 1 ? "Log" : "Logs"}
                    <img src="arrow-up-long.png" alt="" className="inline w-[8px] ms-2 mt-[-2px]" />
                </button>
            )}
        </div>
    );
};

export default CTerminal;
