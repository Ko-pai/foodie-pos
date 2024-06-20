import Layout from "@/component/BackofficeLayout";
import ItemCard from "@/component/ItemCard";
import MenuCard from "@/component/MenuCard";
import NewMenuDialog from "@/component/NewMenuDialog";
import SnackBar from "@/component/SnackBar";
import { prisma } from "@/utils/prisma";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addMenu, createMenu } from "@/store/slices/menuSlice";
import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { NewMenu } from "@/types/menu";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [newMenus, setNewMenus] = useState<NewMenu>({
    name: "",
    price: 0,
    menuCategoryId: [],
  });

  const dispatch = useAppDispatch();
  const { menu } = useAppSelector((state) => state.menuAdd);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenus } = useAppSelector(
    (state) => state.disableLocationMenu
  );

  return (
    <Box>
      <Box sx={{ width: "100%", height: "100%", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#A98467", "&:hover": { bgcolor: "#ba9783" } }}
            onClick={() => {
              setOpen(true);
            }}
          >
            New Menu
          </Button>
          <NewMenuDialog
            setOpen={setOpen}
            open={open}
            name="New Menu"
            setMenus={setNewMenus}
            menus={newMenus}
          />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
          {menu.map((d) => {
            const isAvailable = disableLocationMenus.find(
              (item) =>
                item.locationId === selectedLocation?.id && item.menuId === d.id
            )
              ? false
              : true;
            return (
              <MenuCard
                key={d.id}
                href={`/backoffice/menu/${d.id}`}
                menu={d}
                isAvailable={isAvailable}
              />
            );
          })}
        </Box>
        <SnackBar />
      </Box>
    </Box>
  );
};

export default Menu;
