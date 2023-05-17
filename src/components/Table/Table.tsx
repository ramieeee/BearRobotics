import { Location } from "mocks/db";
import Robot from "interface/Robot";

import "./Table.css";

// components
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import CellLocation from "components/CellLocation/CellLocation";

// icons
import RefreshIcon from "@mui/icons-material/Refresh";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface ITableProps {
  robots: Robot[];
}

const columns = [
  {
    field: "star",
    renderHeader: () => {
      return (
        <div style={{ cursor: "pointer", display: "flex", color: "#656565" }}>
          <RefreshIcon />
        </div>
      );
    },
    width: 60,
    sortable: false,
    renderCell: () => {
      return (
        <div style={{ cursor: "pointer", display: "flex", color: "#8E8E8E" }}>
          <StarBorderIcon />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Locations",
    width: 50,
    renderCell: (params: any) => {
      const isOnline: boolean = params.row.is_online;
      const name: string = params.row.name;

      return (
        <>
          {isOnline && name ? (
            <CellLocation name={name} online={true} />
          ) : (
            <CellLocation name={name} online={false} />
          )}
        </>
      );
    },
    flex: 1,
    editable: false,
    sortable: false,
  },
  {
    field: "robot_id",
    headerName: "Robots",
    width: 50,
    flex: 0.6,
    editable: false,
    sortable: false,
  },
  {
    field: "is_online",
    headerName: "Location Types",
    width: 50,
    flex: 1,
    editable: false,
    sortable: false,
  },
];
export default function Table({ robots }: ITableProps) {
  return (
    <div className="Table">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={robots}
          checkboxSelection
          hideFooterPagination
          hideFooter
          disableColumnMenu
          disableRowSelectionOnClick
          rowHeight={64}
        />
      </Box>
    </div>
  );
}
