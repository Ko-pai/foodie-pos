import BackofficeLayout from "@/component/BackofficeLayout";
import DeleteDialog from "@/component/DeleteDialog";
import Layout from "@/component/Layout";
import MultiSelect from "@/component/MultiSelect";
import SnackBar from "@/component/SnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategorySlice";
import { setSelectedLocation } from "@/store/slices/appSlice";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import {
  deleteLocationFromServer,
  updateLocation,
} from "@/store/slices/locationSlice";
import { UpdateAddonCategory } from "@/types/addonCategory";
import { UpdateLocation } from "@/types/location";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AddonCategoryDetail = () => {
  const [updateData, setUpdateData] = useState<UpdateAddonCategory>();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const router = useRouter();
  const addonCategoryId = Number(router.query.id);

  const { menu } = useAppSelector((state) => state.menuAdd);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { menuAddonCategories } = useAppSelector(
    (state) => state.menuAddonCategory
  );

  const companyId = selectedLocation?.companyId;

  const { addonCategories } = useAppSelector((state) => state.addonCategory);

  const dispatch = useAppDispatch();

  const findAddonCategory = addonCategories.find(
    (d) => d.id === addonCategoryId
  );

  const menuId = menuAddonCategories
    .filter((item) => item.addOnCategoryId === addonCategoryId)
    .map((d) => d.menuId);

  const isRequired = addonCategories.find(
    (d) => d.id === addonCategoryId && d.isRequired
  )
    ? true
    : false;

  useEffect(() => {
    if (findAddonCategory) {
      setUpdateData({
        ...findAddonCategory,
        menuIds: menuId,
        companyId: companyId,
      });
      setSelected(menuId);
    }
  }, [findAddonCategory]);

  useEffect(() => {
    if (updateData) {
      setUpdateData({ ...updateData, menuIds: selected });
    }
  }, [selected]);

  if (!addonCategories) {
    return (
      <Box>
        <Typography>Location Not found</Typography>
      </Box>
    );
  }

  const deleteClick = () => {
    dispatch(
      deleteAddonCategory({
        id: addonCategoryId,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Deleted Successfully",
            })
          );
          setOpen(false);
          router.push("/backoffice/addon-Category");
        },
      })
    );
  };

  function handleChange() {
    if (!selected.length) {
      return dispatch(
        showSnackBar({
          type: "error",
          message: "Please select one menu!",
        })
      );
    }

    updateData &&
      dispatch(
        updateAddonCategory({
          ...updateData,
          onSuccess() {
            dispatch(
              showSnackBar({
                type: "success",
                message: "Update addon category successfully",
              })
            );
            router.push("/backoffice/addon-Category");
          },
        })
      );
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
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(!open)}
        >
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
        <MultiSelect
          setSelected={setSelected}
          selected={selected}
          title="Menus"
          items={menu}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isRequired}
              onChange={(e, value) => {
                updateData &&
                  setUpdateData({
                    ...updateData,
                    isRequired: value,
                  });
                console.log(value);
              }}
            />
          }
          label="Required"
          sx={{ mt: 2 }}
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

export default AddonCategoryDetail;
