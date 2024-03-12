import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';

function App() {
  // State to store legend counts
  const [legendCounts, setLegendCounts] = useState({
    Violation: 0,
    "Close Call": 0,
    Collision: 0,
    "Winnipeg Things": 0,
  });

  // Function to update legend counts
  const updateLegendCounts = (type) => {
    setLegendCounts(prevCounts => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1
    }));
  };

  return (
    <div className="App">
      <Map legendCounts={legendCounts} updateLegendCounts={updateLegendCounts} />
      <div className="legend-box">
        <h4>Legend</h4>
        <hr></hr>
        <p>Violations: {legendCounts.Violation}
          <span className="legend-square" style={{backgroundColor: '#0D99DA'}}></span>
        </p>
        <p>Close Calls: {legendCounts['Close Call']}
          <span className="legend-square" style={{backgroundColor: '#F4D91F'}}></span>
        </p>
        <p>Collisions: {legendCounts.Collision}
          <span className="legend-square" style={{backgroundColor: '#CB1F05'}}></span>
        </p>
        <p>Winnipeg Things: {legendCounts["Winnipeg Things"]}
          <span className="legend-square" style={{backgroundColor: '#8E3CE9'}}></span>
        </p>
      </div>
    </div>
  );
}

export default App;
