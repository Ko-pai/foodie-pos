import { Box, IconButton, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Prop {
  onDecrease: () => void;
  onIncrease: () => void;
  value: number;
}

const QuantitySeletor = ({ value, onDecrease, onIncrease }: Prop) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100px",
      }}
    >
      <IconButton onClick={onDecrease}>
        <RemoveCircleIcon sx={{ color: "#50C4ED" }} />
      </IconButton>
      <Typography>{value}</Typography>
      <IconButton onClick={onIncrease}>
        <AddCircleIcon sx={{ color: "#50C4ED" }} />
      </IconButton>
    </Box>
  );
};

export default QuantitySeletor;
