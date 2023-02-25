import dayjs from "../lib/day";

export const LOCATIONS = [
  { lat: "29.749907", lon: "-95.358421", name: "Houston, Texas", time: dayjs().format("h:mm a"), utcOffset: -6 },
  { lat: "59.3293", lon: "18.0686", name: "Stockholm, Sweden", time: dayjs().utcOffset(1, false).format("h:mm a"), utcOffset: 1 },
  { lat: "13.0827", lon: "80.2707", name: "Chennai, TamilNadu", time: dayjs().utcOffset(330, false).format("h:mm a"), utcOffset: 330 },
]


export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];