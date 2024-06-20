import Layout from "@/component/BackofficeLayout";
import MenuCard from "@/component/MenuCard";
import { config } from "@/config";
import { useAppDispatch } from "@/store/hook";
import { createApp } from "@/store/slices/appSlice";
import { NewMenu } from "@/types/menu";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const OfficeApp = () => {
  const session = useSession();
  const { data } = session;

  return (
    <Box>
      <h1>Hello</h1>
      {/* <Typography variant="h3">{data?.user?.name}</Typography>
      <MenuCard menu={getData}/> */}
    </Box>
  );
};

export default OfficeApp;
