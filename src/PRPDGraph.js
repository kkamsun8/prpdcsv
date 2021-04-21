import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import _, { map } from 'underscore';

const w = 300;
const h = 200;
const padding = 30;

const PRPDGraph = ({ data }) => {

    const svgRef = useRef();

    const xScale = d3.scaleLinear()
        .domain([0, 255])
        .range([padding, w - padding * 2]);
    const yScale = d3.scaleLinear()
        .domain([0, 255])
        .range([h - padding, padding]);
    const zScale = d3.scaleLinear()
        .domain([0, 0.8, 1.6, 8, 54.4, 80])
        .range(['#fafafa', '#2f2f2f', '#999999', '#ff5f59', '#ff0000', '#ffd659'])
    const rectW = w / 256;
    const rectH = h / 256;

    useEffect(() => {

        const prpdData = [];
        while (data.length) prpdData.push(data.splice(0, 256));
        // console.log(`PRPDData=${prpdData}`);
        const prpd = _.unzip(prpdData)

        let chartData = [];

        for (let index = 0; index < prpd.length; index++) {
            const buffer = prpd[index];
            for (let j = 0; j < prpd[index].length; j++) {
                chartData.push([j, index, buffer[j]]);
            }
        }


        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h);

        svg.selectAll("rect")
            .remove();

        svg.selectAll("g")
            .remove();

        svg.selectAll('rect')
            .data(chartData)
            .enter()
            .filter(d => d[2] != 0)
            .append("rect")
            .attr("x", d => xScale(d[0]))
            .attr("y", d => yScale(d[1]))
            .attr("width", rectW)
            .attr("height", rectH)
            .style("fill", d => zScale(d[2]))
            .exit().remove();

        const xAxis = d3.axisBottom()
            .scale(xScale);

        svg.append("g")
            .attr("transform", `translate(0,${h - padding})`)
            .call(xAxis)
            .exit().remove();

        // Y축 생성
        const yAxis = d3.axisLeft()
            .scale(yScale);

        svg.append("g")
            .attr("transform", `translate(${padding},0)`)
            .call(yAxis)
            .exit().remove();


    }, [data]);


    return (
        <>
            <svg className="flex m-4 " ref={svgRef}>
            </svg>
        </>
    )
}

export default PRPDGraph
