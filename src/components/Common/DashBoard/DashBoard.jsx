import React from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { token, logOut } = useAuth();

  return (
    <div>
      {token ? (
        <>
          <h1>Dashboard</h1>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default Dashboard;
