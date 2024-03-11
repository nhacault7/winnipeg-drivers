import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';

function App() {
  // State to store legend counts
  const [legendCounts, setLegendCounts] = useState({
    Violation: 0,
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
        <p>Violations: {legendCounts.Violation}</p>
        <p>Collisions: {legendCounts.Collision}</p>
        <p>Winnipeg Things: {legendCounts["Winnipeg Things"]}</p>
      </div>
      <Map />
    </div>
  );
}

export default App;
