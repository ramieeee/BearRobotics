import { useState } from "react";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectBox() {
  const [selected, setSelected] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          value={selected}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ color: "#8E8E8E", background: "#FAFAFA" }}
        >
          <MenuItem value={"allLocations"}>All locations</MenuItem>
          <MenuItem value={"starred"}>Starred</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
