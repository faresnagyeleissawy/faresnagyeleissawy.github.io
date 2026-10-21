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
 *   videos      Videos shown before the screenshots (optional): an .mp4 file, e.g.
 *               ["assets/projects/onepin/demo.mp4"], or a YouTube / Vimeo / Google Drive link.
 *   preview     Short, small muted clip (.webm and/or .mp4) that plays on the card when it is selected (optional).
 *               Without it, the first .mp4 in videos is used.
 *   poster      Image shown on the card before the preview plays (optional).
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
    videos: ["https://presentation-show.s3.us-east-1.amazonaws.com/platform.mp4"],
    preview: ["assets/projects/mewa/preview.webm", "assets/projects/mewa/preview.mp4"],
    poster: "assets/projects/mewa/preview-poster.jpg",
    images: [
      "assets/projects/mewa/dam-break-dashboard.jpg",
      "assets/projects/mewa/treated-water-dashboard.jpg",
    ],
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
    videos: ["https://drive.google.com/file/d/1i0Vq5b-9bGN9Y9FwIU-Nwhj-TU3-lWt_/view"],
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
    title: "Global Building Atlas 3D",
    tagline: "Explore 2.75 billion buildings in 3D",
    description:
      "Interactive 3D viewer for the GlobalBuildingAtlas, the open dataset of building polygons, heights and LoD1 models released by the Technical University of Munich. Query and display buildings anywhere on Earth, colored by height in real time.",
    highlights: [
      "Queries the dataset through WFS and renders LoD1 buildings with height-based coloring",
      "Click any building for its height, source, region and ID",
      "Built for flood analysis, urban planning and disaster management",
    ],
    tech: ["ArcGIS Maps SDK", "WFS", "3D", "GeoJSON"],
    images: ["assets/projects/building-atlas/3d-buildings.jpg"],
    links: {},
  },
  {
    title: "Building Cluster Intelligence",
    tagline: "AI-powered clustering for last-mile delivery",
    description:
      "Built on the GlobalBuildingAtlas (2.75B buildings), this platform applies machine learning to massive geospatial data to turn manual delivery planning into automated, data-driven distribution, scalable to any city worldwide.",
    highlights: [
      "40% faster delivery cycles and 30% savings in operating costs",
      "K-Means, grid-based and hybrid clustering with quality metrics (compactness, balance, size consistency)",
      "15K+ buildings clustered into 128 territories in about a second",
      "Real-time 3D territory management",
    ],
    tech: ["Machine Learning", "K-Means", "ArcGIS Maps SDK", "Logistics", "Big Data"],
    images: ["assets/projects/cluster/building-cluster-intelligence.jpg"],
    links: {},
    featured: true,
  },
  {
    title: "Point Cloud & 3D Modeling",
    tagline: "Reality capture of an industrial power plant",
    description:
      "3D scan of a gas turbine power plant site, from panoramic image capture to a colorized point cloud and 3D model of the turbine unit, piping and surrounding facilities.",
    highlights: [
      "Panoramic capture positions registered across the whole site",
      "Dense colorized point cloud of the turbine, stack, piping and buildings",
    ],
    tech: ["Point Cloud", "3D Modeling", "Reality Capture"],
    images: [
      "assets/projects/point-cloud/point-cloud-site.jpg",
      "assets/projects/point-cloud/capture-positions-turbine.jpg",
      "assets/projects/point-cloud/capture-positions-piping.jpg",
    ],
    links: {},
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
    title: "BIM–GIS Integration Training",
    tagline: "Sultan Haitham City, Oman · with Aptus Infotech · Oct 2025",
    description:
      "Led a two-day training program (26–27 October 2025) for Sultan Haitham City professionals on integrating Building Information Modeling and GIS, a core capability for smart, sustainable cities.",
    highlights: [
      "Integration concepts, interoperability and standards (IFC, CityGML, ISO 19650), plus georeferencing and coordinate alignment",
      "Tools: Autodesk Civil 3D, InfraWorks, Revit, ArcGIS Pro & Online, FME and QGIS",
      "Hands-on: BIM to GIS and back, and GIS analysis inside BIM (terrain, flood risk, site selection)",
    ],
    tech: ["BIM", "ArcGIS Pro", "Revit", "FME", "Training"],
    images: [
      "assets/projects/bim-gis/training-session.jpg",
      "assets/projects/bim-gis/training-room.jpg",
    ],
    links: {},
  },
  {
    title: "Madinati Mobile GIS",
    tagline: "Public GIS app for the Eastern Province Municipality",
    description:
      "Upgraded the Amanah's public mobile GIS app for iOS and Android within a two-month timeline. 50,000+ downloads on Google Play.",
    highlights: [
      "Map control and printing: rotate the map, locate places and save maps for print",
      "Smart assistant chat that guides users through the municipality's digital GIS services",
    ],
    tech: ["ArcGIS JS API 3.x", "Mobile", "Web GIS"],
    images: [
      "assets/projects/madinati/map-control.png",
      "assets/projects/madinati/smart-assistant.png",
    ],
    links: {
      live: "https://play.google.com/store/apps/details?id=com.eamana.webgis",
    },
  },
  {
    title: "Oracle → ArcGIS Sync Engine",
    tagline: "Real-time ETL for Amanat Al-Madinah",
    description:
      "Python sync engine that keeps ArcGIS Enterprise feature services in step with an enterprise Oracle database, type-safe, schema-safe and in real time.",
    highlights: [
      "Real-time change detection with Oracle database triggers and DBMS_ALERT notifications",
      "Python sync service (SQLAlchemy, ArcGIS API for Python) with type-safe conversion matched to the ArcGIS schema",
      "Fault-tolerant design with retry logic, error recovery, logging and monitoring",
    ],
    tech: ["Python", "Oracle", "ArcGIS Enterprise", "ETL", "SQLAlchemy"],
    images: ["assets/projects/sync-engine/architecture.png"],
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
    images: ["assets/projects/sdg/sdg-goals.png"],
    links: {},
  },
];
