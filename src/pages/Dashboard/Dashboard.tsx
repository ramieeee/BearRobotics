import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard(): JSX.Element {
  const getLocation = async () =>
    await fetch("/locations")
      .then(async (data) => {
        const temp = await data.json();
        console.log(temp);
      })
      .catch((e) => {
        alert("Error getting locations. Please try again");
      });

  return (
    <div className="Dashboard">
      <button onClick={getLocation}>test</button>
      <div className="header">Your Fleet</div>
      <div className="search_filter_container"></div>
      <div className="table_container"></div>
    </div>
  );
}
