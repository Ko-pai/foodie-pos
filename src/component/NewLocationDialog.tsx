import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import { CssTextField } from "./CssTextField";
import { CreateMenuCategory } from "@/types/menuCategory";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenuCategoryToServer } from "@/store/slices/menuCategorySlice";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import { prisma } from "@/utils/prisma";
import { createLocation } from "@/store/slices/locationSlice";
import { CreateLocation } from "@/types/location";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewLocation: React.Dispatch<React.SetStateAction<CreateLocation>>;
  newLocation: CreateLocation;
}

const NewLocationDialog = ({
  open,
  setOpen,
  setNewLocation,
  newLocation,
}: Prop) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.location);

  const createHandle = () => {
    const isValid =
      newLocation.name &&
      newLocation.companyId &&
      newLocation.street &&
      newLocation.city &&
      newLocation.township;

    if (!isValid) {
      return dispatch(
        showSnackBar({
          type: "error",
          message: "Please fill in all required fields!",
        })
      );
    }

    dispatch(
      createLocation({
        ...newLocation,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Location created successfully",
            })
          );
          setOpen(false);
        },
        onError() {
          dispatch(
            showSnackBar({
              type: "error",
              message: "Error occured while creating location",
            })
          );
        },
      })
    );
  };

  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle>Add Menu Category</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: 400 }}
        >
          <CssTextField
            placeholder="name"
            sx={{ mb: 2 }}
            onChange={(e) =>
              setNewLocation({ ...newLocation, name: e.target.value })
            }
          />
          <CssTextField
            placeholder="Street"
            sx={{ mb: 2 }}
            onChange={(e) =>
              setNewLocation({ ...newLocation, street: e.target.value })
            }
          />
          <CssTextField
            sx={{ mb: 2 }}
            placeholder="Township"
            onChange={(e) =>
              setNewLocation({ ...newLocation, township: e.target.value })
            }
          />

          <CssTextField
            placeholder="City"
            onChange={(e) =>
              setNewLocation({ ...newLocation, city: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            sx={{ color: "#A98467" }}
            onClick={() => setOpen(!open)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            disabled={!newLocation.name ? true : false}
            onClick={createHandle}
            sx={{ bgcolor: "#A98467", "&:hover": { bgcolor: "#ba9783" } }}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: "#e8f6ef" }} />
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewLocationDialog;
