import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AddonCategory, Location } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Prop {
  title: String;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
  selected: number | undefined;
  items: AddonCategory[] | Location[];
  open?: boolean;
}

const SingleSelect = ({ title, selected, setSelected, items, open }: Prop) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        value={selected}
        label={title}
        onChange={(evt) => setSelected(Number(evt.target.value))}
      >
        {items.map((d) => {
          return (
            <MenuItem key={d.id} value={d.id}>
              {d.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SingleSelect;
