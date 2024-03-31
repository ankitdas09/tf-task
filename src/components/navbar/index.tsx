import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    lastFetchedTime: number;
    timeDelta: number;
    setLastFetchedTime: React.Dispatch<React.SetStateAction<number>>;
    setTimeDelta: React.Dispatch<React.SetStateAction<number>>;
};
const CNavBar = (props: Props) => {
    function handleDropdownToggle() {
        const container = document.getElementById("dropdown-item-container");
        container?.classList.toggle("hidden");
    }

    function handleDeltaChange(mins: number) {
        props.setTimeDelta(mins);
        handleDropdownToggle();
    }

    const timeDeltas = [5, 15, 30, 60, 180, 360];

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="flex justify-between py-4">
            <div className="flex items-center">
                <span>
                    <img src="TF logo.svg" alt="logo" />
                </span>
                <button
                    className={`ms-[40px] me-[20px]  items-center rounded-bottom-border ${location.pathname != "/metrics" ? "text-slate-500" : "rounded-bottom-border-active"}`}
                    onClick={() => navigate("/metrics")}
                >
                    <div className="flex items-center" onClick={() => navigate("/metrics")}>
                        <img
                            src={location.pathname == "/metrics" ? "metrics.png" : "metrics-gray.png"}
                            alt="metrics icon"
                            className="w-3 h-full inline-block me-1"
                        />
                        Metrics
                    </div>
                </button>
                <button
                    className={`items-center rounded-bottom-border ${location.pathname != "/logs" ? "text-slate-500" : "rounded-bottom-border-active"}`}
                    onClick={() => navigate("/logs")}
                >
                    <div className={"flex items-center"}>
                        <img
                            src={location.pathname == "/logs" ? "list-active.png" : "list.png"}
                            alt="metrics icon"
                            className="w-3 h-full inline me-1"
                        />
                        Logs
                    </div>
                </button>
            </div>
            <div className="relative">
                <div
                    onClick={handleDropdownToggle}
                    className="border rounded-md text-xs font-sans px-2 py-2 text-[#3E5680] font-medium cursor-pointer"
                >
                    Last {props.timeDelta >= 60 ? props.timeDelta / 60 : props.timeDelta}{" "}
                    {props.timeDelta >= 60 ? (props.timeDelta == 60 ? "Hour" : "Hours") : "Minutes"}
                    <img src="chevron.svg" alt="" className="inline w-[10px] mb-[3px] ms-[6px]" />
                </div>
                <div
                    id="dropdown-item-container"
                    className="hidden cursor-pointer font-medium rounded border-[0.3px] border-[#E0ECFD] bg-white absolute top-10 left-0 z-10 text-[14px] text-slate-900 w-[123%] drop-shadow-md"
                >
                    {timeDeltas.map((t) => {
                        return (
                            <div
                                className="border-b-[1px] p-2 flex justify-between hover:bg-gray-300"
                                onClick={() => handleDeltaChange(t)}
                                key={t}
                            >
                                Last {t >= 60 ? t / 60 : t}{" "}
                                {t >= 60 ? (t == 60 ? "Hour" : "Hours") : "Minutes"}
                                {props.timeDelta == t && (
                                    <img
                                        src="Icon.svg"
                                        alt=""
                                        className="inline w-[10px] mb-[2px] ms-[6px]"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default CNavBar;
