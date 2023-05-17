import "./CellLocation.css";

// conponents
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Status {
  name: string;
  online: boolean;
}

export default function CellLocation({ name, online }: Status) {
  return (
    <div className="CellLocation">
      <div
        className="cell-container"
        style={online ? { background: "#0091FF" } : { background: "#E4E4E4" }}
      >
        {name}
        <div className="icon-container">
          <KeyboardArrowRightIcon />
        </div>
      </div>
    </div>
  );
}
