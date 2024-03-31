import { Log } from "../..";
import React from "react";

type Props = {
    log: Log,
    index: number,
    chunkId: number,
}

function isError() {
    return Math.random() < 0.1
}

const CLog = (props: Props) => {
    const _d = new Date(props.log.timestamp);
    const month = _d.toLocaleString("default", { month: "long" });
    const date = _d.getDate();
    const time = _d.toISOString().split("T")[1].slice(0, -1);
    return (
        <div
            className="text-slate-300 text-xs flex items-start p-2 font-mono"
            key={`chunk-${props.chunkId}-log-${props.index}`}
            id={`chunk-${props.chunkId}-log-${props.index}`}
        >
            <span className="rounded-left-border min-h-full"></span>
            <p className="inline-block text-[#5E7BAA] me-[9px]">{month}</p>
            <p className="inline-block text-[#5E7BAA] me-[9px]">{date}</p>
            <p className="inline-block text-[#5E7BAA] me-[9px]">{time}</p>
            <p className="inline-block text-[#5E7BAA] me-[9px]">
                {isError() ? "[error]" : "[info]"}
            </p>

            <p className="inline-block text-[#A8C3E8] me-[9px]">{props.log.message}</p>
        </div>
    );
};

export default React.memo(CLog);
