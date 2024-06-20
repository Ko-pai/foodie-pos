import Layout from "@/component/Layout";
import DeleteDialog from "@/component/DeleteDialog";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import {
  deleteMenuCategoryFromServer,
  updateMenuCategoryToServer,
} from "@/store/slices/menuCategorySlice";
import { UpdateMenuCategory } from "@/types/menuCategory";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetails = () => {
  const [open, setOpen] = useState(false);
  const [updateValue, setUpdateValue] = useState<UpdateMenuCategory>();

  const router = useRouter();
  const menuCategoryQueryId = Number(router.query.id);

  const { menuCategories } = useAppSelector((state) => state.menuCategory);

  const findMenuCategory = menuCategories.find(
    (d) => d.id === menuCategoryQueryId
  );

  const { selectedLocation } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const { disableLocationMenuCategories } = useAppSelector(
    (state) => state.disableLocationMenuCategory
  );
  const isAvaliable = disableLocationMenuCategories.find(
    (item) =>
      item.menuCategoryId === menuCategoryQueryId &&
      item.locationId === selectedLocation?.id
  )
    ? false
    : true;

  useEffect(() => {
    if (findMenuCategory) {
      setUpdateValue({
        ...findMenuCategory,
        isAvaliable,
        locationId: selectedLocation?.id,
      });
    }
  }, [findMenuCategory]);

  function handleChange() {
    /*
    const shouldUpdate =
      updateValue?.name !== findMenuCategory?.name ||
      updateValue?.isAvaliable !== findMenuCategory?.isAvaliable;

    if (!shouldUpdate) {
      return router.push("/backoffice/menuCategory");
    }
*/

    updateValue &&
      dispatch(
        updateMenuCategoryToServer({
          ...updateValue,
          onSuccess() {
            dispatch(
              showSnackBar({
                type: "success",
                message: "Menu category updated successfully",
              })
            );
            router.push("/backoffice/menuCategory");
          },
          onError() {
            dispatch(
              showSnackBar({
                type: "error",
                message: "Error occured while updating menu category!",
              })
            );
          },
        })
      );
  }

  const handleDelete = () => {
    dispatch(
      deleteMenuCategoryFromServer({
        id: menuCategoryQueryId,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Delete successfully menu category",
            })
          );
          setOpen(false);
          router.push("/backoffice/menuCategory");
        },
      })
    );
  };

  if (!menuCategories) {
    return (
      <Box>
        <Typography>Error</Typography>
      </Box>
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
        <Button variant="outlined" color="error" onClick={() => setOpen(!open)}>
          Delete
        </Button>
        <DeleteDialog
          setOpen={setOpen}
          open={open}
          content="Are you sure want to delete this menu category?"
          title="Delete Menu Category"
          handleDelete={handleDelete}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
        <TextField
          value={updateValue?.name}
          onChange={(e) => {
           updateValue && setUpdateValue({ ...updateValue, name: e.target.value });
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isAvaliable}
              onChange={(e, value) =>
               updateValue && setUpdateValue({ ...updateValue, isAvaliable: value })
              }
              sx={{ width: "fit-content" }}
            />
          }
          label="Avaliable"
        />
        <Button
          sx={{ width: "fit-content", mt: 2 }}
          variant="contained"
          onClick={handleChange}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default MenuCategoryDetails;
