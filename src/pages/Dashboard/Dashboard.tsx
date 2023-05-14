import { useEffect, useState } from "react";
import { Location } from "mocks/db";
import "./Dashboard.css";

export default function Dashboard(): JSX.Element {
  const [locations, setLocations] = useState<Location[]>();

  const getLocation = async () =>
    await fetch("/locations")
      .then(async (data) => {
        const locationData = await data.json();
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
      <button onClick={() => console.log(locations)}>test</button>
      <div className="header">Your Fleet</div>
      <div className="search_filter_container"></div>
      <div className="table_container"></div>
    </div>
  );
}
