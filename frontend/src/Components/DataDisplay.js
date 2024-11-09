// DataDisplay.js
import React from "react";

const DataDisplay = ({ data }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Original Data</h2>
      <p style={styles.dataText}><strong>Original:</strong> {data.Original}</p>
      <p style={styles.dataText}><strong>Corrupted:</strong> {data.Corrupted}</p>

      <h3 style={styles.header}>Results</h3>
      {Object.entries(data.Results).map(([method, result]) => (
        <div key={method} style={styles.methodContainer}>
          <h4 style={styles.subHeader}>{method}</h4>
          {Object.entries(result).map(([key, value]) => (
            <p key={key} style={styles.dataText}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1a1a1a", // Dark background
    color: "#ffffff",           // White text for contrast
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    color: "#00c4ff",
    marginBottom: "10px",
  },
  subHeader: {
    color: "#ff9500",
    marginTop: "10px",
    marginBottom: "5px",
  },
  methodContainer: {
    padding: "10px",
    border: "1px solid #333",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#2a2a2a"
  },
  dataText: {
    color: "#ffffff"
  }
};

export default DataDisplay;
