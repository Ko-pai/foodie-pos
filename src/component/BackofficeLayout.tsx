import React, { ReactNode, useEffect } from "react";

import HeadBar from "./AppBar";
import { Box } from "@mui/material";
import { SideBar } from "./SideBar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createApp } from "@/store/slices/appSlice";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  const session = useSession();
  const { data } = session;
  const { init, isLoading } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!init) {
      dispatch(createApp({}));
    }
  }, []);

  return (
    <Box sx={{ height: { xs: "100%", md: "auto" }, bgcolor: "#ffffff" }}>
      <HeadBar />
      <Box sx={{ display: "flex" }}>
        {data && <SideBar />}
        <Box
          sx={{
            width: "100%",
            height: { xs: "100%", md: "100vh" },
            p: 2,
            bgcolor: "#ffffff",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
