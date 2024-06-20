import MenuCard from "@/component/MenuCard";
import OrderAppLayout from "@/component/OrderAppLayout";
import { useAppSelector } from "@/store/hook";
import { appSelector } from "@/store/slices/appSlice";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

const Order = () => {
  const { isReady, ...router } = useRouter();
  const query = router.query;
  const tableId = query.tableId as string;
  const { menus, menuCategories, menuCategoriesMenus, init } = useAppSelector(
    appSelector,
    shallowEqual
  );
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
      console.log(tableId);
    }
  }, [menuCategories]);

  useEffect(() => {
    if (isReady && !tableId) {
      router.push("/");
    }
  }, [isReady]);

  const renderMenu = () => {
    const findMenuId = menuCategoriesMenus
      .filter((d) => d.menuCategoryId === selectedMenuCategory?.id)
      .map((d) => d.menuId);

    const findMenu = menus.filter((d) => findMenuId.includes(d.id));

    return (
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {findMenu.map((d) => {
          const href = { pathname: `/order/menu/${d.id}`, query };
          return <MenuCard key={d.id} menu={d} href={href} isAvailable />;
        })}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, border: "none" }}>
        <Tabs
          value={value}
          onChange={(evt, value) => setValue(value)}
          aria-label="basic tabs example"
          sx={{
            "& button": {
              borderRadius: 4,
              bgcolor: "rgba(240, 240, 240,0.7)",
              m: 1,
            },
            "& button.Mui-selected": { color: "#fc9300" },
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
          TabIndicatorProps={{
            sx: {
              display: { xs: "none", md: "block" },
              backgroundColor: "#fc9300",
              height: 6,
              color: "#fc9300",
              flexWrap: "wrap",
            },
          }}
        >
          {menuCategories.map((d) => {
            return (
              <Tab
                key={d.id}
                label={d.name}
                onClick={() => setSelectedMenuCategory(d)}
                sx={{
                  color: "#2d2c2c",
                  fontSize: 14,
                  textTransform: "none",
                }}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box sx={{ width: { xs: "90%", sm: "60%" } }}>{renderMenu()}</Box>
    </Box>
  );
};

export default Order;
