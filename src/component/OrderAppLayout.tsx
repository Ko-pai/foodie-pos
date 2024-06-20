import { AppBar, Box } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";

import React, { ReactNode, useEffect } from "react";
import HeadBarForOrderApp from "./HeadBarForOrderApp";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appSelector, createApp } from "@/store/slices/appSlice";
import { shallowEqual } from "react-redux";

interface Prop {
  children: ReactNode;
}

const OrderAppLayout = ({ children }: Prop) => {
  const { init, isLoading } = useAppSelector((state) => state.app);
  const router = useRouter();
  const { tableId } = router.query;
  const abc = router.pathname;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableId && !init) {
      dispatch(createApp({ tableId: String(tableId) }));
    }
  }, [tableId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <HeadBarForOrderApp />
      <Box>
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              color="warning"
              size="lg"
              value={40}
              variant="soft"
            />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default OrderAppLayout;
