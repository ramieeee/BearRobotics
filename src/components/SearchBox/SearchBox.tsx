import { ChangeEvent, KeyboardEvent } from "react";
import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBoxProps {
  setSearchText: Function;
  searchText: string;
  placeHolder: string;
  width: string;
  height: string;
  backgroundColor: string;
  inputBackgroundColor: string;
  searchIconColor: string;
  placeholderPadding: string;
}

export default function SearchBox({
  setSearchText,
  searchText,
  placeHolder,
  width,
  height,
  backgroundColor,
  inputBackgroundColor,
  searchIconColor,
  placeholderPadding,
}: ISearchBoxProps) {
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div
      className="searchbox"
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        padding: placeholderPadding,
      }}
    >
      <input
        className="searchbox-input"
        placeholder={placeHolder}
        value={searchText}
        onChange={handleTextInput}
        style={{ backgroundColor: inputBackgroundColor }}
      />
      <SearchIcon sx={{ color: searchIconColor }} />
    </div>
  );
}
