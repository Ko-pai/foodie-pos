import { Box, Chip, FormControl, FormLabel, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import React from "react";
import AddonDetail from "./Addon";

interface Prop {
  addonCategories: AddonCategory[];
  selectedAddon: Addon[];
  setSelectedAddon: React.Dispatch<React.SetStateAction<Addon[]>>;
}

const AddonCategories = ({
  addonCategories,
  setSelectedAddon,
  selectedAddon,
}: Prop) => {
  return (
    <Box>
      {addonCategories?.map((d) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", mb: 4 }}
            key={d.id}
          >
            <Box
              sx={{
                width: 300,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 17,
                  p: 1,
                  mb: 3,
                  color: "#2d2c2c",
                  bgcolor: "#50C4ED",
                }}
                id="demo-radio-buttons-group-label"
              >
                {d?.name}
                <Chip
                  label={d?.isRequired ? "isRequired" : "Optional"}
                  sx={{ color: "#333A73", bgcolor: "rgba(240, 240, 240,0.7)" }}
                />
              </Box>
            </Box>
            <Box>
              <AddonDetail
                addonCategoryId={d.id}
                setSelectedAddon={setSelectedAddon}
                selectedAddon={selectedAddon}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategories;
