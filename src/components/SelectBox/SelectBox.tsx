// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";

import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import "./SelectBox.css";

interface ISelectBoxProps {
  selectedItem: string;
  setSelectedItem: Function;
}

export default function SelectBox({
  selectedItem,
  setSelectedItem,
}: ISelectBoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSelected(e.currentTarget.id);
  };

  return (
    <div className="SelectBox">
      <div className="selectbox" onClick={handleOpen}>
        <div
          className="selectbox-item"
          style={{ color: isOpen ? "#222222" : "#8E8E8E" }}
        >
          {selectedItem}
        </div>
        {isOpen ? (
          <ArrowDropUpRoundedIcon
            sx={{
              position: "absolute",
              right: 0,
              marginRight: "12px",
            }}
          />
        ) : (
          <ArrowDropDownRoundedIcon
            sx={{
              position: "absolute",
              right: 0,
              marginRight: "12px",
            }}
          />
        )}
      </div>
      <div className={isOpen ? "option-container" : "option-container-close"}>
        <div className={isOpen ? "search-input" : "search-input-close"}>
          search
        </div>

        <div
          className={isOpen ? "options" : "options-close"}
          id="allLocation"
          style={{
            backgroundColor:
              isSelected === "allLocation"
                ? "rgba(184, 221, 255, 0.2)"
                : "#fafafa",
          }}
          onClick={onOptionClick}
        >
          All locations
          {isSelected === "allLocation" ? (
            <DoneRoundedIcon
              sx={{ width: 15, height: 15 }}
              className="check-icon"
            />
          ) : null}
        </div>

        <div
          className={isOpen ? "options" : "options-close"}
          id="starred"
          style={{
            backgroundColor:
              isSelected === "starred" ? "rgba(184, 221, 255, 0.2)" : "#fafafa",
          }}
          onClick={onOptionClick}
        >
          Starred
          {isSelected === "starred" ? (
            <DoneRoundedIcon
              sx={{ width: 15, height: 15 }}
              className="check-icon"
            />
          ) : null}
        </div>
      </div>
    </div>

    // <div className="SearchBox">
    //   <FormControl
    //     sx={{ m: 1, minWidth: 120, width: 220, height: 40 }}
    //     size="small"
    //   >
    //     <Select
    //       value={selectedItem}
    //       onChange={handleChange}
    //       displayEmpty
    //       inputProps={{ "aria-label": "Without label" }}
    //       sx={{ color: "#8E8E8E", background: "#FAFAFA" }}
    //     >
    //       <MenuItem value={""} className="select-menu">
    //         <div>All locations</div>
    //       </MenuItem>
    //       <MenuItem value={"starred"} className="select-menu">
    //         <div>Starred</div>
    //       </MenuItem>
    //     </Select>
    //   </FormControl>
    // </div>
  );
}
