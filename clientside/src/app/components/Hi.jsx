import React, { useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Hi() {
  const auth = useSelector((state) => state.auth);
  toast.success(`Bonjour ${auth.username}, votre rôle est : ${auth.role.name}`);

  return (
    <div>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Bonjour {auth.username}, votre rôle est : {auth.role.name}
      </Typography>
    </div>
  );
}

export default Hi;
