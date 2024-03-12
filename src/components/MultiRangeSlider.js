import React, { useEffect, useRef, useState } from 'react';
import './multiRangeSlider.css';

const MultiRangeSliderTest = ({ onSliderChange }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);
  const range = useRef(null);
  const thumbLeft = useRef(null);
  const thumbRight = useRef(null);

  useEffect(() => {
    const value = Math.min(parseInt(minVal), parseInt(maxVal) - 1);
    setMinVal(value);
    onSliderChange([minVal, maxVal]);

    if (range.current) {
      thumbLeft.current.style.left = `${value}%`;
      range.current.style.left = `${value}%`;
    }
  }, [minVal]);

  useEffect(() => {
    const value = Math.max(parseInt(minVal) + 1, parseInt(maxVal));
    setMaxVal(value);
    onSliderChange([minVal, maxVal]);

    if (range.current) {
      thumbRight.current.style.right = `${100 - value}%`;
      range.current.style.right = `${100 - value}%`;
    }
  }, [maxVal]);

  return (
    <div className="middle">
      <div className="multi-range-slider">
        <input
          type="range"
          min="0"
          max="100"
          value={minVal}
          onChange={e => setMinVal(e.target.value)}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={maxVal}
          onChange={e => setMaxVal(e.target.value)}
        />

        <div className="slider">
          <div className="track"></div>
          <div className="range" ref={range}></div>
          <div className="thumb thumb-left" ref={thumbLeft}></div>
          <div className="thumb thumb-right" ref={thumbRight}></div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSliderTest;
