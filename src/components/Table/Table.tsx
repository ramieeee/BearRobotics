import { useState, useEffect } from "react";
import Robot from "interface/Robot";
import { Location } from "mocks/db";
// import { putStarredItems, getStarredItems } from "apis/StarredItems";

import "./Table.css";

// components
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CellLocation from "components/CellLocation/CellLocation";
import CellRobot from "components/CellRobot/CellRobot";
import Pagination from "@mui/material/Pagination";

// icons
import RefreshIcon from "@mui/icons-material/Refresh";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarIcon from "@mui/icons-material/Star";

interface ITableProps {
  robots: Robot[];
  dataCnt: number;
  starredItems: number[];
  setTablePage: Function;
  onStarClick: Function;
  tablePage: number;
  allLocations: number[];
}

export default function Table({
  robots,
  dataCnt,
  starredItems,
  setTablePage,
  onStarClick,
  tablePage,
  allLocations,
}: ITableProps) {
  const [pageCnt, setPageCnt] = useState<number>(1);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const handleColumnRowSelect = () => {
    if (selectedRowIds.length > 0) {
      const matchingIds = selectedRowIds.filter((id) =>
        allLocations.includes(id)
      );
      const filtered = selectedRowIds.filter((id) => !matchingIds.includes(id));
      setSelectedRowIds(filtered);
    } else {
      setSelectedRowIds(allLocations);
    }
  };
  const handleindeterminate = () => {
    const filtered = allLocations.filter((id) => selectedRowIds.includes(id));
    if (filtered.length > 0 && filtered.length < allLocations.length) {
      setIndeterminate(true);
    } else {
      setIndeterminate(false);
    }
  };

  const handleChecked = () => {
    const filtered = allLocations.filter((id) => selectedRowIds.includes(id));
    if (filtered.length === allLocations.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  useEffect(() => {
    handleindeterminate();
    handleChecked();
  }, [selectedRowIds, allLocations]);

  const handleRowSelect = (id: number) => {
    if (selectedRowIds.includes(id)) {
      const filtered = selectedRowIds.filter((row) => row !== id);
      setSelectedRowIds(filtered);
    } else {
      setSelectedRowIds((prev) => [...prev, id]);
    }
  };

  const columns = [
    {
      field: "checkbox",
      renderHeader: () => {
        return (
          <div>
            <Checkbox
              indeterminate={indeterminate}
              onClick={handleColumnRowSelect}
              checked={checked}
            />
          </div>
        );
      },
      width: 60,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div>
            <Checkbox
              onChange={() => handleRowSelect(params.row.id)}
              checked={selectedRowIds.includes(params.row.id)}
            />
          </div>
        );
      },
    },

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
      renderCell: (params: any) => {
        return (
          <div
            style={{ cursor: "pointer", display: "flex", color: "#8E8E8E" }}
            onClick={() => {
              onStarClick(params.row);
            }}
          >
            {starredItems.includes(params.row.id) ? (
              <StarIcon sx={{ color: "#FFCC00" }} />
            ) : (
              <StarBorderRoundedIcon />
            )}
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

        const online: boolean = isOnline && name ? true : false;

        return (
          <>
            <CellLocation name={name} online={online} />
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
      renderCell: (params: any) => {
        const isOnline: boolean = params.row.is_online;
        const robotId: string = params.row.robot_id;

        return (
          <>
            <CellRobot robotId={robotId} online={isOnline} />
          </>
        );
      },
      flex: 0.6,
      editable: false,
      sortable: false,
    },
    {
      field: "is_online",
      headerName: "Location Types",
      renderCell: (params: any) => {
        return <span>Serving</span>;
      },
      width: 50,
      flex: 1,
      editable: false,
      sortable: false,
    },
  ];

  useEffect(() => {
    const pages = dataCnt === 0 ? 1 : Math.ceil(dataCnt / 6);
    setPageCnt(pages);
  }, [dataCnt]);

  return (
    <div className="Table">
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={robots}
          // checkboxSelection
          hideFooterPagination
          hideFooter
          disableColumnMenu
          disableRowSelectionOnClick
          rowHeight={64}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 6, page: 0 },
            },
          }}
        />
      </Box>
      <div className="table-pagination-container">
        <Pagination
          count={pageCnt}
          onChange={(e, page: number) => setTablePage(page)}
          page={tablePage}
        />
      </div>
    </div>
  );
}
