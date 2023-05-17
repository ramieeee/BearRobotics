import "./CellRobot.css";

// conponents
import CircleIcon from "@mui/icons-material/Circle";

interface Status {
  robotId: string;
  online: boolean;
}

export default function CellRobot({ robotId, online }: Status) {
  return (
    <div className="CellRobot">
      {online ? (
        <div className="cellRobot-container">
          <CircleIcon sx={{ color: "#00D15E", width: 16, height: 16 }} />
          <div className="cellRobot-container-robotId">{robotId}</div>
        </div>
      ) : (
        <div className="cellrobot-add">Add</div>
      )}
    </div>
  );
}
