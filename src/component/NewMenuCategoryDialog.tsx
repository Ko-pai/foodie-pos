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

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewMenuCategory: React.Dispatch<React.SetStateAction<CreateMenuCategory>>;
  newMenuCategory: CreateMenuCategory;
  setAvaliable: React.Dispatch<React.SetStateAction<boolean>>;
  avaliable: boolean;
}

const NewMenuCategoryDialog = ({
  open,
  setOpen,
  setNewMenuCategory,
  newMenuCategory,
}: Prop) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.menuCategory);

  function createMenuCategoryHandle() {
    const isValid = newMenuCategory.name;

    if (!isValid) {
      return dispatch(
        showSnackBar({
          type: "error",
          message: "Please fill in required field!",
        })
      );
    }

    dispatch(
      createMenuCategoryToServer({
        ...newMenuCategory,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Menu category created successfully",
            })
          );
          setOpen(false);
        },
        onError() {
          dispatch(
            showSnackBar({
              type: "error",
              message: "Error occured while creating category",
            })
          );
        },
      })
    );
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle>Add Menu Category</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <CssTextField
            placeholder="name"
            onChange={(e) =>
              setNewMenuCategory({ ...newMenuCategory, name: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={true}
                onChange={(e, value) => {
                  setNewMenuCategory({
                    ...newMenuCategory,
                    isAvaliable: value,
                  });
                  console.log(value);
                }}
              />
            }
            label="Avaliable"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => setOpen(!open)}
            sx={{ color: "#A98467" }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            disabled={!newMenuCategory.name ? true : false}
            sx={{
              bgcolor: "#A98467",
              width: 100,
              height: 33,
              "&:hover": { bgcolor: "#ba9783" },
            }}
            onClick={createMenuCategoryHandle}
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

export default NewMenuCategoryDialog;
