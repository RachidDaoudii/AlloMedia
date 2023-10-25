import React, { useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import NavBar from "./../components/NavBar";
function Dashboard() {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <NavBar />
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Bonjour {auth.username}, votre rôle est : {auth.role.name}
      </Typography>
    </div>
  );
}

export default Dashboard;
