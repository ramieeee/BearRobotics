import { Location } from "mocks/db";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

interface ITableProps {
  locations: Location[];
}

export default function Table({ locations }: ITableProps) {
  // id: 0,
  // name: "Spicy restaurant",
  // robot: {
  //   id: "abcde123",
  //   is_online: true,
  // },

  const columns = [
    { field: "star", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Locations",
      width: 150,
      editable: false,
    },
    {
      field: "id",
      headerName: "Robots",
      width: 100,
      editable: false,
    },
    {
      field: "",
      headerName: "Location Types",
      width: 150,
      editable: false,
    },
  ];

  return (
    <div className="Table">
      <Box sx={{ height: 400, width: "100%", minWidth: 600 }}>
        <DataGrid columns={columns} rows={locations} />
      </Box>
    </div>
  );
}
