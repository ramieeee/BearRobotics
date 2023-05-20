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
  const [locations, setLocations] = useState<Location[]>([]);
  const [robots, setRobots] = useState<Robot[]>([]);
  const [dataCnt, setDataCnt] = useState<number>(0);

  // filter conditions
  const [searchText, setSearchText] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [tablePage, setTablePage] = useState<number>(1);
  const [starredItems, setStarredItems] = useState<number[]>([]);

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

  useEffect(() => {
    getLocation(searchText, selectedItem, tablePage);
    getStarredItems().then((items) => setStarredItems(items.location_ids));
  }, []);

  // when search condition changes
  useEffect(() => {
    getLocation(searchText, selectedItem, tablePage);
  }, [selectedItem, tablePage]);

  useEffect(() => {
    getLocation(searchText, selectedItem, tablePage);
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
      <div className="title">Your Fleet</div>
      <div className="header">
        <SelectBox
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <SearchBox setSearchText={setSearchText} />
      </div>
      <div className="table_container">
        <Table
          robots={robots}
          dataCnt={dataCnt}
          starredItems={starredItems}
          setTablePage={setTablePage}
          onStarClick={onStarClick}
        />
      </div>
    </div>
  );
}
