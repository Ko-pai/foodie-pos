import React, { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import Layout from "@/component/Layout";
import { CssTextField } from "@/component/CssTextField";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { UpdateCompany } from "@/types/company";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import { updateCompanyToServer } from "@/store/slices/companySlice";
import SnackBar from "@/component/SnackBar";

const Setting = () => {
  const { company } = useAppSelector((state) => state.company);
  const [updateCompany, setUpdateCompany] = useState<UpdateCompany>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (company) {
      setUpdateCompany(company);
    }
  }, [company]);

  if (!updateCompany) {
    return (
      <Box>
        <Typography>Company not found!</Typography>
      </Box>
    );
  }

  const handleUpdateCompany = () => {
    const isValid =
      updateCompany.name &&
      updateCompany.city &&
      updateCompany.township &&
      updateCompany.street
        ? true
        : false;

    if (!isValid) {
      return dispatch(
        showSnackBar({ type: "error", message: "Required Field!" })
      );
    }

    dispatch(
      updateCompanyToServer({
        ...updateCompany,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Update company successfully",
            })
          );
        },
      })
    );
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5">Company</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 3, width: 300 }}>
        <CssTextField
          defaultValue={company?.name}
          sx={{ mb: 2 }}
          placeholder="Name"
          onChange={(evt) =>
            updateCompany &&
            setUpdateCompany({ ...updateCompany, name: evt.target.value })
          }
        />
        <CssTextField
          defaultValue={company?.street}
          sx={{ mb: 2 }}
          placeholder="Street"
          onChange={(evt) =>
            updateCompany &&
            setUpdateCompany({ ...updateCompany, street: evt.target.value })
          }
        />
        <CssTextField
          defaultValue={company?.township}
          sx={{ mb: 2 }}
          placeholder="Township"
          onChange={(evt) =>
            updateCompany &&
            setUpdateCompany({ ...updateCompany, township: evt.target.value })
          }
        />
        <CssTextField
          defaultValue={company?.city}
          sx={{ mb: 2 }}
          placeholder="City"
          onChange={(evt) =>
            updateCompany &&
            setUpdateCompany({ ...updateCompany, city: evt.target.value })
          }
        />

        <Button
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#A98467",
            width: "fit-content",
            "&:hover": { bgcolor: "#ba9783" },
          }}
          onClick={handleUpdateCompany}
        >
          Update
        </Button>
      </Box>
      <SnackBar />
    </Box>
  );
};

export default Setting;
