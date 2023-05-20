import { ChangeEvent, KeyboardEvent } from "react";
import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBoxProps {
  setSearchText: Function;
  searchText: string;
  placeHolder: string;
}

export default function SearchBox({
  setSearchText,
  searchText,
  placeHolder,
}: ISearchBoxProps) {
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="searchbox">
      <input
        className="searchbox-input"
        placeholder={placeHolder}
        value={searchText}
        onChange={handleTextInput}
      />
      <SearchIcon sx={{ color: "#000000" }} />
    </div>
  );
}
