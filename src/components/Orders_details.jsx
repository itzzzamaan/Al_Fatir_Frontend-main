import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Orders_details = () => {
  const { orderId } = useParams();
   
    return (
       <div>
        <Header/>
         <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-stepper" style={{ borderRadius: "10px" }}>
                  <div className="card-body p-4">
    
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex flex-column">
                        <p>{orderId}</p>
                        <span className="lead fw-normal">Your order has been delivered</span>
                        <span className="text-muted small">by DHFL on 21 Jan, 2020</span>
                      </div>
                      <div>
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-outline-primary"
                          type="button"
                        >
                          Track order details
                        </button>
                      </div>
                    </div>
    
                    <hr className="my-4" />
    
                    <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                      <span className="dot"></span>
                      <hr className="flex-fill track-line" />
                      <span className="dot"></span>
                      <hr className="flex-fill track-line" />
                      <span className="dot"></span>
                      <hr className="flex-fill track-line" />
                      <span className="dot"></span>
                      <hr className="flex-fill track-line" />
                      <span className="d-flex justify-content-center align-items-center big-dot dot">
                        <i className="fa fa-check text-white"></i>
                      </span>
                    </div>
    
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div className="d-flex flex-column align-items-start">
                        <span>15 Mar</span>
                        <span>Order placed</span>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <span>15 Mar</span>
                        <span>Order placed</span>
                      </div>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <span>15 Mar</span>
                        <span>Order Dispatched</span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <span>15 Mar</span>
                        <span>Out for delivery</span>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <span>15 Mar</span>
                        <span>Delivered</span>
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
       </div>
      );
    };
    
    const styles = `
    .track-line {
      height: 2px !important;
      background-color: #488978;
      opacity: 1;
    }
    
    .dot {
      height: 10px;
      width: 10px;
      margin-left: 3px;
      margin-right: 3px;
      margin-top: 0px;
      background-color: #488978;
      border-radius: 50%;
      display: inline-block;
    }
    
    .big-dot {
      height: 25px;
      width: 25px;
      margin-left: 0px;
      margin-right: 0px;
      margin-top: 0px;
      background-color: #488978;
      border-radius: 50%;
      display: inline-block;
    }
    
    .big-dot i {
      font-size: 12px;
    }
    
    .card-stepper {
      z-index: 0;
    }
    `;
    
    export default Orders_details;
    
    // Add this to the component to dynamically inject the CSS
    if (typeof document !== "undefined") {
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }
    