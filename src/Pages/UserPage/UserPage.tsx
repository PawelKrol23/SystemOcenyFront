import React, { useEffect } from "react";
import { useSOP } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const { logout, isLoggedIn } = useSOP();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="test">
      <div>UserPage</div>
      <button onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
}
