import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import BackofficeLayout from "./BackofficeLayout";
import OrderAppLayout from "./OrderAppLayout";
import { useAppSelector } from "@/store/hook";
import { appSelector } from "@/store/slices/appSlice";
import { shallowEqual } from "react-redux";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const router = useRouter();
  const { tableId } = router.query;
  const pathName = router.pathname;
  const { init } = useAppSelector(appSelector, shallowEqual);

  const isBackofficeApp = pathName.includes("backoffice");
  const isOrderApp = tableId;

  if (isBackofficeApp) {
    return <BackofficeLayout>{children}</BackofficeLayout>;
  }

  if (isOrderApp) {
    return <OrderAppLayout>{children}</OrderAppLayout>;
  }

  return <Box>{children}</Box>;
};

export default Layout;
