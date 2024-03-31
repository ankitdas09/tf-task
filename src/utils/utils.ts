export function getChartOptions(title: string) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
                align: "start",
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    useBorderRadius: true,
                    borderRadius: 1.2,
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                },
            },
            title: {
                display: true,
                text: title,
                position: "top",
                align: "start",
                font: {
                    size: 14,
                    weight: "bold",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true, // Enable autoSkip
                    maxTicksLimit: 12, // Maximum number of ticks
                },
            },
            y: {
                position: "right",
                beginAtZero: true,
            },
        },
    };
    return options;
}

export function getFormatedDateTime(lastFetchedTime: number, timeDelta: number) {
    const sTime = new Date(lastFetchedTime - timeDelta * 60 * 1000);
    const eTime = new Date(lastFetchedTime);
    const sDate =
        (sTime.getUTCDate() < 10 ? `0${sTime.getUTCDate()}` : sTime.getUTCDate()) +
        "/" +
        (sTime.getUTCMonth() < 10 ? `0${sTime.getUTCMonth()}` : sTime.getUTCMonth()) +
        "/" +
        sTime.getUTCFullYear().toString() +
        " " +
        sTime.getUTCHours().toString() +
        ":" +
        (sTime.getUTCMinutes() < 10 ? `0${sTime.getUTCMinutes()}` : sTime.getUTCMinutes());
    const eDate =
        (eTime.getUTCDate() < 10 ? `0${eTime.getUTCDate()}` : eTime.getUTCDate()) +
        "/" +
        (eTime.getUTCMonth() < 10 ? `0${eTime.getUTCMonth()}` : eTime.getUTCMonth()) +
        "/" +
        eTime.getUTCFullYear().toString() +
        " " +
        eTime.getUTCHours().toString() +
        ":" +
        (eTime.getUTCMinutes() < 10 ? `0${eTime.getUTCMinutes()}` : eTime.getUTCMinutes());
    return [sDate, eDate];
}
