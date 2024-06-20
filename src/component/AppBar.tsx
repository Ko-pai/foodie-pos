import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import SignInButton from "../pages/auth/SignInButton";
import LogoutButton from "./LogoutButton";
import { useAppSelector } from "@/store/hook";

const HeadBar = () => {
  const session = useSession();
  const { data } = session;
  const { selectedLocation } = useAppSelector((state) => state.app);
  return (
    <AppBar position="static" sx={{ background: "#b6733f" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          Foodie Pos
        </Typography>
        <Typography variant="h6">{selectedLocation?.name}</Typography>
        {data && <LogoutButton />}
      </Toolbar>
    </AppBar>
  );
};

export default HeadBar;
