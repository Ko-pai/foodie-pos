import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";

import { hideSnackBar } from "../store/slices/appSnackbarSlice";

const SnackBar = () => {
  const { type, message, open } = useAppSelector((state) => state.showSnack);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackBar());
    }, 3000);
  }, [message]);

  return (
    <div>
      <Snackbar
        open={open}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => dispatch(hideSnackBar())}
          variant="filled"
          sx={
            type === "error"
              ? { bgcolor: "#d7191c" }
              : { bgcolor: "#a6d96a", color: "#6C584C" }
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
