import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Map from './components/Map';

function App() {
  // Ref for the legend box
  const legendRef = useRef(null);

  // State to store legend counts and visibility
  const [legendCounts, setLegendCounts] = useState({
    Violation: 0,
    "Close Call": 0,
    Collision: 0,
    "Road Rage": 0,
    "Winnipeg Things": 0,
  });
  const [legendVisible, setLegendVisible] = useState(true);

  // Function to update legend counts
  const updateLegendCounts = (type) => {
    setLegendCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  // Function to toggle legend visibility
  const toggleLegendVisibility = () => {
    setLegendVisible((prevVisible) => !prevVisible);
  };

  // Function to handle clicks outside the legend
  const handleClickOutside = (event) => {
    if (legendRef.current && !legendRef.current.contains(event.target)) {
      setLegendVisible(false);
    }
  };

  // Effect to add event listeners on mount
  useEffect(() => {
    // Add event listener for clicks
    document.body.addEventListener('mousedown', handleClickOutside);
    // Add event listener for touch events
    document.body.addEventListener('touchstart', handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
      document.body.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <Map legendCounts={legendCounts} updateLegendCounts={updateLegendCounts} />
      <div ref={legendRef} className={`legend-box ${legendVisible ? "" : "collapsed"}`} onClick={toggleLegendVisibility}>
        <div className="legend-header">
          <h4>Legend</h4>
        </div>
        <hr></hr>
        <p className="legend-entry">
          <span className="legend-square" style={{ backgroundColor: "#0D99DA" }}></span>
          <span className="legend-name">Violations:</span>
          <span className="legend-count">{legendCounts.Violation}</span>
        </p>
        <p className="legend-entry">
          <span className="legend-square" style={{ backgroundColor: "#F4D91F" }}></span>
          <span className="legend-name">Close Calls:</span>
          <span className="legend-count">{legendCounts["Close Call"]}</span>
        </p>
        <p className="legend-entry">
          <span className="legend-square" style={{ backgroundColor: "#CB1F05" }}></span>
          <span className="legend-name">Collisions:</span>
          <span className="legend-count">{legendCounts.Collision}</span>
        </p>
        <p className="legend-entry">
          <span className="legend-square" style={{ backgroundColor: "#000000" }}></span>
          <span className="legend-name">Road Rages:</span>
          <span className="legend-count">{legendCounts["Road Rage"]}</span>
        </p>
        <p className="legend-entry">
          <span className="legend-square" style={{ backgroundColor: "#8E3CE9" }}></span>
          <span className="legend-name">Winnipeg Things:</span>
          <span className="legend-count">{legendCounts["Winnipeg Things"]}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
