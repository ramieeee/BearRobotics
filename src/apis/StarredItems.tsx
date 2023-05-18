import Robot from "interface/Robot";

export const putStarredItems = async (starredItem: Robot) => {
  console.log(starredItem);
  const data = await fetch(`/starred_location_ids`, {
    method: "PUT",
    body: JSON.stringify(starredItem),
  })
    .then((res) => {
      if (res.status === 204) {
        console.log("Successfully starred");
      } else {
        throw new Error("Error star marking");
      }
    })
    .then((res) => {
      // do nothing
    })
    .catch((e) => {
      alert("Error star marking. Please try again");
    });
};

export const getStarredItems = async () => {
  const _data = await fetch(`/starred_location_ids`);
  const data = await _data.json();
  return data;
};
