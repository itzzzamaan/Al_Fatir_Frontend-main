import React from "react";

const SkeletonLoader = ({ count = 6, style = {} }) => {
  const defaultStyle = {
    card: {
      backgroundColor: "#f5f5f5",
      borderRadius: "5px",
      padding: "16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "1.5rem",
    },
    image: {
      width: "100%",
      height: "200px",
      background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
      backgroundSize: "200% 100%",
      animation: "skeleton-loading 1.5s infinite",
      borderRadius: "4px",
    },
    text: {
      width: "80%",
      height: "15px",
      background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
      backgroundSize: "200% 100%",
      animation: "skeleton-loading 1.5s infinite",
      borderRadius: "4px",
      marginTop: "10px",
    },
    button: {
      width: "50%",
      height: "20px",
      background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
      backgroundSize: "200% 100%",
      animation: "skeleton-loading 1.5s infinite",
      borderRadius: "4px",
      marginTop: "15px",
    },
  };

  const mergedStyle = {
    ...defaultStyle,
    ...style,
  };

  return (
    <div className="row">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-sm-12">
          <div style={mergedStyle.card}>
            <div style={mergedStyle.image}></div>
            <div style={mergedStyle.text}></div>
            <div style={mergedStyle.text}></div>
            <div style={mergedStyle.button}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
