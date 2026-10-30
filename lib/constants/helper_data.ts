import { BandItem, ChurchEvent, Ministry, NavLink, Verse, WeeklyService } from "../types/helper.type";

export const COMMON_TEXTS ={
  App_name : "Praise Prayer Lanka Church",
  App_name_in_short : "PPLC",
  App_description: "Praise Prayer Lanka Church is a Christian church in Sri Lanka dedicated to worship, prayer, sharing God’s Word, and spreading the love of Jesus Christ. Join us in faith, praise, and prayer.",
  Service_time : "Sundays 9:00 AM & 11:00 AM",
  Church_addr : "Rathmalana Sri Lanka",
  Address : "76 Model Town Road, Moratuwa, Rathmalana",
  Phone : "+94 11 261 1278",
  WhatsApp : "+94 77 961 3378",
  email_address: "pplankachurch@hotmail.com",
  Direction_URLS : "https://maps.app.goo.gl/nFAK78ioVhwzWia77?g_st=iwb",
  Map_Embed_URL: "https://www.google.com/maps?output=embed&q=Praise+Prayer+Lanka+Church,+76+Model+Town+Road,+Moratuwa",
  Mission : "To love God, love people and help everyone follow Jesus.",
  Vission : "A community transformed by the love of Jesus, where every person finds hope, belonging and purpose.",
  Next_Gathering : "Sunday · 9:00 AM"
}

export const DEVELOPER_DETAILS ={
  Develped_by : "Clova Softwares",
  Developer_company : "https://clovasoftwares.com"
}

export const EVENT_TIMEZONE = "Asia/Colombo";

export const TIMELINE = [
  {
    year: "19XX",
    title: "A small beginning",
    text: "A handful of families started meeting to pray, worship and encourage one another. There was no building and no programme, only faith and friendship.",
  },
  {
    year: "19XX",
    title: "A growing family",
    text: "As more people joined, we began regular services, Sunday school for children and groups for every age.",
  },
  {
    year: "20XX",
    title: "A place to call home",
    text: "We moved into our own church home, a place that is open to everyone in our community.",
  },
  {
    year: "Today",
    title: "Still growing, still serving",
    text: "Today we are a church family of all ages, serving our city and welcoming new faces every week.",
  },
];

export const TEAM = [
  { name: "Pastor Anthony Simon", role: "Senior Pastor", bio: "Leads our church family with a heart for teaching God's Word." },
  { name: "Sister Philomina", role: "Assistant Pastor", bio: "Cares for our members and oversees pastoral care." },
  { name: "Chamod", role: "Worship Leader", bio: "Leads our music and helps everyone connect with God in worship." },
  { name: "Anoch Dissanayake", role: "Worship Leader", bio: "Leads our music and helps everyone connect with God in worship." },
];

/* ───────────────────────────── Static content ───────────────────────────── */

export const NUTSHELL = [
  {
    title: "We follow Jesus",
    text: "Christians believe Jesus is the Son of God. He came to show us what God is like and to bring us back into a loving relationship with Him.",
    icon: "cross",
  },
  {
    title: "We love people",
    text: "Everyone is valued here, whatever your age, background or story. Nobody is a stranger for long.",
    icon: "heart",
  },
  {
    title: "We serve our community",
    text: "Our faith moves us to help, give and care for the people around us, in practical ways.",
    icon: "globe",
  },
];

export const GLOSSARY = [
  { word: "Worship", meaning: "Singing and praying together to thank God and show Him honour." },
  { word: "Sermon", meaning: "A talk, usually 30–40 minutes, that explains a passage from the Bible and how it applies to everyday life." },
  { word: "Prayer", meaning: "Talking to God, out loud or silently, to thank Him, ask for help or simply be still." },
  { word: "Gospel", meaning: "The 'good news' that God loves us and offers forgiveness and new life through Jesus." },
  { word: "Offering", meaning: "An optional gift given to support the church's work. Guests are never expected to give." },
  { word: "Fellowship", meaning: "Spending time together as friends, over tea, in small groups or at events." },
];

