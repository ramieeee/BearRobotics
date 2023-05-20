import { ChangeEventHandler, useEffect, useState } from "react";
import "./SelectBox.css";
import SearchBox from "components/SearchBox/SearchBox";

// icons
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";

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
  const [searchText, setSearchText] = useState<string>("");

  const defaultOptions = [
    {
      id: "allLocation",
      text: "All locations",
    },
    {
      id: "starred",
      text: "Starred",
    },
  ];
  const [options, setOptions] = useState<Ioption[]>(defaultOptions);
  const [timeoutToggle, setTimeoutToggle] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (timeoutToggle) {
      clearTimeout(timeoutToggle);
    }
    const timer = setTimeout(() => {
      const filteredOption = defaultOptions.filter((option: Ioption) => {
        const optionText = option.text.toLowerCase();
        return optionText.includes(searchText.toLowerCase());
      });
      setOptions(filteredOption);
    }, 500);

    setTimeoutToggle(timer);
  }, [searchText]);

  interface Ioption {
    id: string;
    text: string;
  }

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSelected(e.currentTarget.id);

    if (e.currentTarget.id === "allLocation") {
      setSelectedItem("allLocations");
    } else {
      setSelectedItem("starred");
    }
  };

  return (
    <div className="SelectBox">
      <div className="selectbox" onClick={handleOpen}>
        <div
          className="selectbox-item"
          style={{ color: isOpen ? "#222222" : "#8E8E8E" }}
        >
          {selectedItem === "allLocations" ? "All locations" : "Starred"}
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
          <SearchBox
            setSearchText={setSearchText}
            searchText={searchText}
            placeHolder={"Search Group"}
            width={"204px"}
            height={"32px"}
            backgroundColor={"#EEEEEE"}
            inputBackgroundColor={"#EEEEEE"}
            searchIconColor={"#8E8E8E"}
            placeholderPadding={"6px 8px 6px 8px"}
          />
        </div>

        {options.map((option: Ioption) => {
          return (
            <div
              key={option.id}
              className={isOpen ? "options" : "options-close"}
              id={option.id}
              style={{
                backgroundColor:
                  isSelected === option.id
                    ? "rgba(184, 221, 255, 0.2)"
                    : "#fafafa",
              }}
              onClick={onOptionClick}
            >
              <div className="option-text">{option.text}</div>
              {isSelected === option.id ? (
                <DoneRoundedIcon
                  sx={{ width: 15, height: 15 }}
                  className="check-icon"
                />
              ) : null}
            </div>
          );
        })}

        {/* <div
          className={isOpen ? "options" : "options-close"}
          id="starred"
          style={{
            backgroundColor:
              isSelected === "starred" ? "rgba(184, 221, 255, 0.2)" : "#fafafa",
          }}
          onClick={onOptionClick}
        >
          <div className="option-text">Starred</div>
          {isSelected === "starred" ? (
            <DoneRoundedIcon
              sx={{ width: 15, height: 15 }}
              className="check-icon"
            />
          ) : null}
        </div> */}
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
