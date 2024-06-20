import AddonCategoryDialog from "@/component/AddonCategoryDialog";
import BackofficeLayout from "@/component/BackofficeLayout";
import ItemCard from "@/component/ItemCard";
import NewMenuDialog from "@/component/NewMenuDialog";
import SnackBar from "@/component/SnackBar";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { NewAddonCategory } from "@/types/addonCategory";
import Layout from "@/component/Layout";

const AddonCategory = () => {
  const [open, setOpen] = useState(false);
  const [addonCategory, setAddonCategory] = useState<NewAddonCategory>({
    name: "",
    isRequired: true,
    menuIds: [],
  });
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
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
            New addon-category
          </Button>
        </Box>
        <AddonCategoryDialog
          name="Addon Category"
          setAddonCategory={setAddonCategory}
          addonCategory={addonCategory}
          open={open}
          setOpen={setOpen}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {addonCategories.map((d) => {
            return (
              <ItemCard
                key={d.id}
                href={`/backoffice/addon-Category/${d.id}`}
                icon={<CategoryIcon />}
                title={d.name}
              />
            );
          })}
        </Box>

        <SnackBar />
      </Box>
    </Box>
  );
};

export default AddonCategory;
