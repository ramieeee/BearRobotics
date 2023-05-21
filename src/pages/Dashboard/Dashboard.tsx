import { useEffect, useState } from "react";
import { Location } from "mocks/db";
import Robot from "interface/Robot";
import "./Dashboard.css";
import { getStarredItems, putStarredItems } from "apis/StarredItems";

// components
import Table from "components/Table/Table";
import SelectBox from "components/SelectBox/SelectBox";
import SearchBox from "components/SearchBox/SearchBox";

export default function Dashboard(): JSX.Element {
  const [allLocations, setAllLocations] = useState<number[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [robots, setRobots] = useState<Robot[]>([]);
  const [dataCnt, setDataCnt] = useState<number>(0);

  // filter conditions
  const [searchText, setSearchText] = useState<string>("");
  const [timeoutToggle, setTimeoutToggle] = useState<NodeJS.Timeout | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<string>("allLocations");
  const [tablePage, setTablePage] = useState<number>(1);
  const [starredItems, setStarredItems] = useState<number[]>([]);

  const clearAll = () => {
    setSearchText("");
    if (timeoutToggle) clearTimeout(timeoutToggle);
    setSelectedItem("allLocations");
    setTablePage(1);
  };

  const getAllLocations = async () => {
    await fetch(
      `/locations?searchText=${searchText}&page=${0}&selectedItem=${selectedItem}`
    )
      .then(async (data) => {
        const allLocationData = await data.json();
        console.log(allLocationData);

        let allIds: number[] = [];
        allLocationData.locations.forEach((row: Location) => {
          allIds.push(row.id);
        });
        // setSelectedRowIds(allIds);

        setAllLocations(allIds);
      })
      .catch(() => {
        alert("Error getting all locations. Please try again");
      });
  };

  const getLocation = async (
    searchText?: string,
    selectedItem?: string,
    tablePage?: number
  ) =>
    await fetch(
      `/locations?searchText=${searchText}&page=${tablePage}&selectedItem=${selectedItem}`
    )
      .then(async (data) => {
        const locationData = await data.json();
        setLocations(locationData?.locations);
        setDataCnt(locationData?.total_count);
      })
      .catch((e) => {
        alert("Error getting locations. Please try again");
      });

  // on first render
  useEffect(() => {
    getAllLocations();
    getLocation(searchText, selectedItem, tablePage);
    getStarredItems().then((items) => setStarredItems(items.location_ids));
  }, []);

  // when search condition changes
  useEffect(() => {
    getAllLocations();
    getLocation(searchText, selectedItem, tablePage);
  }, [tablePage]);

  useEffect(() => {
    getAllLocations();
    if (tablePage !== 1) {
      setTablePage(1);
    } else {
      getLocation(searchText, selectedItem, tablePage);
    }
  }, [selectedItem]);

  // when text search condition changes
  useEffect(() => {
    if (timeoutToggle) {
      clearTimeout(timeoutToggle);
    }
    const timer = setTimeout(() => {
      if (tablePage !== 1) {
        setTablePage(1);
      } else {
        getAllLocations();
        getLocation(searchText, selectedItem, tablePage);
      }
    }, 500);
    setTimeoutToggle(timer);
  }, [searchText]);

  // change object type
  useEffect(() => {
    if (locations.length > 0) {
      let _robots: Robot[] = [];
      locations?.forEach((data: Location) => {
        _robots.push({
          id: data.id,
          name: data.name,
          robot_id: data.robot.id,
          is_online: data.robot.is_online,
        });
      });
      setRobots(_robots);
    } else {
      setRobots([]);
    }
  }, [locations]);

  const onStarClick = (id: Robot) => {
    putStarredItems(id).then(() => {
      getStarredItems().then((items) => setStarredItems(items.location_ids));
    });
  };

  return (
    <div className="Dashboard">
      <div className="title" onClick={clearAll}>
        Your Fleet
      </div>
      <div className="header">
        <SelectBox
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <SearchBox
          setSearchText={setSearchText}
          searchText={searchText}
          placeHolder={"Search robot or location"}
          width={"240px"}
          height={"40px"}
          backgroundColor={"#fafafa"}
          inputBackgroundColor={"#fafafa"}
          searchIconColor={"#000000"}
          placeholderPadding={"10px 8px 10px 16px"}
        />
      </div>
      <div className="table_container">
        <Table
          robots={robots}
          dataCnt={dataCnt}
          starredItems={starredItems}
          setTablePage={setTablePage}
          onStarClick={onStarClick}
          tablePage={tablePage}
          allLocations={allLocations}
        />
      </div>
    </div>
  );
}
