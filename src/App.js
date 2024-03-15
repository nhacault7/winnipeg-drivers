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

  // Function to handle legend focus
  const handleLegendFocus = () => {
    setLegendVisible(true);
  };

  // Function to handle legend blur
  const handleLegendBlur = () => {
    setLegendVisible(false);
  };

  // Effect to focus legend on mount
  useEffect(() => {
    if (legendRef.current) {
      legendRef.current.focus();
    }
  }, []);

  return (
    <div className="App">
      <Map legendCounts={legendCounts} updateLegendCounts={updateLegendCounts} />
      <div
        ref={legendRef}
        className={`legend-box ${legendVisible ? "" : "collapsed"}`}
        tabIndex={0} // Add tabIndex to make the legend focusable
        onFocus={handleLegendFocus} // Expand legend on focus
        onBlur={handleLegendBlur} // Collapse legend on blur
      >
        <div className="legend-header">
          <h4>Legend</h4>
        </div>
        <hr></hr>
        <p>
          Violations: {legendCounts.Violation}
          <span className="legend-square" style={{ backgroundColor: "#0D99DA" }}></span>
        </p>
        <p>
          Close Calls: {legendCounts["Close Call"]}
          <span className="legend-square" style={{ backgroundColor: "#F4D91F" }}></span>
        </p>
        <p>
          Collisions: {legendCounts.Collision}
          <span className="legend-square" style={{ backgroundColor: "#CB1F05" }}></span>
        </p>
        <p>
          Road Rages: {legendCounts["Road Rage"]}
          <span className="legend-square" style={{ backgroundColor: "#000000" }}></span>
        </p>
        <p>
          Winnipeg Things: {legendCounts["Winnipeg Things"]}
          <span className="legend-square" style={{ backgroundColor: "#8E3CE9" }}></span>
        </p>
      </div>
    </div>
  );
}

export default App;
