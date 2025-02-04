import React from "react";

const OrderConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "30px",
          width: "90%",
          maxWidth: "450px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "15px",
            color: "#333",
          }}
        >
          Confirm Your Order
        </div>
        <p style={{ color: "#555", fontSize: "1rem", marginBottom: "25px" }}>
          Are you sure you want to confirm this order? Once confirmed .
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <button
            style={{
              padding: "10px 25px",
              backgroundColor: "#ff4d4d",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "10px 25px",
              backgroundColor: "#28a745",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
