import { DefaultBodyType, rest } from "msw";
import Robot from "interface/Robot";
import { Location } from "./db";
import { locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  rest.get<DefaultBodyType, LocationsPathParams, LocationsResult>(
    "/locations",
    (req, res, ctx) => {
      // Please implement filtering feature here
      // query params: page, location_name, robot_id, is_starred
      const params = req.url;

      const selectedItem = params.searchParams.get("selectedItem");
      const searchText = params.searchParams.get("searchText") as string;
      const page = params.searchParams.get("page") as string;

      const starredItems = JSON.parse(
        sessionStorage.getItem("starred_location_ids") || "[]"
      );

      // 1. check if starred
      let itemList: Location[] = locations;
      if (selectedItem === "starred") {
        itemList = itemList?.filter((item) => starredItems.includes(item.id));
      }

      // 2. check if any text
      const listWithTextFilter = itemList.filter((item) => {
        const locationName = item.name.toLowerCase();
        const robotName = item.robot.is_online
          ? item.robot.id.toLowerCase()
          : "";

        return (
          locationName.includes(searchText.toLowerCase()) ||
          robotName.includes(searchText.toLowerCase())
        );
      });

      if (page === "0") {
        const result: LocationsResult = {
          total_count: listWithTextFilter?.length,
          locations: listWithTextFilter,
        };

        return res(ctx.status(200), ctx.json(result));
      }

      // 3. check page
      // page calculation
      const startRange = (parseInt(page) - 1) * 6;
      const endRange = parseInt(page) * 6;

      const filteredList = listWithTextFilter[endRange]
        ? listWithTextFilter?.slice(startRange, endRange)
        : listWithTextFilter?.slice(startRange);

      const result: LocationsResult = {
        total_count: listWithTextFilter?.length,
        locations: filteredList,
      };

      return res(ctx.status(200), ctx.json(result));
    }
  ),

  rest.get("/starred_location_ids", (req, res, ctx) => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );

    return res(
      ctx.status(200),
      ctx.json({
        location_ids,
      })
    );
  }),

  rest.put("/starred_location_ids", (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(500),
        ctx.json({ error_msg: "Encountered unexpected error" })
      );
    }

    const item = req.body as Robot;
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );
    const isExist = location_ids.includes(item.id);
    if (isExist) {
      const excludedList = location_ids.filter((id: number) => id !== item.id);
      sessionStorage.setItem(
        "starred_location_ids",
        JSON.stringify(excludedList)
      );
    } else {
      location_ids.push(item.id);
      sessionStorage.setItem(
        "starred_location_ids",
        JSON.stringify(location_ids)
      );
    }

    return res(ctx.status(204));
  }),
];
