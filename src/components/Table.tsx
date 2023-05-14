import { Location } from "mocks/db";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

interface ITableProps {
  locations: Location[];
}

export default function Table({ locations }: ITableProps) {
  const columns = [
    { field: "star", headerName: "star", width: 60, sortable: false },
    {
      field: "name",
      headerName: "Locations",
      width: 50,
      flex: 1,
      editable: false,
      sortable: false,
    },
    {
      field: "id",
      headerName: "Robots",
      width: 50,
      flex: 0.6,
      editable: false,
      sortable: false,
    },
    {
      field: "ID",
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
          rows={locations}
          checkboxSelection
          hideFooterPagination
          hideFooter
          disableColumnMenu
        />
      </Box>
    </div>
  );
}
