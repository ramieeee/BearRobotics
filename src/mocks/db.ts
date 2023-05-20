export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "robot_01",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "Test restaurant 01",
    robot: {
      id: "robot_01",
      is_online: true,
    },
  },
  {
    id: 3,
    name: "Test restaurant 02",
    robot: {
      id: "robot_02",
      is_online: true,
    },
  },
  {
    id: 4,
    name: "Test restaurant 03",
    robot: {
      id: "robot_09",
      is_online: false,
    },
  },
  {
    id: 5,
    name: "Test restaurant 04",
    robot: {
      id: "robot_11",
      is_online: false,
    },
  },
  {
    id: 6,
    name: "Test restaurant 05",
    robot: {
      id: "robot_12",
      is_online: true,
    },
  },
  {
    id: 7,
    name: "Test restaurant 06",
    robot: {
      id: "robot_13",
      is_online: false,
    },
  },
  {
    id: 8,
    name: "Test restaurant 07",
    robot: {
      id: "robot_14",
      is_online: false,
    },
  },
  {
    id: 9,
    name: "Test restaurant 08",
    robot: {
      id: "robot_15",
      is_online: true,
    },
  },
  {
    id: 10,
    name: "Test restaurant 09",
    robot: {
      id: "robot_20",
      is_online: true,
    },
  },
  {
    id: 11,
    name: "Test restaurant 10",
    robot: {
      id: "robot_27",
      is_online: true,
    },
  },
  {
    id: 12,
    name: "Test restaurant 11",
    robot: {
      id: "robot_28",
      is_online: true,
    },
  },
  {
    id: 13,
    name: "Test restaurant 12",
    robot: {
      id: "robot_29",
      is_online: false,
    },
  },
  {
    id: 14,
    name: "Test restaurant 13",
    robot: {
      id: "robot_30",
      is_online: true,
    },
  },
  {
    id: 15,
    name: "Test restaurant 14",
    robot: {
      id: "robot_33",
      is_online: false,
    },
  },
  {
    id: 16,
    name: "Test restaurant 15",
    robot: {
      id: "robot_34",
      is_online: true,
    },
  },
  {
    id: 17,
    name: "Test restaurant 16",
    robot: {
      id: "robot_35",
      is_online: false,
    },
  },
  {
    id: 18,
    name: "Test restaurant 17",
    robot: {
      id: "robot_36",
      is_online: false,
    },
  },
  {
    id: 19,
    name: "Test restaurant 18",
    robot: {
      id: "robot_37",
      is_online: true,
    },
  },
  {
    id: 20,
    name: "Test restaurant 19",
    robot: {
      id: "robot_65",
      is_online: false,
    },
  },
  {
    id: 21,
    name: "Test restaurant 20",
    robot: {
      id: "robot_87",
      is_online: false,
    },
  },
];
