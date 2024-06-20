import {
  Alert,
  Button,
  Checkbox,
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
import React, { useEffect, useState } from "react";
import { CssTextField } from "./CssTextField";
import { NewMenu } from "../types/menu";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { addMenu, createMenu } from "../store/slices/menuSlice";
import SnackBar from "./SnackBar";
import { showSnackBar } from "../store/slices/appSnackbarSlice";
import { prisma } from "@/utils/prisma";
import { MenuCategory } from "@prisma/client";
import { createTable } from "@/store/slices/tableSlice";
import { createAddon } from "@/store/slices/addonSlice";
import { NewAddon } from "@/types/addon";
import { useRouter } from "next/router";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddon: React.Dispatch<React.SetStateAction<NewAddon>>;
  addon: NewAddon;
}
const NewAddonDialog = ({ open, setOpen, addon, setAddon }: Prop) => {
  const { isLoading } = useAppSelector((state) => state.addon);
  const [selected, setSelected] = useState<number>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { addonCategories } = useAppSelector((state) => state.addonCategory);

  useEffect(() => {
    setAddon({ ...addon, addonCategoryId: selected });
  }, [selected]);

  function clickHandle() {
    const isValid =
      addon.name && addon.price !== undefined && addon.addonCategoryId;

    if (!isValid) {
      return dispatch(
        showSnackBar({
          type: "error",
          message: "Please fill in all required fields!",
        })
      );
    }

    dispatch(
      createAddon({
        ...addon,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Create Addon Successfully",
            })
          );
          setOpen(false);
        },
      })
    );
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ color: "#6C584C" }}>Create Addon</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          height: 250,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssTextField
          placeholder="Name"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => {
            setAddon({ ...addon, name: e.target.value });
          }}
        />
        <CssTextField
          placeholder="Price"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => {
            setAddon({ ...addon, price: Number(e.target.value) });
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Addon Category</InputLabel>
          <Select
            value={selected}
            label="Addon Category"
            onChange={(evt) =>
              setAddon({ ...addon, addonCategoryId: Number(evt.target.value) })
            }
          >
            {addonCategories.map((d) => {
              return (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 2 }}>
        <Button
          sx={{ color: "#A98467" }}
          onClick={() => {
            setOpen(!open);
            setAddon({
              name: "",
              price: 0,
              addonCategoryId: undefined,
            });
            setSelected(undefined);
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

export default NewAddonDialog;

// <MenuAction
//                 menus={menus}
//                 setMenus={setMenus}
//                 randomString={randomString}
//                 setInputValue={setInputValueCheck}
//                 inputValue={inputValueCheck}
//               />
