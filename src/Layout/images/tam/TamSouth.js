import React, { useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import api from '../../../Api';
import { Context } from '../../../Store/Store';

export const TamSouth = () => {
  const [ state, dispatch ] = useContext(Context);
  const { turnouts } = state;

  const [error, setError] = useState(false);

  const handleMapClick = async (e) => {
    console.log('handleMapClick', e);
    console.log('e.target', e.target);
    console.log('e.target.parent', e.target.parent);
    console.log('id', e.target.id);
    // const id = e.target.id && e.target.id.startsWith('t')
    //   ? Number(e.target.id.substring(1))
    //   : null;
    // if (id) {
    //   let turnout = turnouts.find(t => t.turnoutId === id);
    //   console.log('turnout', turnout);

    //   try {
    //     const newCurrent = (turnout.current === turnout.divergent) ? turnout.straight : turnout.divergent;
    //     turnout = await api.turnouts.put({ turnoutId: turnout.turnoutId, current: newCurrent });
    //     await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
    //   } catch (err) {
    //     console.error(err);
    //     setError(err.toString());
    //   }

    // }
  }

  const handleTouchEnd = async (e) => {
    setError(`handleTouchEnd: ${e} `);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(undefined);
  };
 
  const getClassNames = () => turnouts.map(t => `turnout-${t.turnoutId}-${t.current === t.straight ? 'straight' : 'divergent'}`).join(' ');

  //https://transform.tools/html-to-jsx]
  

  return (
    <div className={getClassNames()}>
        <>
  {/*?xml version="1.0" encoding="UTF-8" standalone="no"?*/}
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1200 481"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: "1.5"
    }}
    onClick={handleMapClick}
  >
    <rect
      id="tamarack-junction-map"
      x={0}
      y={0}
      width={1200}
      height="480.791"
      style={{ fill: "none" }}
    />
    <clipPath id="_clip1">
      <rect x={0} y={0} width={1200} height="480.791" />
    </clipPath>
    <g clipPath="url(#_clip1)">
      <rect id="Background" x={-848} y="-119.209" width={2048} height={600} />
      <g id="Valley-Line" data-serif-id="Valley Line">
        <g id="Labels" />
        <g id="Lines">
          <path
            d="M1000,280l-160,160l92.478,-92.478"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M1000,240l-160,160l92.478,-92.478"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M860,300l-20,20l11.56,-11.56"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M520,320l-40,40l23.12,-23.12"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M560,240l-40,40l23.12,-23.12"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M680,240l-40,40l23.12,-23.12"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M240,280l-40,40l23.12,-23.12"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M1160,120l-120,120l69.359,-69.359"
            style={{ fill: "none", stroke: "#ced926", strokeWidth: 1 }}
          />
          <path
            d="M80,240l160,0"
            style={{ fill: "none", stroke: "#f2af0d", strokeWidth: 1 }}
          />
          <path
            d="M80,360l40,0"
            style={{ fill: "none", stroke: "#f2af0d", strokeWidth: 1 }}
          />
          <path
            d="M80,240l-40,40"
            style={{ fill: "none", stroke: "#f2af0d", strokeWidth: 1 }}
          />
          <path
            d="M160,200l-40,40"
            style={{ fill: "none", stroke: "#cc339f", strokeWidth: 1 }}
          />
          <path
            d="M360,160l-40,40"
            style={{ fill: "none", stroke: "#cc339f", strokeWidth: 1 }}
          />
          <path
            d="M40,280l0,40"
            style={{ fill: "none", stroke: "#f2af0d", strokeWidth: 1 }}
          />
          <path
            d="M160,320l-40,40"
            style={{ fill: "none", stroke: "#f2af0d", strokeWidth: 1 }}
          />
          <path
            d="M240,240l-40,40"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M1080,200l128,0"
            style={{ fill: "none", stroke: "#ced926", strokeWidth: 1 }}
          />
          <path
            d="M1120,160l88,0"
            style={{ fill: "none", stroke: "#ced926", strokeWidth: 1 }}
          />
          <path
            d="M1160,120l48,0"
            style={{ fill: "none", stroke: "#ced926", strokeWidth: 1 }}
          />
          <path
            d="M560,240l624,0"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M560,280l624,0"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M240,280l280,0"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M240,240l280,0"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M80,280l120,0"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M80,320l120,-0"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M80,320l-0,-40"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M1184,240l0,40"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M480,320l480,0"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M440,360l40,0"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M680,360l240,0"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M480,400l400,0"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M860,300l80,0"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M680,440l280,-0"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M680,440l-120,-120l59.649,59.649"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M680,360l-40,-40l19.883,19.883"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M880,280l-40,-40l19.883,19.883"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M560,280l-40,-40l19.883,19.883"
            style={{ fill: "none", stroke: "#0df228", strokeWidth: 1 }}
          />
          <path
            d="M480,320l-80,-80l39.766,39.766"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M440,360l-80,-80l39.766,39.766"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M160,200l160,-0"
            style={{ fill: "none", stroke: "#cc339f", strokeWidth: 1 }}
          />
          <path
            d="M600,400l-39.228,40l-80.772,0"
            style={{ fill: "none", stroke: "#00fffd", strokeWidth: 1 }}
          />
          <path
            d="M80,360l-40,-40"
            style={{ fill: "none", stroke: "#f2af0d", strokeWidth: 1 }}
          />
        </g>
        <g id="Turnouts">
          <g id="_307" data-serif-id={307}>
            <path
              d="M571.499,400l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M579.64,420.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_306" data-serif-id={306}>
            <path
              d="M640,400l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M640,400l20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_305" data-serif-id={305}>
            <path
              d="M640,320l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M640,320l20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_304" data-serif-id={304}>
            <path
              d="M560,320l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M560,320l20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_303" data-serif-id={303}>
            <path
              d="M491.499,320l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M499.64,340.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_302" data-serif-id={302}>
            <path
              d="M360,280l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M360,280l20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_301" data-serif-id={301}>
            <path
              d="M400,240l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M400,240l20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_403" data-serif-id={403}>
            <path
              d="M211.499,240l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M219.64,260.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_402" data-serif-id={402}>
            <path
              d="M131.499,320l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M139.64,340.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_401" data-serif-id={401}>
            <path
              d="M119,240.158l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M119.108,240.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_201" data-serif-id={201}>
            <path
              d="M1040,240.158l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M1040,240.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_202" data-serif-id={202}>
            <path
              d="M1080,200.158l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M1080,200.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_203" data-serif-id={203}>
            <path
              d="M1120.28,160.158l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M1120.28,160.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_110" data-serif-id={110}>
            <path
              d="M840,440.158l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M840.108,440.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_109" data-serif-id={109}>
            <path
              d="M840,400.158l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M840.108,400.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_108" data-serif-id={108}>
            <path
              d="M852,400l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M860.141,420.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_106" data-serif-id={106}>
            <path
              d="M911.54,300l28.502,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M919.682,320.158l20.157,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_107" data-serif-id={107}>
            <path
              d="M840,319.791l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M840,319.791l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_105" data-serif-id={105}>
            <path
              d="M891.499,359.791l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M899.64,379.948l20.158,-20.157"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_104" data-serif-id={104}>
            <path
              d="M931.499,320l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M939.64,340.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_103" data-serif-id={103}>
            <path
              d="M971.499,240l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M979.64,260.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_102" data-serif-id={102}>
            <path
              d="M971.499,280l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M979.64,300.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_101" data-serif-id={101}>
            <path
              d="M851.499,279.791l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M860.116,259.4l20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M840,239.791l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M839.959,239.009l20.157,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <g>
              <path
                d="M640,279.558l28.501,-0"
                style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
              />
              <path
                d="M659.884,259.674l-20.158,20.158"
                style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
              />
            </g>
            <path
              d="M651.499,239.791l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M680.041,239.516l-20.157,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
        </g>
        <g id="Routes">
          <g id="TS2">
            <path
              d="M779.981,357.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="748.27px"
              y="365.443px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              TS2
            </text>
          </g>
          <g id="TS1">
            <path
              d="M779.981,317.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="748.27px"
              y="325.443px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              TS1
            </text>
          </g>
          <g id="TS3">
            <path
              d="M779.981,397.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="748.27px"
              y="405.443px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              TS3
            </text>
          </g>
          <g id="TS4">
            <path
              d="M779.981,437.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="748.27px"
              y="445.443px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              TS4
            </text>
          </g>
          <g id="VLYSB1">
            <path
              d="M328.323,236.798c-0,-2.072 -1.683,-3.754 -3.755,-3.754l-50.793,-0c-2.072,-0 -3.755,1.682 -3.755,3.754l0,7.51c0,2.072 1.683,3.754 3.755,3.754l50.793,0c2.072,0 3.755,-1.682 3.755,-3.754l-0,-7.51Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="278.868px"
              y="245.18px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="292.592px 300.393px " y="245.18px 245.18px ">
                Y{" "}
              </tspan>
              SB
            </text>
          </g>
          <g id="VLYSB2">
            <path
              d="M789.151,237.036c0,-2.072 -1.682,-3.755 -3.754,-3.755l-50.794,0c-2.072,0 -3.754,1.683 -3.754,3.755l-0,7.509c-0,2.072 1.682,3.755 3.754,3.755l50.794,-0c2.072,-0 3.754,-1.683 3.754,-3.755l0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="739.697px"
              y="245.418px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="753.42px 761.222px " y="245.418px 245.418px ">
                Y{" "}
              </tspan>
              SB
            </text>
          </g>
          <g id="VLYSB3">
            <path
              d="M1138.3,239.51c0,-2.073 -1.682,-3.755 -3.754,-3.755l-50.793,-0c-2.073,-0 -3.755,1.682 -3.755,3.755l-0,7.509c-0,2.072 1.682,3.754 3.755,3.754l50.793,0c2.072,0 3.754,-1.682 3.754,-3.754l0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="1088.85px"
              y="247.892px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="1102.57px 1110.37px " y="247.892px 247.892px ">
                Y{" "}
              </tspan>
              SB
            </text>
          </g>
          <g id="VLYNB2">
            <path
              d="M789.102,277.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-50.793,0c-2.072,0 -3.754,1.683 -3.754,3.755l-0,7.509c-0,2.072 1.682,3.755 3.754,3.755l50.793,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="739.648px"
              y="285.418px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="753.371px 761.173px " y="285.418px 285.418px ">
                Y{" "}
              </tspan>
              NB
            </text>
          </g>
          <g id="VLYNB1">
            <path
              d="M328.323,276.798c-0,-2.072 -1.683,-3.754 -3.755,-3.754l-50.793,-0c-2.072,-0 -3.755,1.682 -3.755,3.754l0,7.51c0,2.072 1.683,3.754 3.755,3.754l50.793,0c2.072,0 3.755,-1.682 3.755,-3.754l-0,-7.51Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="278.868px"
              y="285.18px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="292.592px 300.393px " y="285.18px 285.18px ">
                Y{" "}
              </tspan>
              NB
            </text>
          </g>
          <g id="VLYNB3">
            <path
              d="M1098.3,277.036c0,-2.072 -1.682,-3.755 -3.754,-3.755l-50.793,0c-2.073,0 -3.755,1.683 -3.755,3.755l-0,7.509c-0,2.072 1.682,3.755 3.755,3.755l50.793,-0c2.072,-0 3.754,-1.683 3.754,-3.755l0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="1048.85px"
              y="285.418px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="1062.57px 1070.37px " y="285.418px 285.418px ">
                Y{" "}
              </tspan>
              NB
            </text>
          </g>
          <g id="TSF1">
            <path
              d="M939.981,437.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="908.27px"
              y="445.443px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              TSF1
            </text>
          </g>
          <g id="ENG1">
            <path
              d="M539.981,437.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="502.223px"
              y="445.726px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              EN
              <tspan x="520.651px 531.6px " y="445.726px 445.726px ">
                G1
              </tspan>
            </text>
          </g>
          <g id="ENG2">
            <path
              d="M539.981,397.036c-0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="501.271px"
              y="405.726px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              EN
              <tspan x="519.698px 530.648px " y="405.726px 405.726px ">
                G2
              </tspan>
            </text>
          </g>
          <g id="VLYSMT">
            <path
              d="M270.656,197.036c-0,-2.072 -1.683,-3.755 -3.755,-3.755l-53.802,0c-2.072,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.683,3.755 3.755,3.755l53.802,-0c2.072,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="212.91px"
              y="204.866px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="226.634px 234.435px " y="204.866px 204.866px ">
                Y/
              </tspan>
              SMT
            </text>
          </g>
          <g id="VLYPS">
            <path
              d="M63.51,299.438c-0,-2.072 -1.683,-3.755 -3.755,-3.755l-40.341,0c-2.072,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.683,3.755 3.755,3.755l40.341,-0c2.072,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="19.968px"
              y="307.82px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              VL
              <tspan x="33.692px 41.493px " y="307.82px 307.82px ">
                Y{" "}
              </tspan>
              PS
            </text>
          </g>
          <g id="UL">
            <path
              d="M1159.96,197.036c-0,-2.072 -1.683,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.072,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="1131.82px"
              y="205.602px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              UL
            </text>
          </g>
          <g id="IND1">
            <path
              d="M1179.94,157.036c-0,-2.072 -1.683,-3.755 -3.755,-3.755l-32.453,0c-2.072,0 -3.754,1.683 -3.754,3.755l-0,7.509c-0,2.072 1.682,3.755 3.754,3.755l32.453,-0c2.072,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="1144.83px"
              y="165.726px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              IND1
            </text>
          </g>
          <g id="IND2">
            <path
              d="M1200,117.036c0,-2.072 -1.682,-3.755 -3.755,-3.755l-32.452,0c-2.072,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.683,3.755 3.755,3.755l32.452,-0c2.073,-0 3.755,-1.683 3.755,-3.755l0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#ff0100",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="1163.86px"
              y="125.726px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              IND2
            </text>
          </g>
        </g>
        <g id="Overlays">
          <rect
            id="overlay4"
            x={721}
            y="230.715"
            width="4.984"
            height="220.076"
            style={{ stroke: "#000", strokeWidth: 3 }}
          />
          <rect
            id="overlay3"
            x="345.49"
            y="239.139"
            width="5.002"
            height="42.828"
            style={{ stroke: "#000", strokeWidth: 3 }}
          />
          <rect
            id="overlay2"
            x="250.976"
            y="239.139"
            width="5.002"
            height="42.828"
            style={{ stroke: "#000", strokeWidth: 3 }}
          />
          <rect
            id="overlay1"
            x={794}
            y="230.715"
            width="4.984"
            height="220.076"
            style={{ stroke: "#000", strokeWidth: 3 }}
          />
          <g id="XOVER">
            <path
              d="M882.177,355.791l-8.177,8.177"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
            <path
              d="M886,357.791l-8.177,8.177"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
            <path
              d="M886,363.791l-8.177,-8.178"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
            <path
              d="M882.177,365.968l-8.177,-8.177"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
          </g>
          <g id="XOVER1" data-serif-id="XOVER">
            <path
              d="M542.177,255.791l-8.177,8.177"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
            <path
              d="M546,257.791l-8.177,8.177"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
            <path
              d="M546,263.791l-8.177,-8.178"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
            <path
              d="M542.177,265.968l-8.177,-8.177"
              style={{ fill: "none", stroke: "#000", strokeWidth: 3 }}
            />
          </g>
        </g>
      </g>
      <g id="Summit-Line" data-serif-id="Summit Line">
        <g id="Lines1" data-serif-id="Lines">
          <path
            d="M560,40.791l280,-0"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
          <path
            d="M720,120.791l320,-0"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
          <path
            d="M40,120.791l480,-0l40.976,-40.977l119.024,0l39.802,39.803"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
          <path
            d="M520,120.791l120,-0"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
          <path
            d="M1040,120.791l-0,40"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
          <path
            d="M840,40.791l80,80"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
          <path
            d="M40,160.791l0,-40"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
          <path
            d="M40,160.791l1000,-0"
            style={{ fill: "none", stroke: "#0028ff", strokeWidth: 1 }}
          />
        </g>
        <g id="Turnouts1" data-serif-id="Turnouts">
          <g id="_501" data-serif-id={501}>
            <path
              d="M331.499,160l28.501,0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M339.64,180.158l20.158,-20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_204" data-serif-id={204}>
            <path
              d="M891.499,120l28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M899.64,99.842l20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
          <g id="_2031" data-serif-id={203}>
            <path
              d="M548.501,120l-28.501,-0"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
            <path
              d="M540.36,99.842l-20.158,20.158"
              style={{ fill: "none", stroke: "#818080", strokeWidth: 3 }}
            />
          </g>
        </g>
        <g id="Routes1" data-serif-id="Routes">
          <g>
            <path
              d="M479.962,117.036c-0,-2.072 -1.683,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.072,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#0028ff",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="447.25px"
              y="125.443px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              SMT
            </text>
          </g>
          <g>
            <path
              d="M999.962,116.646c-0,-2.073 -1.683,-3.755 -3.755,-3.755l-32.452,-0c-2.073,-0 -3.755,1.682 -3.755,3.755l0,7.509c0,2.072 1.682,3.754 3.755,3.754l32.452,0c2.072,0 3.755,-1.682 3.755,-3.754l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#0028ff",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="967.25px"
              y="125.053px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              SMT
            </text>
          </g>
          <g>
            <path
              d="M627.408,117.036c0,-2.072 -1.682,-3.755 -3.754,-3.755l-47.308,0c-2.072,0 -3.754,1.683 -3.754,3.755l-0,7.509c-0,2.072 1.682,3.755 3.754,3.755l47.308,-0c2.072,-0 3.754,-1.683 3.754,-3.755l0,-7.509Z"
              style={{ fillOpacity: "0.87", stroke: "#0028ff", strokeWidth: 1 }}
            />
            <text
              x="578.799px"
              y="125.697px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              CT
              <tspan
                x="594.814px 602.615px 606.627px 614.39px "
                y="125.697px 125.697px 125.697px 125.697px "
              >
                Y ST
              </tspan>
            </text>
          </g>
          <g>
            <path
              d="M679.962,37.036c-0,-2.072 -1.683,-3.755 -3.755,-3.755l-32.452,0c-2.073,0 -3.755,1.683 -3.755,3.755l0,7.509c0,2.072 1.682,3.755 3.755,3.755l32.452,-0c2.072,-0 3.755,-1.683 3.755,-3.755l-0,-7.509Z"
              style={{
                fillOpacity: "0.87",
                stroke: "#0028ff",
                strokeOpacity: "0.68",
                strokeWidth: 1
              }}
            />
            <text
              x="645.28px"
              y="45.761px"
              style={{
                fontFamily: '"Futura-Medium", "Futura", sans-serif',
                fontWeight: 500,
                fontSize: 13,
                fill: "#fff"
              }}
            >
              MTN
            </text>
          </g>
        </g>
      </g>
    </g>
  </svg>
</>


      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error} />
    </div>);
}

export default TamSouth;