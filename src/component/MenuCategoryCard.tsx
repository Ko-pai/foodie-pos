import { Box, Tabs, Tab } from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { Props } from "next/script";
import React from "react";

interface Prop {
  menuCategories: MenuCategory[];
}

const MenuCategoryCard = ({ menuCategories }: Prop) => {
  return (
    <Box>
      <Box
        sx={
          menuCategories
            ? { borderBottom: 1, borderColor: "divider" }
            : { borderBottom: 0 }
        }
      >
        <Tabs aria-label="basic tabs example">
          {menuCategories.map((d) => {
            return <Tab label={d.name} key={d.id}/>;
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default MenuCategoryCard;
