import { useState, useEffect } from "react";
import "../components/Ghanekar.css";
import { APIURL } from "../url.config";

const CurtainReveal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("none");
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {

        const response = await fetch(`${APIURL}/api/get/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      } catch (error) {
        alert("Booking is full")
        console.error('Error verifying token:', error);
      }
    };

    checkAuth();
  }, []);

  const handleBookSeat = async () => {
    const token = localStorage.getItem('accessToken');
    setError("");
  
    if (!token) {
      alert("Be logged in first");
      setTimeout(() => {
        window.location.href = '/Login2';
      }, 1000); 
      return;
    }
  
    try {
      const response = await fetch(`${APIURL}/api/book-ticket/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        window.location.href = '/ticket-qr';
      } else if (response.status === 400) {
        const data = await response.json();
        alert("All tickets have been booked")
        setError(data.error || "All tickets have been booked");
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/Login2';
      }
    } catch (error) {
      alert("All tickets have been booked")
      console.error('Booking error:', error);
      setError("Failed to book ticket");
    }
  };

  return (
    <div className="curtain-wrapper">
      <div className="curtainBody">
        <div id="leftCurtain" className={`curtainContainer ${isOpen ? "open-left" : ""}`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="unCurtain"></div>
          ))}
        </div>
        <div id="rightCurtain" className={`curtainContainer ${isOpen ? "open-right" : ""}`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="unCurtain"></div>
          ))}
        </div>
      </div>

      <div className="content">
        {!isOpen && <p className="intro-text">🎭 Welcome to Ghanekar Theatre 🎞️</p>}

        {!isOpen && (
          <button className="welcome-button" onClick={() => setIsOpen(true)}>
            Let the Show Begin 🎬
          </button>
        )}

        {isOpen && (
          <button className="signup-button" onClick={handleBookSeat}>
            Book Your Seat 🎟️
          </button>
        )}
      </div>
    </div>
  );
};

export default CurtainReveal;