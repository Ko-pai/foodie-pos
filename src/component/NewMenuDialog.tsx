import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { CssTextField } from "./CssTextField";
import { NewMenu } from "../types/menu";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { addMenu, createMenu } from "../store/slices/menuSlice";
import SnackBar from "./SnackBar";
import { showSnackBar } from "../store/slices/appSnackbarSlice";
import { prisma } from "@/utils/prisma";
import { MenuCategory } from "@prisma/client";
import FileDropZone from "./FileDropZone";
import { uploadAssetImage } from "@/store/slices/appSlice";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  setMenus: React.Dispatch<React.SetStateAction<NewMenu>>;
  menus: NewMenu;
}
const NewMenuDialog = ({ open, setOpen, name, menus, setMenus }: Prop) => {
  const { isLoading } = useAppSelector((state) => state.menuAdd);
  const dispatch = useAppDispatch();

  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const [menuImage, setMenuImage] = useState<File>();

  async function clickHandle() {
    const check = menus.menuCategoryId && menus.menuCategoryId.length > 0;
    const isValid = menus.name && menus.price !== undefined && check;

    if (menuImage) {
      dispatch(
        uploadAssetImage({
          file: menuImage,
          onSuccess(data) {
            menus.assetUrl = data;
            dispatch(
              createMenu({
                ...menus,
                onSuccess() {
                  dispatch(
                    showSnackBar({
                      type: "success",
                      message: "Menu created successfully",
                    })
                  );

                  setOpen(false);
                },
                onError(error) {
                  dispatch(
                    showSnackBar({
                      type: "error",
                      message: error,
                    })
                  );
                },
              })
            );
          },
        })
      );
    }
    // if (!isValid) {
    //   return;
    // }
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ color: "#6C584C" }}>{name}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          height: 400,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssTextField
          placeholder="Name"
          sx={{ width: "100%", mb: 4 }}
          onChange={(e) => {
            setMenus({ ...menus, name: e.target.value });
          }}
        />
        <CssTextField
          placeholder="Price"
          sx={{ width: "100%", mb: 4 }}
          onChange={(e) => {
            setMenus({ ...menus, price: Number(e.target.value) });
          }}
        />
        <FormControl sx={{ width: "100%", mb: 2 }}>
          <InputLabel>Menu Category</InputLabel>
          <Select
            value={menus.menuCategoryId}
            multiple
            input={<OutlinedInput label="Menu Category" />}
            onChange={(e) => {
              const selectedValue = e.target.value as number[];
              setMenus({ ...menus, menuCategoryId: selectedValue });
            }}
            renderValue={() => {
              const selectedMenuCategories = menus?.menuCategoryId?.map(
                (d) =>
                  menuCategories.find((item) => item.id === d) as MenuCategory
              );
              return (
                selectedMenuCategories &&
                selectedMenuCategories.map((d) => d?.name).join(", ")
              );
            }}
          >
            {menuCategories.map((d) => {
              return (
                <MenuItem key={d.id} value={d.id}>
                  <Checkbox checked={menus?.menuCategoryId?.includes(d.id)} />
                  <ListItemText primary={d.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Box sx={{ width: "100%" }}>
          <FileDropZone onDrop={(file) => setMenuImage(file[0])} />
          {menuImage && (
            <Chip
              sx={{ mt: 2 }}
              label={menuImage.name}
              variant="outlined"
              onDelete={() => setMenuImage(undefined)}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 2 }}>
        <Button
          sx={{ color: "#A98467" }}
          onClick={() => {
            setOpen(false),
              setMenus({
                name: "",
                price: 0,
                menuCategoryId: [],
              });
            setMenuImage(undefined);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#A98467",
            width: 100,
            height: 33,
            "&:hover": { bgcolor: "#ba9783" },
          }}
          onClick={clickHandle}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#e8f6ef" }} />
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenuDialog;

// <MenuAction
//                 menus={menus}
//                 setMenus={setMenus}
//                 randomString={randomString}
//                 setInputValue={setInputValueCheck}
//                 inputValue={inputValueCheck}
//               />
