export const EVENTS: ChurchEvent[] = [
  {
    id: "prayer-night",
    title: "Night of Prayer",
    description: "An evening to pray together for our church, our families and our nation. Come for a few minutes or stay for the whole night.",
    category: "Prayer",
    start: "2026-11-06T19:00:00+05:30",
    end: "2026-11-06T21:00:00+05:30",
    location: DEFAULT_LOCATION,
  },
  {
    id: "youth-night",
    title: "Youth Fellowship Night",
    description: "Games, worship and a short message for teenagers and young adults. Bring a friend!",
    category: "Youth",
    start: "2026-11-13T18:30:00+05:30",
    end: "2026-11-13T20:30:00+05:30",
    location: "Youth Hall", // TODO
  },
  {
    id: "food-drive",
    title: "Community Food Drive",
    description: "Help us pack and deliver food parcels to families in need. Volunteers of all ages are welcome.",
    category: "Community",
    start: "2026-11-21T09:00:00+05:30",
    end: "2026-11-21T13:00:00+05:30",
    location: DEFAULT_LOCATION,
  },
  {
    id: "kids-praise",
    title: "Children's Praise Day",
    description: "A fun morning of songs, stories and crafts for children aged 3 to 12, with parents welcome to join.",
    category: "Kids",
    start: "2026-11-29T10:00:00+05:30",
    end: "2026-11-29T12:00:00+05:30",
    location: DEFAULT_LOCATION,
  },
  {
    id: "retreat",
    title: "Annual Church Retreat",
    description: "Three days away to rest, reflect and grow closer to God and to one another. Registration is required.",
    category: "Special",
    start: "2026-12-04T09:00:00+05:30",
    end: "2026-12-06T17:00:00+05:30",
    allDay: true,
    location: "Retreat Centre", // TODO
    href: "/plan-a-visit",
  },
  {
    id: "carols",
    title: "Carols by Candlelight",
    description: "An evening of Christmas carols, readings and candlelight. Everyone is welcome, and it is a lovely way to invite a neighbour.",
    category: "Special",
    start: "2026-12-20T18:00:00+05:30",
    end: "2026-12-20T20:00:00+05:30",
    location: DEFAULT_LOCATION,
  },
  {
    id: "christmas-service",
    title: "Christmas Day Service",
    description: "Celebrate the birth of Jesus with worship, a message of hope and time together as a church family.",
    category: "Service",
    start: "2026-12-25T09:00:00+05:30",
    end: "2026-12-25T10:30:00+05:30",
    location: DEFAULT_LOCATION,
  },
  {
    id: "watchnight",
    title: "Watchnight Service",
    description: "Close out the year in worship and prayer, and welcome the new year together.",
    category: "Service",
    start: "2026-12-31T22:00:00+05:30",
    end: "2027-01-01T00:30:00+05:30",
    location: DEFAULT_LOCATION,
  },
];

// Regular weekly gatherings (shown in "Every week")
export const WEEKLY = [
  { name: "Sunday Worship", day: "Every Sunday", time: "9:00 AM & 11:00 AM", text: "Worship, prayer and a message from the Bible." }, // TODO
  { name: "Midweek Prayer", day: "Every Wednesday", time: "7:00 PM", text: "A relaxed hour of prayer for church and community." }, // TODO
  { name: "Youth Fellowship", day: "Every Friday", time: "6:30 PM", text: "Friendship, worship and teaching for young people." }, // TODO
  { name: "Children's Church", day: "Every Sunday", time: "During the 11:00 AM service", text: "Age-appropriate songs and lessons for children." }, // TODO
];