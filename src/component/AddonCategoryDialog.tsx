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
  FormControlLabel,
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
import { Menu, MenuCategory } from "@prisma/client";
import { createAddonCategory } from "@/store/slices/addonCategorySlice";
import { NewAddonCategory } from "@/types/addonCategory";
import { Router, useRouter } from "next/router";
import MultiSelect from "./MultiSelect";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  setAddonCategory: React.Dispatch<React.SetStateAction<NewAddonCategory>>;
  addonCategory: NewAddonCategory;
}

const AddonCategoryDialog = ({
  open,
  setOpen,
  name,
  addonCategory,
  setAddonCategory,
}: Prop) => {
  const { isLoading } = useAppSelector((state) => state.addonCategory);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();

  const { menu } = useAppSelector((state) => state.menuAdd);

  useEffect(() => {
    setAddonCategory({ ...addonCategory, menuIds: selected });
  }, [selected]);

  async function clickHandle() {
    const check = addonCategory.menuIds && addonCategory.menuIds.length > 0;
    const isValid =
      addonCategory.name && check && addonCategory.isRequired !== undefined;

    if (!isValid) {
      return dispatch(
        showSnackBar({
          type: "error",
          message: "Please fill in all required fields!",
        })
      );
    }

    dispatch(
      createAddonCategory({
        ...addonCategory,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Menu created successfully",
            })
          );

          setOpen(false);
          router.push("/backoffice/addon-Category");
        },
      })
    );
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ color: "#6C584C" }}>{name}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          height: 250,

          justifyContent: "center",
        }}
      >
        <CssTextField
          placeholder="Name"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => {
            setAddonCategory({ ...addonCategory, name: e.target.value });
          }}
        />
        <MultiSelect
          title="Menu"
          setSelected={setSelected}
          selected={selected}
          items={menu}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked={true} />}
          onChange={(evt, value) => {
            setAddonCategory({ ...addonCategory, isRequired: value });
          }}
          label="Required"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#A98467" }}
          onClick={() => {
            setOpen(!open);
            setAddonCategory({
              name: "",
              isRequired: true,
              menuIds: selected,
            });
            setSelected([]);
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

export default AddonCategoryDialog;

// <MenuAction
//                 menus={menus}
//                 setMenus={setMenus}
//                 randomString={randomString}
//                 setInputValue={setInputValueCheck}
//                 inputValue={inputValueCheck}
//               />
