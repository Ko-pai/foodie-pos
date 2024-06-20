import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6C584C",
    },
    "&:hover fieldset": {
      borderColor: "#6C584C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6C584C",
    },
  },
});
