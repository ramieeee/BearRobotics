import { Location } from "mocks/db";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Robot from "interface/Robot";

interface ITableProps {
  robots: Robot[];
}

export default function Table({ robots }: ITableProps) {
  const columns = [
    { field: "star", headerName: "star", width: 60, sortable: false },
    {
      field: "name",
      headerName: "robots",
      width: 50,
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
        />
      </Box>
    </div>
  );
}
