import { useEffect, useState, useRef } from "react";
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
  const selectBoxRef = useRef<HTMLDivElement>(null);

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
    handleOpen();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="SelectBox" ref={selectBoxRef}>
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
      </div>
    </div>
  );
}
