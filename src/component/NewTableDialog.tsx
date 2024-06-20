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
import SingleSelect from "./SingleSelect";
import { CreateTable } from "@/types/table";

interface Prop {
  setNewTable: React.Dispatch<React.SetStateAction<CreateTable>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newTable: CreateTable;
}
const NewTableDialog = ({ open, setOpen, setNewTable, newTable }: Prop) => {
  const [selected, setSelected] = useState<number>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.table);

  const { locations } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (selected) {
      setNewTable({ ...newTable, locationId: selected });
    }
  }, [selected]);

  function clickHandle() {
    const isValid = newTable.name && newTable.locationId;

    if (!isValid) {
      return dispatch(
        showSnackBar({
          type: "error",
          message: "Required field please fill all.",
        })
      );
    }

    dispatch(
      createTable({
        ...newTable,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Create table successfully",
            })
          );
          setOpen(false);
        },
      })
    );
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ color: "#6C584C" }}>Create Table</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          height: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssTextField
          placeholder="Name"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
        />
        <SingleSelect
          open={open}
          title="Location"
          setSelected={setSelected}
          selected={selected}
          items={locations}
        />
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 2 }}>
        <Button
          sx={{ color: "#A98467" }}
          onClick={() => {
            setOpen(false);
            setNewTable({
              name: "",
              locationId: undefined,
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

export default NewTableDialog;

// <MenuAction
//                 menus={menus}
//                 setMenus={setMenus}
//                 randomString={randomString}
//                 setInputValue={setInputValueCheck}
//                 inputValue={inputValueCheck}
//               />
