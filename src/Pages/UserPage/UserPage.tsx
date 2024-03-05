import React, { useEffect } from "react";
import { useSOP } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const { logout, isLoggedIn, getUserSession } = useSOP();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const userSession = getUserSession();

  return (
    <div className="test">
      <div>UserPage</div>
      <button onClick={handleLogout}>Wyloguj się</button>
      {userSession && (
        <div>
          <h2>Informacje z sesji użytkownika:</h2>
          <pre>{JSON.stringify(userSession, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