export const VALUES = [
  { title: "Worship", text: "We make time to thank God together, in song, prayer and Scripture.", icon: "music" },
  { title: "The Bible", text: "We learn from the Bible so our lives are built on something solid.", icon: "book" },
  { title: "Community", text: "Faith is better together. We walk with each other through every season.", icon: "users" },
  { title: "Compassion", text: "We care for those in need and treat every person with dignity.", icon: "heart" },
  { title: "Growth", text: "We encourage everyone to keep learning, questioning and growing at their own pace.", icon: "compass" },
  { title: "Mission", text: "We share the hope we have found with our neighbours and the world.", icon: "globe" },
];

export const BELIEFS = [
  { title: "God", text: "There is one God, who made everything and loves us. Christians know Him as Father, Son and Holy Spirit." },
  { title: "Jesus", text: "Jesus is God's Son. He lived a perfect life, died to forgive our wrongs, and rose again so we can have new life." },
  { title: "The Bible", text: "The Bible is God's Word. It is our guide for what to believe and how to live." },
  { title: "Grace", text: "We are forgiven and accepted by God as a free gift, not because we earned it, but because of Jesus." },
  { title: "The Holy Spirit", text: "God's Spirit lives in those who follow Jesus, guiding, comforting and giving strength." },
  { title: "The Church", text: "The church is God's family on earth, meant to love one another and to love the world." },
];

export const FIRST_VISIT = [
  { title: "Arrive", text: "Friendly greeters will welcome you at the door and show you where to go. Arriving 10 minutes early helps you settle in." },
  { title: "Worship & learn", text: "Expect uplifting singing, a time of prayer and a practical talk from the Bible. You can simply watch and listen." },
  { title: "Stay & connect", text: "Join us for tea afterwards and meet some of our church family. There is no pressure, only friendship." },
];

export const VISIT_FACTS = [
  { label: "Dress", value: "Come as you are. Casual or smart, both are welcome." },
  { label: "Length", value: "Around 90 minutes." }, // TODO
  { label: "Children", value: "Children are welcome, with a dedicated programme." }, // TODO
  { label: "Cost", value: "Free. No one is expected to give." },
];

export const FAQS = [
  {
    q: "Do I need to be religious to come?",
    a: "Not at all. People from every background visit us, including those who aren't sure what they believe. You are welcome to come, listen and ask questions.",
  },
  {
    q: "What if I don't know when to stand, sit or sing?",
    a: "Just follow along or simply do what feels comfortable. Nobody will mind, and our greeters are happy to help.",
  },
  {
    q: "Will I be asked to speak or pray out loud?",
    a: "No. You will never be singled out or put on the spot as a visitor.",
  },
  {
    q: "Will I be asked for money?",
    a: "No. An offering is taken during the service to support the church, but it is completely optional for guests.",
  },
  {
    q: "Is there something for my children?",
    a: "Yes, children and young people are an important part of our church family. Ask a greeter and they will show you where to go.", // TODO
  },
  {
    q: "I have doubts and questions about faith. Is that okay?",
    a: "Absolutely. Honest questions are welcome here. Many of us have had them too. Come and talk with us over tea, no strings attached.",
  },
];


