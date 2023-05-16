import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox() {
  return (
    <div className="searchbox">
      <input
        className="searchbox-input"
        placeholder="Search robot or location"
      />
      <SearchIcon sx={{ color: "#000000" }} />
    </div>
  );
}
