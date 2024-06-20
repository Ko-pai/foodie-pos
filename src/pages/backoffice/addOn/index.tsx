import AddonDialog from "@/component/AddonCategoryDialog";
import BackofficeLayout from "@/component/BackofficeLayout";
import ItemCard from "@/component/ItemCard";
import Layout from "@/component/Layout";
import NewAddonDialog from "@/component/NewAddonDialog";
import NewMenuDialog from "@/component/NewMenuDialog";
import SnackBar from "@/component/SnackBar";
import { useAppSelector } from "@/store/hook";
import { NewAddon } from "@/types/addon";
import ExtensionIcon from "@mui/icons-material/Extension";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { allowedNodeEnvironmentFlags } from "process";
import React, { useState } from "react";

const Addon = () => {
  const [open, setOpen] = useState(false);

  const [addon, setAddon] = useState<NewAddon>({
    name: "",
    price: 0,
    addonCategoryId: 0,
  });
  

  const { addons } = useAppSelector((state) => state.addon);

  return (
    <Box>
      <Box sx={{ width: "100%", height: "100%", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#A98467", "&:hover": { bgcolor: "#ba9783" } }}
            onClick={() => {
              setOpen(true);
            }}
          >
            New Addons
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {addons.map((d) => {
            return (
              <ItemCard
                key={d.id}
                href={`/backoffice/addOn/${d.id}`}
                icon={<ExtensionIcon />}
                title={d.name}
              />
            );
          })}
        </Box>
        <NewAddonDialog
          open={open}
          setOpen={setOpen}
          setAddon={setAddon}
          addon={addon}
        />
        <SnackBar />
      </Box>
    </Box>
  );
};

export default Addon;

/*    <FormControl sx={{ width: "100%" }}>
          <InputLabel>Menu</InputLabel>
          <Select
            multiple
            value={selected}
            input={<OutlinedInput label="Menu" />}
            onChange={(evt) => {
              const selected = evt.target.value as number[];
              setSelected(selected);
            }}
            renderValue={() => {
              return selected
                .map((d) => menu.find((menuId) => menuId.id === d))
                .map((item) => item?.name)
                .join(", ");
            }}
          >
            {menu.map((d) => {
              return (
                <MenuItem key={d.id} value={d.id}>
                  <Checkbox checked={selected.includes(d.id)} />
                  <ListItemText>{d.name}</ListItemText>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */
