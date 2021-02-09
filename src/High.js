import React, { Component, Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsHeatmap from 'highcharts/modules/heatmap'
import HighchartsReact from "highcharts-react-official";
import _, { map } from 'underscore';

HighchartsHeatmap(Highcharts);

class High extends Component {
    render() {
        const series2 = this.props.data;    //App.js에서 데이터를 보내줄 예정
        const options = {
            chart: {
                type: "heatmap",
                marginTop: 20,
                marginBottom: 80,
                plotBorderWidth: 0,
                borderWidth: 0
            },
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },

            yAxis: {
                categories: ["None", "Delivery", "Installation", "C&C", "Action"],
                title: null
            },

            colorAxis: {
                min: 0,
                max: 100,
                reversed: false
            },

            legend: {
                align: "right",
                layout: "vertical",
                margin: 0,
                verticalAlign: "top",
                y: 25,
                symbolHeight: 280
            },

            plotOptions: {
                series: {
                    dataLabels: {
                        formatter: function () {
                            if (this.point.value > 0) {
                                return this.point.value;
                            }
                        }
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return (
                        "<b>" +
                        this.series.xAxis.categories[this.point.x] +
                        "</b> sold <br><b>" +
                        this.point.value +
                        "</b> items on <br><b>" +
                        this.series.yAxis.categories[this.point.y] +
                        "</b>"
                    );
                }
            },

            series: [
                {
                    name: "Sales per employee",
                    borderWidth: 1,
                    series2,
                    dataLabels: {
                        enabled: true,
                        color: "#000000"
                    }
                }
            ]
        };
        return (
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Fragment>
        );
    }
}
export default High;