export const EVENTS: ChurchEvent[] = [
  {
    id: "prayer-night",
    title: "Night of Prayer",
    description: "An evening to pray together for our church, our families and our nation. Come for a few minutes or stay for the whole night.",
    category: "Prayer",
    start: "2026-11-06T19:00:00+05:30",
    end: "2026-11-06T21:00:00+05:30",
    location: COMMON_TEXTS.Address,
  },
  {
    id: "youth-night",
    title: "Youth Fellowship Night",
    description: "Games, worship and a short message for teenagers and young adults. Bring a friend!",
    category: "Youth",
    start: "2026-11-13T18:30:00+05:30",
    end: "2026-11-13T20:30:00+05:30",
    location: COMMON_TEXTS.Address, // TODO
  },
  {
    id: "food-drive",
    title: "Community Food Drive",
    description: "Help us pack and deliver food parcels to families in need. Volunteers of all ages are welcome.",
    category: "Community",
    start: "2026-11-21T09:00:00+05:30",
    end: "2026-11-21T13:00:00+05:30",
    location: COMMON_TEXTS.Address,
  },
  {
    id: "kids-praise",
    title: "Children's Praise Day",
    description: "A fun morning of songs, stories and crafts for children aged 3 to 12, with parents welcome to join.",
    category: "Kids",
    start: "2026-11-29T10:00:00+05:30",
    end: "2026-11-29T12:00:00+05:30",
    location: COMMON_TEXTS.Address,
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
    location: COMMON_TEXTS.Address,
  },
  {
    id: "christmas-service",
    title: "Christmas Day Service",
    description: "Celebrate the birth of Jesus with worship, a message of hope and time together as a church family.",
    category: "Service",
    start: "2026-12-25T09:00:00+05:30",
    end: "2026-12-25T10:30:00+05:30",
    location: COMMON_TEXTS.Address,
  },
  {
    id: "watchnight",
    title: "Watchnight Service",
    description: "Close out the year in worship and prayer, and welcome the new year together.",
    category: "Service",
    start: "2026-12-31T22:00:00+05:30",
    end: "2027-01-01T00:30:00+05:30",
    location: COMMON_TEXTS.Address,
  },
];

export const WEEKLY_SERVICES: WeeklyService[] = [
  { id: 0, name: "Sunday Worship", day: 0, hour: 9, minute: 0, dayName: "Sunday", timeLabel: "9:00 AM" },
  { id: 1, name: "Midweek Prayer", day: 3, hour: 19, minute: 0, dayName: "Wednesday", timeLabel: "7:00 PM" },
];

export const FOOTER_INFO = {
  name: "Grace Community Church", // TODO
  tagline: "A place to belong, believe and become.",
  phone: "(555) 123-4567",
  email: "hello@yourchurch.org",
  address: ["123 Main Street", "Your City, ST 12345"],
  services: [
    { day: "Sunday", time: "10:00 AM" },
    { day: "Wednesday", time: "7:00 PM" },
  ],
  developer_data: "Designed & Developed by Clova Softwares",
};

export const VIDEOS = [
  {
    id: "dQw4w9WgXcQ", // YouTube video ID: the part after v= in the URL
    title: "Sunday Service: Walking in Faith",
    date: "Oct 12, 2026",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Worship Night Highlights",
    date: "Oct 5, 2026",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Pastor's Message: Hope in Hard Times",
    date: "Sep 28, 2026",
  },
];

export const NOTICES = [
  {
    title: "Prayer & Fasting Week",
    date: "Oct 26 – Nov 1",
    body: "Join us each morning at 6:00 AM for corporate prayer in the main sanctuary.",
    tag: "Event",
  },
  {
    title: "Harvest Food Drive",
    date: "Ongoing",
    body: "Drop non-perishable items at the church entrance. All donations go to local families.",
    tag: "Outreach",
  },
  {
    title: "Youth Retreat Registration",
    date: "Closes Nov 10",
    body: "Sign up with the youth office. Limited spots available.",
    tag: "Youth",
  },
  {
    title: "Service Time Change",
    date: "Nov 3",
    body: "Sunday service will begin at 9:30 AM instead of 10:00 AM this week only.",
    tag: "Important",
  },
];

export const NAV_LINKS: NavLink[] = [
  {
    label: "About",
    href: "/pplc-about-our-story",
  },
  {
    label: "Sermons",
    href: "/pplc-sermons",
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "Kids", href: "/ministries/kids" },
      { label: "Youth", href: "/ministries/youth" },
    ],
  },
  {
    label: "Events",
    href: "/pplc-events",
  },
];

export const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
] as const;

// Short blurbs shown in the About mega menu (keyed by href)
export const DESCRIPTIONS: Record<string, string> = {
  "/about": "Our story, our people and our heart for the community.",
  "/beliefs": "The truths of Scripture that anchor everything we do.",
  "/pplc-events": "Services, groups and events happening near you.",
};

