import CTerminal from "../../components/terminal";
import { getFormatedDateTime } from "../../utils/utils";

type Props = {
    lastFetchedTime: number;
    timeDelta: number;
    setLastFetchedTime: React.Dispatch<React.SetStateAction<number>>;
    setTimeDelta: React.Dispatch<React.SetStateAction<number>>;
};

const PLogs = (props: Props) => {
    const [sDate] = getFormatedDateTime(props.lastFetchedTime + props.timeDelta * 60 * 1000, props.timeDelta);
    const [, eDate] = getFormatedDateTime(new Date().getTime(), props.timeDelta);
    return (
        <>
            <div className="flex items-center w-100 justify-end py-2">
                <p className="text-sm me-1">Showing logs for</p>
                <p className="text-sm">{sDate}</p>
                <img src="arrow-right.svg" alt="" className="mx-1 w-[10px]" />
                <p className="text-sm">{eDate}</p>
            </div>
            <CTerminal
                lastFetchedTime={props.lastFetchedTime}
                setLastFetchedTime={props.setLastFetchedTime}
                timeDelta={props.timeDelta}
            />
        </>
    );
};

export default PLogs;
