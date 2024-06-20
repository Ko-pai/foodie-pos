import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { AddonCategory, Menu, MenuCategory } from "@prisma/client";

interface Props {
  title: string;
  items: Menu[] | MenuCategory[] | AddonCategory[];

  selected: number[];
  setSelected: (value: React.SetStateAction<number[]>) => void;
}

const MultiSelect = ({ selected, setSelected, title, items }: Props) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel>{title}</InputLabel>
      <Select
        multiple
        value={selected}
        input={<OutlinedInput label={title} />}
        onChange={(e) => {
          const selected = e.target.value as number[];
          setSelected(selected);
        }}
        renderValue={() => {
          return selected
            .map((d) => items.find((item) => item.id === d))
            .map((item) => item?.name)
            .join(", ");
        }}
      >
        {items.map((d) => {
          return (
            <MenuItem key={d.id} value={d.id}>
              <Checkbox checked={selected.includes(d.id)} />
              <ListItemText primary={d?.name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
