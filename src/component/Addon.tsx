import { useAppSelector } from "@/store/hook";
import { appSelector } from "@/store/slices/appSlice";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Addon } from "@prisma/client";
import React from "react";
import { shallowEqual } from "react-redux";

// change add on from desktop
// change add on from laptop blah blah  tyyy

interface Prop {
  addonCategoryId: number;
  selectedAddon: Addon[];
  setSelectedAddon: React.Dispatch<React.SetStateAction<Addon[]>>;
}

const AddonDetail = ({
  selectedAddon,
  setSelectedAddon,
  addonCategoryId,
}: Prop) => {
  const { addonCategories, addons } = useAppSelector(appSelector, shallowEqual);

  const findAddonCategory = addonCategories.find(
    (d) => d.id == addonCategoryId
  );

  const findAddon = addons.filter((d) => d.addonCategoryId === addonCategoryId);

  return (
    <Box>
      {findAddon?.map((item) => {
        return (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              label={item.name}
              control={
                findAddonCategory?.isRequired ? (
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: "#fc9300",
                      },
                    }}
                    checked={
                      selectedAddon?.find((d) => d.id === item.id)
                        ? true
                        : false
                    }
                    onChange={() => {
                      const addonId = findAddon.map((d) => d.id);
                      const other = selectedAddon.filter(
                        (d) => !addonId.includes(d.id)
                      );
                      setSelectedAddon([...other, item]);
                    }}
                  />
                ) : (
                  <Checkbox
                    sx={{
                      "&, &.Mui-checked": {
                        color: "#fc9300",
                      },
                    }}
                    checked={
                      selectedAddon.find((d) => d.id === item.id) ? true : false
                    }
                    onChange={(evt, value) => {
                      if (value) {
                        setSelectedAddon([...selectedAddon, item]);
                      } else {
                        const selected = selectedAddon.filter(
                          (d) => d.id !== item.id
                        );
                        setSelectedAddon(selected);
                      }
                    }}
                  />
                )
              }
            />
            <Typography sx={{ fontStyle: "italic" }}>{item.price}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonDetail;
