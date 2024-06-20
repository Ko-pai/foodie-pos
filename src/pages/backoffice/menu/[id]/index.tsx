import Layout from "@/component/Layout";
import DeleteDialog from "@/component/DeleteDialog";
import MultiSelect from "@/component/MultiSelect";
import SnackBar from "@/component/SnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showSnackBar } from "@/store/slices/appSnackbarSlice";
import {
  deleteMenuFromServer,
  updateMenuToServer,
} from "@/store/slices/menuSlice";
import { UpdateMenu } from "@/types/menu";
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
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MenusQuery = () => {
  const [updateData, setUpdateData] = useState<UpdateMenu>();
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuQueryIds = Number(router.query.id);

  const { menu } = useAppSelector((state) => state.menuAdd);
  const { isLoading } = useAppSelector((state) => state.app);
  const { menuCategories } = useAppSelector((state) => state.menuCategory);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  const dispatch = useAppDispatch();

  const findMenu = menu.find((d) => d.id === menuQueryIds);
  const selectedMenuCategoryMenu = menuCategoryMenus
    .filter((d) => d.menuId === menuQueryIds)
    .map((item) => {
      const menuCategoryId = menuCategories.find(
        (da) => da.id === item.menuCategoryId
      ) as MenuCategory;
      return menuCategoryId?.id;
    });

  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenus } = useAppSelector(
    (state) => state.disableLocationMenu
  );
  const isAvaliable = disableLocationMenus.find(
    (d) => d.locationId === selectedLocation?.id && d.menuId === menuQueryIds
  )
    ? false
    : true;

  const deleteClick = () => {
    dispatch(
      deleteMenuFromServer({
        id: menuQueryIds,
        onSuccess() {
          dispatch(
            showSnackBar({
              type: "success",
              message: "Deleted Successfully",
            })
          );
          setOpen(false);
          router.push("/backoffice/menu");
        },
      })
    );
  };

  useEffect(() => {
    if (findMenu) {
      setUpdateData(findMenu);
      setSelected(selectedMenuCategoryMenu);
    }
  }, [findMenu]);

  useEffect(() => {
    if (updateData) {
      setUpdateData({
        ...updateData,
        isAvailable: isAvaliable,
        menuCategoryIds: selected,
        locationId: selectedLocation?.id,
      });
    }
  }, [selected, findMenu]);

  if (isLoading) return null;

  if (!menu) {
    return (
      <Box>
        <Typography>Menu Not found</Typography>
      </Box>
    );
  }

  function handleUpdate() {
    if (!updateData?.menuCategoryIds?.length) {
      return dispatch(
        showSnackBar({
          type: "error",
          message: "Please select one menu category",
        })
      );
    }

    updateData &&
      dispatch(
        updateMenuToServer({
          ...updateData,
          onSuccess() {
            dispatch(
              showSnackBar({
                type: "success",
                message: "Update menu Successfully",
              })
            );
            router.push("/backoffice/menu");
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
        <Button variant="outlined" color="error" onClick={() => setOpen(!open)}>
          Delete
        </Button>
        <DeleteDialog
          setOpen={setOpen}
          open={open}
          content="Are you sure want to delete this menu?"
          title="Delete Menu"
          handleDelete={deleteClick}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          mb: 5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={updateData && (updateData.assetUrl as string)}
          alt={`${updateData?.name}.png`}
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          value={updateData?.name}
          sx={{ mb: 2 }}
          onChange={(e) =>
            updateData && setUpdateData({ ...updateData, name: e.target.value })
          }
        />
        <TextField
          value={updateData?.price}
          sx={{ mb: 2 }}
          onChange={(e) =>
            updateData &&
            setUpdateData({ ...updateData, price: Number(e.target.value) })
          }
        />
        <MultiSelect
          setSelected={setSelected}
          selected={selected}
          title="Menu Category"
          items={menuCategories}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isAvaliable}
              onChange={(e, value) =>
                updateData &&
                setUpdateData({ ...updateData, isAvailable: value })
              }
              sx={{ width: "fit-content" }}
            />
          }
          label="Avaliable"
        />
        <Button
          variant="contained"
          sx={{ mt: 2, mb: 2, width: "fit-content" }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>

      <SnackBar />
    </Box>
  );
};

export default MenusQuery;
