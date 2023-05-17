import { ChangeEvent, KeyboardEvent } from "react";
import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBoxProps {
  setSearchText: Function;
}

export default function SearchBox({ setSearchText }: ISearchBoxProps) {
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="searchbox">
      <input
        className="searchbox-input"
        placeholder="Search robot or location"
        onChange={handleTextInput}
      />
      <SearchIcon sx={{ color: "#000000" }} />
    </div>
  );
}
