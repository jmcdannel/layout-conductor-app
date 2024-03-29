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
    console.log('id', e.target.id);
    const id = e.target.id && e.target.id.startsWith('t')
      ? Number(e.target.id.substring(1))
      : null;
    if (id) {
      let turnout = turnouts.find(t => t.turnoutId === id);
      console.log('turnout', turnout);

      try {
        const newCurrent = (turnout.current === turnout.divergent) ? turnout.straight : turnout.divergent;
        turnout = await api.turnouts.put({ turnoutId: turnout.turnoutId, current: newCurrent });
        await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
      } catch (err) {
        console.error(err);
        setError(err.toString());
      }

    }
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

  return (
    <div>
    <svg width="100%" height="100%" viewBox="0 0 155 90" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLineJoin: 'round', strokeMiterLimit: '1.5' }}>
      <g transform="matrix(1,0,0,1,-66.0732,0)">
          <g id="Artboard-4" transform="matrix(0.701398,0,0,0.817859,63.9469,98.1431)">
              <rect x="3.032" y="-120" width="220.969" height="110"/>
              <clipPath id="_clip1">
                  <rect x="3.032" y="-120" width="220.969" height="110"/>
              </clipPath>
              <g clipPath="url(#_clip1)">
                  <g id="Layer4">
                  </g>
                  <g id="lines" transform="matrix(1.42572,0,0,1.2227,-91.1706,-120)">
                      <path d="M210.073,24L150.027,84.046" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '2px' }} />
                      <g transform="matrix(0.834661,0,0,0.834661,32.7493,1.98407)">
                          <path d="M198.073,12L126.188,83.886" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '2.4px' }} />
                      </g>
                      <path d="M66.073,84.404L198.073,84.404" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '2px' }} />
                      <g transform="matrix(1.33333,0,0,1.33333,-22.0244,-23.9829)">
                          <path d="M66.073,71.949L138.073,71.949" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '1.5px' }} />
                      </g>
                      <path d="M66.073,60L174.073,60" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '2px' }} />
                      <path d="M66.073,47.943L186.073,47.943" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '2px' }} />
                      <path d="M174.073,36L138.073,36" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '2px' }} />
                      <path d="M138.073,36L126.367,47.706" style={{ fill: 'none', stroke: 'rgb(34,219,255)', strokeWidth: '2px' }} />
                      <g transform="matrix(1,0,0,1,0,0.113241)">
                          <path d="M221.06,11.887L66.073,11.887" style={{ fill: 'none', stroke: 'rgb(0,171,0)', strokeWidth: '2px' }} />
                      </g>
                      <g transform="matrix(0.0774259,0.0774259,-0.0792739,0.0792739,145.9,5.94191)">
                          <path d="M221.06,11.887L66.073,11.887" style={{ fill: 'none', stroke: 'rgb(0,171,0)', strokeWidth: '18.05px' }} />
                      </g>
                      <g transform="matrix(1,0,0,1,7.10543e-15,12.1132)">
                          <path d="M221.06,11.887L66.073,11.887" style={{ fill: 'none', stroke: 'rgb(0,171,0)', strokeWidth: '2px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t110" transform="matrix(1.42572,0,0,1.2227,-91.1706,-120)">
                      <g transform="matrix(1,0,0,1,-1.09602,-0.05725)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                      <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,20.1388,146.307)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t109" transform="matrix(1.42572,0,0,1.2227,-108.416,-105.258)">
                      <g transform="matrix(1,0,0,1,-1.09602,-0.05725)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                      <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,20.1388,146.307)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t108" transform="matrix(1.42572,0,0,1.2227,-128.024,-89.0408)">
                      <g transform="matrix(1,0,0,1,3.88808,11.0838)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                      <g transform="matrix(0.506722,-0.506722,0.506722,0.506722,64.6929,121.038)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '3.35px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t107" transform="matrix(1.42572,0,0,1.2227,-128.024,-89.0408)">
                      <g transform="matrix(0.91349,0,0,1,16.9081,-1.37165)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.51px' }} />
                      </g>
                      <g transform="matrix(0.369716,-0.369716,0.506722,0.506722,93.8252,92.3955)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '3.83px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t106" transform="matrix(1.42572,0,0,1.2227,-162.226,-89.0408)">
                      <g transform="matrix(1,0,0,1,4.49271,-25.3775)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                      <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,20.7434,109.846)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t105" transform="matrix(1.42572,0,0,1.2227,-146.23,-102.198)">
                      <g transform="matrix(0.896877,0,0,0.932393,23.1727,12.6855)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.62px' }} />
                      </g>
                      <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,21.4699,144.69)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t104" transform="matrix(1.42572,0,0,1.2227,-110.384,-132.549)">
                      <g transform="matrix(0.839868,0,0,0.932393,30.1429,1.50832)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.7px' }} />
                      </g>
                      <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,21.4699,144.69)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t103" transform="matrix(1.42572,0,0,1.2227,-59.0314,-147.221)">
                      <g transform="matrix(0.839868,0,0,0.932393,30.1429,1.50832)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.7px' }} />
                      </g>
                      <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,21.4699,144.69)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} className="turnout" id="t102" transform="matrix(1.42572,0,0,1.2227,-76.19,-161.894)">
                      <g transform="matrix(0.839868,0,0,0.932393,30.1429,1.50832)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.7px' }} />
                      </g>
                      <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,21.4699,144.69)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.4px' }} />
                      </g>
                  </g>
                  <g onClick={handleMapClick} onTouchEnd={handleTouchEnd} className="turnout" id="t101" transform="matrix(1.42572,0,0,1.2227,-112.2,-161.09)">
                      <g transform="matrix(0.839868,0,0,0.932393,21.1807,0.851025)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.7px' }} />
                      </g>
                      <g transform="matrix(0.839868,0,0,0.932393,19.3909,12.851)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.7px' }} />
                      </g>
                      <g transform="matrix(0.798458,0.798458,-0.798458,0.798458,65.9963,-129.873)">
                          <path d="M174.073,48L184.499,48" style={{ strokeWidth: '2.13px' }} />
                      </g>
                  </g>
              </g>
          </g>
          <g id="Layer3">
          </g>
      </g>
    </svg>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error} />
    </div>);
}

export default TamSouth;