import { ChartData, Point } from "chart.js";
import { Line } from "react-chartjs-2";
import { getChartOptions } from "../../../../utils/utils";


const LineGraph = ({
    data,
    title,
}: {
    data: ChartData<"line", (number | Point | null)[], unknown>;
    title: string;
}) => {
    return (
        <Line
            data={data}
            // @ts-expect-error option issue, needs to be fixed, still works
            options={getChartOptions(title)}
            redraw={true}
        />
    );
};

export default LineGraph;
