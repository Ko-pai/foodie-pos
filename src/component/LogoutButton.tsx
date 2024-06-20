import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        color: "#6C584C",
        bgcolor: "#e9fc90",
        fontWeight: "bold",
        "&:hover": {
          bgcolor: "#DDE5B6",
        },
      }}
      onClick={() => {
        signOut({ callbackUrl: "/backoffice" });
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
