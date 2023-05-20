import { ChangeEvent, KeyboardEvent } from "react";
import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBoxProps {
  setSearchText: Function;
  searchText: string;
}

export default function SearchBox({
  setSearchText,
  searchText,
}: ISearchBoxProps) {
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="searchbox">
      <input
        className="searchbox-input"
        placeholder="Search robot or location"
        value={searchText}
        onChange={handleTextInput}
      />
      <SearchIcon sx={{ color: "#000000" }} />
    </div>
  );
}