export const SOCIALS = [
  { name: "youtube", href: "#", label: "YouTube" },
  { name: "facebook", href: "#", label: "Facebook" },
  { name: "instagram", href: "#", label: "Instagram" },
];

export const WHEN = ["This Sunday", "Next Sunday", "Not sure yet"];
export const MAX_GUESTS = 10;
export const WEEK = 7 * 86400;
export const CHURCH_TZ_OFFSET_MINUTES = 330;
export const SERVICE_DURATION_MINUTES = 90;
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@lankachurch";

// export const VERSES = [
//   { text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", ref: "John 3:16" },
//   { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
//   { text: "I can do all things through Christ which strengtheneth me.", ref: "Philippians 4:13" },
//   { text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
//   { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
//   { text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God.", ref: "Isaiah 41:10" },
//   { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
//   { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
//   { text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.", ref: "Matthew 5:16" },
//   { text: "Now faith is the substance of things hoped for, the evidence of things not seen.", ref: "Hebrews 11:1" },
//   { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.", ref: "Joshua 1:9" },
//   { text: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.", ref: "1 Corinthians 13:13" },
//   { text: "And we know that all things work together for good to them that love God.", ref: "Romans 8:28" },
//   { text: "The Lord bless thee, and keep thee: the Lord make his face shine upon thee, and be gracious unto thee.", ref: "Numbers 6:24-25" },
// ];

