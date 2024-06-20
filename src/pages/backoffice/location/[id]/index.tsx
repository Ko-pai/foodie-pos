import BackofficeLayout from "@/component/BackofficeLayout";
import DeleteDialog from "@/component/DeleteDialog";
import Layout from "@/component/Layout";
import SnackBar from "@/component/SnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setSelectedLocation } from "@/store/slices/appSlice";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import {
  deleteLocationFromServer,
  updateLocation,
} from "@/store/slices/locationSlice";
import { UpdateLocation } from "@/types/location";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LocationDetail = () => {
  const [updateData, setUpdateData] = useState<UpdateLocation>();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const locationId = Number(router.query.id);

  const { selectedLocation, isLoading } = useAppSelector((state) => state.app);
  const { locations } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const findLocation = locations.find((d) => d.id === locationId);

  const deleteClick = () => {
    dispatch(
      deleteLocationFromServer({
        id: locationId,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Deleted Successfully",
            })
          );
          setOpen(false);
          router.push("/backoffice/location");
        },
      })
    );
  };

  useEffect(() => {
    if (findLocation) {
      setUpdateData(findLocation);
    }
  }, [findLocation]);

  if (!locations) {
    return (
      <Box>
        <Typography>Location Not found</Typography>
      </Box>
    );
  }

  function handleChange() {
    const existLocation = locations.find((d) => d.name === updateData?.name);
    if (existLocation) {
      dispatch(
        showSnackBar({
          type: "error",
          message: "Please update location",
        })
      );
    } else {
      updateData &&
        dispatch(
          updateLocation({
            ...updateData,
            onSuccess() {
              dispatch(
                showSnackBar({
                  type: "success",
                  message: "Update location successfully",
                })
              );
              setOpen(false);
              router.push("/backoffice/location");
            },
            onError() {
              dispatch(
                showSnackBar({
                  type: "error",
                  message: "Error occured while update location",
                })
              );
            },
          })
        );
    }
  }

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: " flex-end",
          mb: 2,
        }}
      >
        <Button variant="outlined" color="error" onClick={() => setOpen(!open)}>
          Delete
        </Button>
        <DeleteDialog
          setOpen={setOpen}
          open={open}
          content="Are you sure want to delete this location?"
          title="Delete Location"
          handleDelete={deleteClick}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          value={updateData?.name}
          sx={{ mb: 2 }}
          onChange={(evt) => {
            updateData &&
              setUpdateData({ ...updateData, name: evt.target.value });
          }}
        />
        <FormControlLabel
          control={
            <Switch
              defaultChecked={
                selectedLocation?.id === locationId ? true : false
              }
              onChange={() => {
                if (findLocation) {
                  localStorage.setItem(
                    "selectedLocationId",
                    String(findLocation.id)
                  );
                  dispatch(setSelectedLocation(findLocation));
                }
              }}
            />
          }
          label="Current location"
        />
        <Button
          variant="contained"
          sx={{ mt: 4, width: "fit-content" }}
          onClick={handleChange}
        >
          Update
        </Button>
      </Box>
      <SnackBar />
    </Box>
  );
};

export default LocationDetail;
