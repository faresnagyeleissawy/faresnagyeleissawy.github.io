# Fares Eleissawy · Portfolio

Static personal portfolio (plain HTML/CSS/JS, no build step), hosted on GitHub Pages.

## Adding or editing a project

1. Put screenshots in `assets/projects/<project-name>/` (e.g. `assets/projects/onepin/1.png`).
2. Open `js/projects.js` and add or edit an entry:

```js
{
  title: "OnePin",
  tagline: "Global building identification mobile app",
  description: "What it does…",
  highlights: ["Key point 1", "Key point 2"],
  tech: ["React", "ArcGIS"],
  images: ["assets/projects/onepin/1.png", "assets/projects/onepin/2.png"],
  links: { live: "https://…", code: "https://github.com/…" },
  featured: true,
}
```

The first image becomes the card cover; clicking the card opens a larger view with all screenshots and details.
Projects without images show a placeholder.

## Run locally

```
python3 -m http.server 8000
```
Then open http://localhost:8000.
