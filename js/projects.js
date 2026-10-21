/*
 * PROJECTS
 * --------
 * To add or edit a project, change this list only. The page builds itself from it.
 *
 *   title       Project name (required)
 *   tagline     One short line under the title
 *   description A paragraph about the project
 *   highlights  Bullet points (optional)
 *   tech        Tags shown as chips (optional)
 *   images      Screenshots, e.g. ["assets/projects/onepin/1.png"] (optional).
 *               The first image is the card cover; clicking the card opens all of them large.
 *   links       { live: "https://...", code: "https://..." } (optional)
 *   featured    true to show a "Featured" badge (optional)
 */
window.PROJECTS = [
  {
    title: "MEWA Flood Simulation Platform",
    tagline: "National-scale flood & dam-break analysis for Saudi Arabia",
    description:
      "Platform for the Ministry of Environment, Water and Agriculture that simulates floods and dam-break scenarios, supporting Saudi Vision 2030 goals for water security and disaster resilience.",
    highlights: [
      "Real-time dam-break scenario visualization with 3D terrain modeling",
      "Hazard dashboard fusing satellite imagery, topography and live sensor networks",
      "Automatic building damage assessment from flood parameters",
      "Time-based simulation controls to follow flood progression at any interval",
    ],
    tech: ["ArcGIS JS API 4.x", "React", "TypeScript", "Node.js", "3D"],
    images: ["assets/projects/mewa/dam-break-dashboard.jpg"],
    links: {},
    featured: true,
  },
  {
    title: "GeoIntel",
    tagline: "AI platform for exploring GIS services",
    description:
      "Ask natural-language questions about ArcGIS and GeoServer services. Includes spatial and impact analysis, map-linked dashboards in the style of ArcGIS Dashboards, and AI-written reports.",
    highlights: [
      "Deployed on Vercel with Neon Postgres",
      "Email sign-in and per-user usage metering",
    ],
    tech: ["Next.js", "ArcGIS Maps SDK", "Claude API", "Postgres"],
    images: [
      "assets/projects/geointel/dashboard.jpg",
      "assets/projects/geointel/map-chat.jpg",
    ],
    links: { live: "https://geointel-theta.vercel.app" },
    featured: true,
  },
  {
    title: "Aircraft Global Explorer",
    tagline: "3D flight simulator & world explorer (Web / PWA)",
    description:
      "Fly a plane, helicopter or fighter jet over real cities worldwide, with real airports, runways, 3D buildings and satellite imagery, right in the browser.",
    highlights: [
      "CesiumJS globe with worldwide OSM 3D buildings (custom GLSL shader), terrain and sun shadows",
      "6-DOF flight physics and airport-to-airport autopilot over 3,000+ real airports",
      "Search (Nominatim / Photon), road routing (OSRM) and live ADS-B air traffic",
    ],
    tech: ["CesiumJS", "JavaScript", "GLSL", "PWA", "OSM"],
    images: [
      "assets/projects/aircraft/pyramids-helicopter.jpg",
      "assets/projects/aircraft/alexandria-satellite.jpg",
      "assets/projects/aircraft/alexandria-street-map.jpg",
    ],
    links: {
      live: "https://faresnagyeleissawy.github.io/aircraft-global-explorer/",
      code: "https://github.com/faresnagyeleissawy/aircraft-global-explorer",
    },
    featured: true,
  },
  {
    title: "OnePin",
    tagline: "Global building identification mobile app",
    description:
      "Assigns a permanent, unique 16-digit code to every 3D building in the world by analysing footprints, 3D geometry and spatial relationships, for emergency services, logistics, property management and urban planning.",
    highlights: [
      "Building details card with QR code, height, area, floors and region",
      "Route to any building, with 2D and 3D map views",
    ],
    tech: ["Mobile", "Geospatial algorithms", "3D buildings"],
    images: [
      "assets/projects/onepin/building-details.jpg",
      "assets/projects/onepin/route-to-building.jpg",
      "assets/projects/onepin/route-portrait.jpg",
    ],
    links: {},
  },
  {
    title: "Madinati Mobile GIS",
    tagline: "Public GIS app for the Eastern Province Municipality",
    description:
      "Upgraded the Amanah's public mobile GIS app for iOS and Android within a two-month timeline. 50,000+ downloads on Google Play.",
    highlights: [],
    tech: ["ArcGIS JS API 3.x", "Mobile", "Web GIS"],
    images: [],
    links: {
      live: "https://play.google.com/store/apps/details?id=com.eamana.webgis",
    },
  },
  {
    title: "Oracle → ArcGIS Sync Engine",
    tagline: "Real-time ETL for Amanat Al-Madinah",
    description:
      "Python sync engine that keeps ArcGIS Enterprise feature services in step with an enterprise Oracle database, type-safe, schema-safe and in real time.",
    highlights: [],
    tech: ["Python", "Oracle", "ArcGIS Enterprise", "ETL"],
    images: [],
    links: {},
  },
  {
    title: "Tactical Geospatial Application",
    tagline: "R&D at Itechs-DI",
    description:
      "NATO-compliant real-time geospatial application for offline tactical scenarios, plus off-road routing algorithms that improved route accuracy.",
    highlights: [],
    tech: ["Django", "Angular", "ArcGIS API", "WebSocket"],
    images: [
      "assets/projects/itechs/field-test.jpg",
      "assets/projects/itechs/field-station.jpg",
    ],
    links: {},
  },
  {
    title: "SDG Renewable Energy Dashboard",
    tagline: "Tracking renewable energy indicators",
    description:
      "Esri Web AppBuilder dashboard for SDG-aligned renewable energy indicators, backed by secure ASP.NET Web APIs with identity authentication.",
    highlights: [],
    tech: ["Web AppBuilder", "ASP.NET", "Dashboards"],
    images: [],
    links: {},
  },
];
