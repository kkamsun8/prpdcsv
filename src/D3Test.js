import React, { useRef, useEffect, useState } from 'react';
// import { select, utcParse, scaleBand, axisBottom, axisLeft, scaleLinear, csv, scale, max } from 'd3';
import * as d3 from 'd3'
import styled from 'styled-components'
import { update } from 'plotly.js';

// const data = [25, 30, 45, 60, 20];
const w = 500;
const h = 300;
const padding = 30;

const D3Test = () => {
    const svgRef = useRef();
    const [data, setData] = useState([[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
    [600, 150]
    ]);

    useEffect(() => {
        //스케일을 만든다.
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[0])])
            .range([padding, w - padding * 2]);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[1])])
            .range([h - padding, padding]);
        const rScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[1])])
            .range([2, 5]);

        //SVG를 생성
        const svg = d3.select(svgRef.current)
            .attr("width", w)
            .attr("height", h);

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", d => rScale(d[1]));

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(d => d[0] + "," + d[1])
            .attr("x", d => xScale(d[0]))
            .attr("y", d => yScale(d[1]))
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "red");

        // X축 생성
        const xAxis = d3.axisBottom()
            .scale(xScale);

        svg.append("g")
            .attr("transform", `translate(0,${h - padding})`)
            .call(xAxis);

        // Y축 생성
        const yAxis = d3.axisLeft()
            .scale(yScale);

        svg.append("g")
            .attr("transform", `translate(${padding},0)`)
            .call(yAxis);

    }, [data]);

    const increaseData = () => {
        setData(data.map((value) => value + 5));
    };
    const decreaseData = () => {
        setData(data.map((value) => value - 5));
    };

    return (
        <>
            <svg ref={svgRef}>
            </svg>
        </>
    )
}

export default D3Test
