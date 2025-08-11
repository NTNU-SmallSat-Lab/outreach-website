import Highcharts from "highcharts/highstock";

interface ChartTheme {
    background?: string;
    text?: string;
    accent?: string;
    line?: string;
    maskFill?: string;
    handleBorder?: string;
}

interface StockChartBaseConfigProps {
    title: string;
    yAxisArray: Highcharts.YAxisOptions[];
    yAxisTitle?: string;
    theme?: ChartTheme;
    enableNavigator?: boolean;
    enableZoom?: boolean;
    xAxisMargin?: number;
    titleMargin?: number;
    series?: Highcharts.SeriesOptionsType[];
    buttons?: Highcharts.RangeSelectorButtonsOptions[];
    legend?: Highcharts.LegendOptions;
    credits?: Highcharts.CreditsOptions;
    customOptions?: Highcharts.Options;
}

/** Creates a base configuration for a Highcharts stock chart.
 * @param {StockChartBaseConfigProps} config - Configuration options for the chart.
 * @returns {Highcharts.Options} - The base configuration object for the chart.
 */

export function createStockChartBaseConfig({
    title,
    yAxisArray = [],
    yAxisTitle = "",
    theme = {
        background: "transparent",
        text: "#ffffff",
        accent: "#00d3ff",
        line: "#ffffff",
        maskFill: "rgba(255, 255, 255, 0.2)",
        handleBorder: "#000000",
    },
    enableNavigator = true,
    enableZoom = true,
    xAxisMargin = 20,
    titleMargin = 20,
    customOptions = {},
    legend = {},
    series = [],
    buttons = [
        {
            type: "all",
            text: "All",
        },
        {
            type: "year",
            count: 1,
            text: "1Y",
        },
        { type: "ytd", count: 1, text: "YTD" },
    ],
    credits = {
        enabled: false, // Disable credits by default
    },
}: StockChartBaseConfigProps) {
    // Base yAxis configuration
    if (yAxisArray.length === 0) {
        yAxisArray.push({
            title: {
                text: yAxisTitle,
                style: {
                    color: theme.text,
                    fontSize: "18px",
                },
            },
            labels: {
                style: {
                    color: theme.text,
                    fontSize: "14px",
                },
            },
            tickColor: theme.line,
            lineColor: theme.line,
        });
    }
    return {
        chart: {
            backgroundColor: theme.background,
            reflow: true,
            zoomType: enableZoom ? "x" : undefined,
        },
        title: {
            margin: titleMargin,
            text: title,
            style: {
                color: theme.text,
                fontSize: "24px",
            },
        },
        xAxis: {
            type: "datetime",
            title: {
                style: {
                    color: theme.text,
                    fontSize: "18px",
                },
                margin: xAxisMargin,
            },
            labels: {
                style: {
                    color: theme.text,
                    fontSize: "14px",
                },
                // Handling date formatting based on zoom level
                formatter: function (
                    //eslint-disable-next-line no-unused-vars
                    this: Highcharts.AxisLabelsFormatterContextObject,
                ): string {
                    const extremes = this.axis.getExtremes();
                    const zoomLevel = extremes.max - extremes.min; // Get the current zoom range
                    if (zoomLevel <= 10 * 24 * 3600 * 1000) {
                        return (
                            Highcharts.dateFormat("%H:%M", Number(this.value)) +
                            "<br>" +
                            Highcharts.dateFormat(
                                "%d %b %Y",
                                Number(this.value),
                            )
                        );
                    } else if (zoomLevel <= 12 * 30 * 24 * 3600 * 1000) {
                        return Highcharts.dateFormat(
                            "%d %b %Y",
                            Number(this.value),
                        ); // Show day, month, and year
                    } else if (zoomLevel <= 10 * 12 * 30 * 24 * 3600 * 1000) {
                        // If zoomed in to less than or equal to 1 month
                        return Highcharts.dateFormat(
                            "%b %Y",
                            Number(this.value),
                        ); // Show month and year
                    } else {
                        return Highcharts.dateFormat("%Y", Number(this.value)); // Show only the year
                    }
                },
            },
            tickColor: theme.line,
            lineColor: theme.line,
        },
        yAxis: yAxisArray.map((axis: Highcharts.YAxisOptions) => ({
            ...axis,
        })),
        navigator: {
            enabled: enableNavigator,
            outlineColor: theme.line,
            maskFill: theme.maskFill,
            handles: {
                backgroundColor: theme.line,
                borderColor: theme.handleBorder,
            },
        },
        rangeSelector: {
            enabled: true, // Enable the range selector
            buttonSpacing: 10, // Space between buttons
            buttonTheme: {
                fill: "#333333",
                stroke: "#ffffff",
                "stroke-width": 2, // Border width
                r: 5,
                width: 100, // Explicitly set the button width
                height: 30, // Explicitly set the button height
                style: {
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap", // Prevent text wrapping
                },
                states: {
                    hover: {
                        fill: "#555555", // Background color on hover
                        style: {
                            color: "#ffffff", // Text color on hover
                        },
                    },
                    select: {
                        fill: "#00d3ff", // Background color when selected
                        style: {
                            color: "#000000", // Text color when selected
                        },
                    },
                },
            },
            labelStyle: {
                color: "#ffffff", // Customize the "Zoom" label color
                fontSize: "14px",
            },
            inputEnabled: false, // Disable input fields
            buttons: buttons, // Use the provided buttons
            selected: 0, // Default selected button
        },
        legend: legend,
        credits: credits,
        series: series.map((serie) => ({
            ...serie,
            showInNavigator: true, // Ensure series appear in the navigator
            navigatorOptions: {
                type: "line",
                lineWidth: 1,
            },
        })),
        ...customOptions,
    };
}