export const VERSES: Verse[] = [
  { text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", ref: "John 3:16" },
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "I can do all things through Christ which strengtheneth me.", ref: "Philippians 4:13" },
  { text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
  { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God.", ref: "Isaiah 41:10" },
  { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
  { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
  { text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.", ref: "Matthew 5:16" },
  { text: "Now faith is the substance of things hoped for, the evidence of things not seen.", ref: "Hebrews 11:1" },
  { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.", ref: "Joshua 1:9" },
  { text: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.", ref: "1 Corinthians 13:13" },
  { text: "And we know that all things work together for good to them that love God.", ref: "Romans 8:28" },
  { text: "The Lord bless thee, and keep thee: the Lord make his face shine upon thee, and be gracious unto thee.", ref: "Numbers 6:24-25" },
];

export const GET_INVOLVED = [
  { label: "Plan a Visit", href: "/plan-a-visit" },
  { label: "Upcoming Events", href: "/pplc-events" },
  { label: "Watch Sermons", href: "/pplc-sermons" },
];

export const inputClass =
  "w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-[16px] text-[#1c1411] outline-none transition-colors placeholder:text-stone-400 focus:border-red-600 focus:ring-4 focus:ring-red-600/10";
export const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500";

export const AT_A_GLANCE = [
  { icon: "clock", label: "When", value: "Sundays at 9:00 AM & 11:00 AM" }, // TODO
  { icon: "pin", label: "Where", value: `${COMMON_TEXTS.Address}` },
  { icon: "heart", label: "What to wear", value: "Come as you are. Casual or smart, both are welcome." },
  { icon: "smile", label: "Children", value: "Warmly welcomed, with a dedicated programme." }, // TODO
];

export const STEPS = [
  { title: "Arrive & be welcomed", text: "Friendly greeters will meet you at the door, answer any questions and show you where to go. Arriving about 10 minutes early helps you settle in." },
  { title: "Worship together", text: "We sing and pray together for about half an hour. Join in or simply listen, whatever feels comfortable." },
  { title: "Hear a message", text: "A practical talk from the Bible, explained in everyday language, for believers and newcomers alike." },
  { title: "Stay for tea", text: "Linger afterwards, meet some of our church family and ask anything on your mind. There is no pressure at all." },
];

export const GOOD_TO_KNOW = [
  { icon: "clock", title: "How long?", text: "Around 90 minutes." }, // TODO
  { icon: "car", title: "Parking", text: "Free parking on site. Greeters can direct you." }, // TODO
  { icon: "users", title: "Accessibility", text: "Step-free entrance and accessible facilities." }, // TODO
  { icon: "coffee", title: "Cost", text: "Free. Nobody is expected to give anything." },
];

export const CONTACT_US_NEXT_STEPS = [
  { n: "1", t: "You send your message", d: "Use the form on this page." },
  {
    n: "2",
    t: "We read it with care",
    d: "A member of our church family reads every message.",
  },
  { n: "3", t: "We reply to you", d: "We will answer by email or phone." },
];

export const phoneHref = `tel:${COMMON_TEXTS.Phone.replace(/[^\d+]/g, "")}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMMON_TEXTS.Address,
)}`;

export const MINISTRIES: Ministry[] = [
  {
    slug: "kids",
    name: "Kids Ministry",
    heroTitle: "Kids",
    heroAccent: "ministry.",
    tagline: "A safe, joyful place to get to know Jesus",
    cardText:
      "Bible stories, songs, games and caring teachers for the youngest members of our church family.",
    intro:
      "Every child is precious to God, and every child is welcome here. Come and see how much fun learning about Jesus can be.",
    about: [
      "Our Kids Ministry is a happy, safe place where children hear the stories of the Bible, sing, play and make friends.",
      "We work together with parents and families, so that what children learn on Sunday can be shared and lived out at home.",
    ],
    whatWeDo: [
      {
        title: "Bible stories",
        text: "Clear, simple lessons that help children understand who God is and how much He loves them.",
      },
      {
        title: "Songs & worship",
        text: "Children sing, clap and praise God together in a joyful way.",
      },
      {
        title: "Games & crafts",
        text: "Hands-on activities that help the lesson stay in a child's heart and mind.",
      },
      {
        title: "Caring teachers",
        text: "Loving volunteers who know the children by name and pray for them.",
      },
    ],
    values: [
      "Every child is welcome",
      "A safe and caring place",
      "Families learning together",
    ],
    verse: {
      text: "Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God.",
      ref: "Mark 10:14 (KJV)",
    },
    // TODO: ages: "Ages …",
    // TODO: meets: { day: "Sunday", time: "…", place: "…" },
  },
  {
    slug: "youth",
    name: "Youth Ministry",
    heroTitle: "Youth",
    heroAccent: "ministry.",
    tagline: "A place to belong, grow and lead",
    cardText:
      "Friendship, Bible study, worship and service for teenagers and young people finding their faith.",
    intro:
      "Faith is for every age. Come as you are, ask your questions, make real friends and discover God's plan for your life.",
    about: [
      "Our Youth Ministry gives young people a place where they are known, heard and encouraged.",
      "We open the Bible together, talk honestly about real life, and help each person grow in faith and take their place in the church.",
    ],
    whatWeDo: [
      {
        title: "Bible study & talks",
        text: "Honest conversations about faith and life, where every question is welcome.",
      },
      {
        title: "Worship",
        text: "Praising God together through music and prayer.",
      },
      {
        title: "Friendship & fun",
        text: "Games, food and time together, so friendships grow strong.",
      },
      {
        title: "Serving & leading",
        text: "Chances to use your gifts, help others and grow as a leader.",
      },
    ],
    values: [
      "Come as you are",
      "Every question is welcome",
      "Growing in faith together",
    ],
    verse: {
      text: "Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.",
      ref: "1 Timothy 4:12 (KJV)",
    },
    // TODO: ages: "Ages …",
    // TODO: meets: { day: "…", time: "…", place: "…" },
  },
];

export const focusRing =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300";

// Soft, friendly colours for each activity card
export const CARD_STYLES = [
  { bg: "bg-red-50", border: "border-red-200", emoji: "📖" },
  { bg: "bg-amber-50", border: "border-amber-200", emoji: "🎵" },
  { bg: "bg-orange-50", border: "border-orange-200", emoji: "🎨" },
  { bg: "bg-rose-50", border: "border-rose-200", emoji: "💛" },
];

// Default quick links for the home page. Change the labels or links freely.
export const HOME_BAND_ITEMS: BandItem[] = [
  { label: "Plan a visit", href: "/plan-a-visit" },
  { label: "Watch sermons", href: "/pplc-sermons" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/calendar" },
  { label: "Give", href: "/give" },
];