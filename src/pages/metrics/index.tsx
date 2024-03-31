import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    Point,
    Filler,
    ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MimicMetrics } from "../../api-mimic";
import { getChartOptions, getFormatedDateTime } from "../../utils/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);
ChartJS.defaults.responsive = true;

type Props = {
    lastFetchedTime: number;
    timeDelta: number;
    setLastFetchedTime: React.Dispatch<React.SetStateAction<number>>;
    setTimeDelta: React.Dispatch<React.SetStateAction<number>>;
};
function PMetrics(props: Props) {
    // reset
    // useEffect(() => {
    //     props.setLastFetchedTime(new Date().getTime())
    //     props.setTimeDelta(5)
    // }, [])

    type Dataset = {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string | { (context: ScriptableContext<"line">): CanvasGradient };
        pointRadius: number;
        fill?: boolean;
        order?: number;
        borderWidth?: number;
    };

    const [data, setData] = useState<ChartData<"line", (number | Point | null)[], unknown>[]>([]);
    // const [titleArr, setTitleArr] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // const [lastFetchedTime, setLastFetchedTime] = useState(props.lastFetchedTime)
    // const [timeDelta, setTimeDelta] = useState(props.timeDelta) //mins

    async function fetchMetrics() {
        try {
            setLoading(true);
            const resp = await MimicMetrics.fetchMetrics({
                startTs: props.lastFetchedTime - props.timeDelta * 60 * 1000,
                endTs: props.lastFetchedTime,
            });
            // console.log(resp);
            resp.forEach((graph, gIdx) => {
                // const title = graph.name;
                // setTitleArr((prev) => [...prev, title]);

                const graphLines = graph.graphLines;
                const _labels = graphLines[0].values.map((v) => {
                    const _d = new Date(v.timestamp);
                    // return `${_d.getUTCHours()}:${_d.getUTCMinutes()}${_d.getUTCSeconds() == 0 ? "" : ":" + _d.getUTCSeconds()}`;
                    return `${_d.getUTCHours()}:${_d.getUTCMinutes() < 10 ? "0" + _d.getUTCMinutes() : _d.getUTCMinutes()}`;
                });
                const _datasets: Dataset[] = [];
                const colors = [
                    "rgba(5, 150, 105, 1)",
                    "rgba(37, 99, 235, 1)",
                    "rgba(220, 38, 38, 1)",
                ];
                const gradientColors = [
                    "rgba(37, 99, 235, 1)",
                    "rgba(220, 38, 38, 1)",
                    "rgba(5, 150, 105, 1)",
                ];
                const bgGradientStartColors = [
                    "rgba(37, 99, 235, 0.3)",
                    "rgba(220, 38, 38, 0.3)",
                    "rgba(5, 150, 105, 0.3)",
                ];
                const bgGradientEndColors = [
                    "rgba(37, 99, 235, 0)",
                    "rgba(220, 38, 38, 0.1)",
                    "rgba(5, 150, 105, 0)",
                ];
                graphLines.forEach((data, idx) => {
                    const _ret: Dataset = {
                        label: "",
                        data: [],
                        borderColor: "",
                        backgroundColor: "",
                        pointRadius: 0,
                        fill: false,
                        order: graphLines.length - idx,
                        borderWidth: 2,
                    };
                    _ret.label = data.name;
                    data.values.forEach((val) => _ret.data.push(val.value));
                    _ret.borderColor = colors[idx];
                    _ret.backgroundColor = colors[idx];
                    if (gIdx == 3) {
                        _ret.fill = true;
                        _ret.borderColor = gradientColors[idx];
                        _ret.backgroundColor = (context: ScriptableContext<"line">) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 240);
                            gradient.addColorStop(0, bgGradientStartColors[idx]);
                            gradient.addColorStop(1, bgGradientEndColors[idx]);
                            return gradient;
                        };
                    }
                    _datasets.push(_ret);
                });
                const newDataset = {
                    labels: _labels,
                    datasets: _datasets,
                };
                setData((prev) => [...prev, newDataset]);
            });
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        setData([]);
        fetchMetrics();
    }, [props.timeDelta]);

    const [sDate, eDate] = getFormatedDateTime(props.lastFetchedTime, props.timeDelta);

    return (
        <>
            <div className="rounded-lg border-[1px] border-[#CEE0F8]">
                <div className="p-[20px] flex items-center bg-white rounded-t-lg border-b-[1px] border-[#CEE0F8]">
                    <p className="text-2xl font-bold me-2">Metrics</p>
                    <p className="text-sm mt-[3px]">
                        {/* 09/08/2023 10:10 */}
                        {sDate}
                    </p>
                    <img src="arrow-right.svg" alt="" className="mt-[3px] mx-1 w-[10px]" />
                    <p className="text-sm mt-[3px]">{eDate}</p>
                </div>
                <div className="bg-[#F0F7FF80] p-3">
                    {loading ? (
                        <p className="text-sm">Loading Metrics, please wait...</p>
                    ) : error ? (
                        <p className="text-sm">Error loading metrics, please try again.</p>
                    ) : (
                        <>
                            <div className="flex w-100">
                                <div className="w-6/12 bg-white p-3 m-2 rounded-lg border-[1px] border-[#CEE0F8]">
                                    <Line
                                        data={data[0]}
                                        // @ts-expect-error option issue, needs to be fixed, still works
                                        options={getChartOptions("CPU Usage")}
                                        redraw={true}
                                    />
                                </div>
                                <div className="w-6/12 bg-white p-3 m-2 rounded-lg border-[1px] border-[#CEE0F8]">
                                    <Line
                                        data={data[1]}
                                        // @ts-expect-error option issue, needs to be fixed, still works
                                        options={getChartOptions("Memory Usage")}
                                        redraw={true}
                                    />
                                </div>
                            </div>
                            <div className="flex w-100">
                                <div className="w-6/12 bg-white p-3 m-2 rounded-lg border-[1px] border-[#CEE0F8]">
                                    <Line
                                        data={data[2]}
                                        // @ts-expect-error option issue, needs to be fixed, still works
                                        options={getChartOptions("Network Usage")}
                                        redraw={true}
                                    />
                                </div>
                                <div className="w-6/12 bg-white p-3 m-2 rounded-lg border-[1px] border-[#CEE0F8]">
                                    <Line
                                        data={data[3]}
                                        // @ts-expect-error option issue, needs to be fixed, still works
                                        options={getChartOptions("Disk IOPS")}
                                        redraw={true}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default PMetrics;
