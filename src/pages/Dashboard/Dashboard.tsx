import { useEffect, useState } from "react";
import { Location } from "mocks/db";
import Table from "components/Table";
import "./Dashboard.css";
import Robot from "interface/Robot";

export default function Dashboard(): JSX.Element {
  const [locations, setLocations] = useState<Robot[]>([]);

  const getLocation = async () =>
    await fetch("/locations")
      .then(async (data) => {
        const locationData = await data.json();
        locationData.map((data: Location) => {
          return {
            id: data.id,
            name: data.name,
            robot_id: data.robot.id,
            is_online: data.robot.is_online,
          };
        });
        setLocations(locationData);
      })
      .catch((e) => {
        alert("Error getting locations. Please try again");
      });
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="Dashboard">
      <div className="header">Your Fleet</div>
      <div className="search_filter_container"></div>
      <div className="table_container">
        <Table locations={locations} />
      </div>
    </div>
  );
}
