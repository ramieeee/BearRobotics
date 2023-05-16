import { Location } from "mocks/db";
import Robot from "interface/Robot";

import "./Table.css";

// components
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CheckBox } from "@mui/icons-material";

interface ITableProps {
  robots: Robot[];
}

export default function Table({ robots }: ITableProps) {
  const columns = [
    // {
    //   field: "checkbox",
    //   renderHeader: () => {
    //     return (
    //       <div>
    //         <CheckBox />
    //       </div>
    //     );
    //   },
    //   width: 50,
    //   flex: 1,
    //   editable: false,
    //   sortable: false,
    // },
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
          disableRowSelectionOnClick
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            // "&.MuiDataGrid-columnHeader MuiDataGrid-withBorderColor": {
            //   outline: "none !important",
            // },
          }}
        />
      </Box>
    </div>
  );
}
