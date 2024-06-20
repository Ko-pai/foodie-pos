import BackofficeLayout from "@/component/BackofficeLayout";
import DeleteDialog from "@/component/DeleteDialog";
import Layout from "@/component/Layout";
import SingleSelect from "@/component/SingleSelect";
import SnackBar from "@/component/SnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import { UpdateAddon } from "@/types/addon";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();
  const [updateData, setUpdateData] = useState<UpdateAddon>();
  const router = useRouter();
  const addonId = Number(router.query.id);

  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const { addons } = useAppSelector((state) => state.addon);

  const findAddon = addons.find((d) => d.id === addonId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (findAddon) {
      setUpdateData(findAddon);
      setSelected(findAddon.addonCategoryId);
    }
  }, [findAddon]);

  useEffect(() => {
    if (updateData && selected) {
      setUpdateData({ ...updateData, addonCategoryId: selected });
    }
  }, [selected]);

  function handleDeleteAddon() {
    dispatch(
      deleteAddon({
        id: addonId,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Delete addon successfully",
            })
          );
          setOpen(false);
          router.push("/backoffice/addOn");
        },
      })
    );
  }

  if (!updateData) {
    return (
      <Box>
        <Typography>Addon not found.</Typography>
      </Box>
    );
  }

  function handleUpdateAddon() {
    updateData &&
      dispatch(
        updateAddon({
          ...updateData,
          onSuccess() {
            dispatch(
              showSnackBar({
                type: "success",
                message: "Update addon successfully",
              })
            );

            router.push("/backoffice/addOn");
          },
        })
      );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete
        </Button>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          title="Delete Addon"
          handleDelete={handleDeleteAddon}
          content="Are you sure want to delete this addon?"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          placeholder="Name"
          value={updateData?.name}
          onChange={(evt) =>
            updateData &&
            setUpdateData({ ...updateData, name: evt.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          placeholder="Name"
          value={updateData?.price}
          onChange={(evt) =>
            updateData &&
            setUpdateData({ ...updateData, price: Number(evt.target.value) })
          }
          sx={{ mb: 2 }}
        />
        <SingleSelect
          title={"Addon category"}
          selected={selected}
          setSelected={setSelected}
          items={addonCategories}
        />
        <Button
          sx={{ width: "fit-content", mt: 3 }}
          variant="contained"
          onClick={handleUpdateAddon}
        >
          Update
        </Button>
      </Box>

      <SnackBar />
    </Box>
  );
};

export default AddonDetails;
