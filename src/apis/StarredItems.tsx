import Robot from "interface/Robot";

export const putStarredItems = async (starredItem: Robot) => {
  const data = await fetch(`/starred_location_ids`, {
    method: "PUT",
    body: JSON.stringify(starredItem),
    headers: { "Content-type": "application:json" },
  })
    .then(async (res) => {
      if (res.status === 204) {
        console.log("Successfully starred");
      } else {
        throw new Error("Error star marking");
      }
    })
    .then((res) => {
      return res;
    });
};

export const getStarredItems = async () => {
  const _items = await fetch(`/starred_location_ids`);
  const items = await _items.json();
  return items;
};
