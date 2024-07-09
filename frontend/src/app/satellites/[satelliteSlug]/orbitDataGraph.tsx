"use client";

import React, { useState, useLayoutEffect, useRef, SyntheticEvent } from 'react'
import { SatelliteNumber } from '@/lib/store'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js'
import { LaunchDateCountDownProps } from './launchDateCountDown';
import ScrollBarThumb from './_orbitDataGraphComponents/ScrollBarThumb';

type OrbitDataProps = {
  satNum : SatelliteNumber;
  launchDateString: LaunchDateCountDownProps['launchDate'];
  orbitalData: any;
} 

const OrbitDataGraph : React.FC<OrbitDataProps> = ({ satNum, launchDateString, orbitalData }) => {

  // href for the svg component, tracking the size of the container
  const svgContainer = useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = useState({width: 0, height: 0});
  {/* SB use for ScrollBar*/}
  const [scrollBarThumbWidth, setSBThumbWidth] = useState(0);

  // Handling button for zooming in and out of the graph on a time scale
  const launchDate = launchDateString? new Date(launchDateString) : new Date();
  const calculateMonthsDiff = () => {
    const currentDate = new Date();
    return currentDate.getMonth() - launchDate.getMonth() + (12 * (currentDate.getFullYear() - launchDate.getFullYear()));
  }

  const months = calculateMonthsDiff();

  const handleZoomClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // We round the width of the scrollbar thumb at one decimal
    const period = e.currentTarget.textContent;
    const regExp = new RegExp('^([1234567890]+)([my])$');
    const match = period?.match(regExp);
    let SBThumbWidth = 0;

    if (period === "All") {
      SBThumbWidth = svgSize.width*0.8-40.5;
      setSBThumbWidth(SBThumbWidth);
    } else {
      const number = match ? parseInt(match[1]) : 0;
      const periodType = match? match[2] : "";

      if (periodType === "m") {
        SBThumbWidth = Math.round((svgSize.width*0.8 * number *10) / months) / 10;
        setSBThumbWidth(SBThumbWidth);
      } else if (periodType === "y") {
        SBThumbWidth = Math.round((svgSize.width*0.8 * number * 12 *10) / months) / 10
        setSBThumbWidth(SBThumbWidth);
      }
    }
  }

  // Layout effect to track the size of the container and update the svg size
  useLayoutEffect(() => {
    const updateSize = () => {
      if (svgContainer.current) {
        const width = svgContainer.current.offsetWidth;
        const height = width / 2;
        setSvgSize({width, height});
        setSBThumbWidth( width*0.1 );
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
        <h1>
            Graph goes here.
        </h1>
        <div ref={svgContainer} className="w-full flex flex-col">
          <div className="zoom-container flex">
            <h2 className="mx-5 text-white">Zoom : </h2>
            {/* Scrollbar thumb represents the zoom period selected, in case it fits bad we don't display 
              ie. containerSize > SBThumbWidth > 20px */}
            { (Math.round((svgSize.width*0.8 * 1 * 10) / months) / 10 < svgSize.width) && (Math.round((svgSize.width*0.8 * 1 * 10) / months) / 10 > 20) && <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">1m</button> }
            { (Math.round((svgSize.width*0.8 * 3 * 10) / months) / 10 < svgSize.width) && (Math.round((svgSize.width*0.8 * 3 * 10) / months) / 10 > 40) && <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">3m</button> }
            { (Math.round((svgSize.width*0.8 * 6 * 10) / months) / 10 < svgSize.width) && (Math.round((svgSize.width*0.8 * 6 * 10) / months) / 10 > 40) && <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">6m</button> }
            { (Math.round((svgSize.width*0.8 * 12 * 10) / months) / 10 < svgSize.width) && (Math.round((svgSize.width*0.8 * 12 * 10) / months) / 10 > 40) && <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">1y</button> }
            { (Math.round((svgSize.width*0.8 * 12 * 5 * 10) / months) / 10 < svgSize.width) && (Math.round((svgSize.width*0.8 * 12 * 5 * 10) / months) / 10 > 40) && <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">5y</button> }
            { (Math.round((svgSize.width*0.8 * 12 * 10 * 10) / months) / 10 < svgSize.width) && (Math.round((svgSize.width*0.8 * 12 * 10 * 10) / months) / 10 > 40) && <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">10y</button> }
            { (Math.round((svgSize.width*0.8 * 12 * 20 * 10) / months) / 10 < svgSize.width) && (Math.round((svgSize.width*0.8 * 12 * 20 * 10) / months) / 10 > 40) && <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">20y</button> }

            <button onClick={handleZoomClick} className="mx-2 bg-[#f2f2f2] text-black w-10 h-8 rounded-lg hover:bg-[#cccccc]">All</button>
          </div>
          <div className="w-full flex justify-center items-center">
            <svg className="relative" width="100%" height="600">
                {/* Scrollbar for time navigation */}
                <g transform={`translate(${svgSize.width*0.1}, ${svgSize.height-75})`} fill="#f2f2f2">
                  <g>
                    <rect y="-50" width="80%" height="1"/>
                  </g>   
                  <rect width="80%" height="20"/>
                  {/* Scrollbar left navigation arrow */}
                  <g>
                    <rect x="0.5" y="0.5" width="19" height="19" fill="#e6e6e6" stroke="#cccccc" strokeWidth="1"/>
                    <path d="M 13 5 L 6 10 L 13 15" fill="#333333"/>
                  </g>
                  {/* Scrollbar right navigation arrow */}
                  <g transform={`translate(${svgSize.width*0.8 - 20}, 0)`}>
                    <rect x="0.5" y="0.5" width="19" height="19" fill="#e6e6e6" stroke="#cccccc" strokeWidth="1"/>
                    <path d="M 7 5 L 14 10 L 7 15" fill="#333333"/>
                  </g>
                  {/* Scrollbar thumb */}
                  <ScrollBarThumb scrollBarThumbWidth={scrollBarThumbWidth} svgContainerRect={{topLeft: (svgContainer.current?.getBoundingClientRect()?(svgContainer.current?.getBoundingClientRect().x) : 0) + svgSize.width*0.1 + 20.5 , width: (svgSize.width*0.8-40.5), height: 20}}/>
                </g>
            </svg>
          </div>
        </div>
    </>
  )
}

export default OrbitDataGraph;