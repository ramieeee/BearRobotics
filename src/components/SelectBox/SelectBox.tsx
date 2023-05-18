// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import "./SelectBox.css";

interface ISelectBoxProps {
  selectedItem: string;
  setSelectedItem: Function;
}

export default function SelectBox({
  selectedItem,
  setSelectedItem,
}: ISelectBoxProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: 220, height: 40 }}
        size="small"
      >
        <Select
          value={selectedItem}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ color: "#8E8E8E", background: "#FAFAFA" }}
        >
          <MenuItem value={""} className="select-menu">
            <div>All locations</div>
          </MenuItem>
          <MenuItem value={"starred"} className="select-menu">
            <div>Starred</div>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
