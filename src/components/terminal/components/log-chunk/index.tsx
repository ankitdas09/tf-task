import { useMemo } from "react";
import { Log } from "../..";
import CLog from "../log";

type Props = {
    chunkId: number,
    logs: Log[];
};

const CLogChunk = (props: Props) => {
    // useEffect(() => {
    //     console.log(props.chunkId, "rerendered")
    // }, [])
    const memoizedLogs = useMemo(() => {
        return (
            <>
                {props.logs.map((log, idx) => {
                    return <CLog chunkId={props.chunkId} log={log} key={idx} index={idx} />;
                })}
            </>
        );
    }, [props]);

    return memoizedLogs;
};

export default CLogChunk;
