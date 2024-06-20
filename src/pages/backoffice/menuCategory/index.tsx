import Layout from "@/component/Layout";

import ItemCard from "@/component/ItemCard";

import NewMenuCategoryDialog from "@/component/NewMenuCategoryDialog";
import NewMenuDialog from "@/component/NewMenuDialog";
import SnackBar from "@/component/SnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { hideSnackBar, showSnackBar } from "@/store/slices/appSnackbarSlice";
import { createMenuCategoryToServer } from "@/store/slices/menuCategorySlice";
import { CreateMenuCategory } from "@/types/menuCategory";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const MenuCategory = () => {
  const { company } = useAppSelector((state) => state.company);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const [newMenuCategory, setNewMenuCategory] = useState<CreateMenuCategory>({
    name: "",
    isAvaliable: true,
    companyId: company?.id,
  });
  const { disableLocationMenuCategories } = useAppSelector(
    (state) => state.disableLocationMenuCategory
  );

  const [open, setOpen] = useState(false);
  const [avaliable, setAvaliable] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { menuCategories } = useAppSelector((state) => state.menuCategory);

  return (
    <Box>
      <Box sx={{ width: "100%", height: "100%", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#A98467", "&:hover": { bgcolor: "#ba9783" } }}
            onClick={() => {
              setOpen(true);
            }}
          >
            New Category
          </Button>
        </Box>
        <NewMenuCategoryDialog
          open={open}
          setOpen={setOpen}
          avaliable={avaliable}
          setAvaliable={setAvaliable}
          setNewMenuCategory={setNewMenuCategory}
          newMenuCategory={newMenuCategory}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {menuCategories.map((d) => {
            const isDisabled = disableLocationMenuCategories.find(
              (item) =>
                item.menuCategoryId === d.id &&
                item.locationId === selectedLocation?.id
            )
              ? true
              : false;
            return (
              <ItemCard
                key={d.id}
                icon={<RestaurantMenuIcon />}
                title={d.name}
                isAvailable={isDisabled}
                href={`/backoffice/menuCategory/${d.id}`}
              />
            );
          })}
        </Box>
        <SnackBar />
      </Box>
    </Box>
  );
};

export default MenuCategory;
