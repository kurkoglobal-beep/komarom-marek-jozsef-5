import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, sep } from "node:path";

const catalogPath = "assets/asset-library.json";
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const requiredFields = [
  "id",
  "name",
  "version",
  "createdAt",
  "creator",
  "description",
  "purpose",
  "relatedSprint",
  "category",
  "sourcePath",
  "renditions",
  "status",
];
const versionedFilename = /^KMJ5_[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*_v\d{2}\.[A-Za-z0-9]+$/;
const visualExtensions = new Set([
  ".ai",
  ".avif",
  ".fig",
  ".jpeg",
  ".jpg",
  ".pdf",
  ".png",
  ".psd",
  ".svg",
  ".tif",
  ".tiff",
  ".webp",
]);
const errors = [];
const cataloguedPaths = new Set();
const ids = new Set();

function validatePath(path, label) {
  if (!existsSync(path)) errors.push(`${label} does not exist: ${path}`);
  const filename = path.split("/").at(-1);
  if (!versionedFilename.test(filename)) {
    errors.push(`${label} is not versioned according to KMJ5 naming rules: ${path}`);
  }
  cataloguedPaths.add(path);
}

for (const [index, asset] of catalog.assets.entries()) {
  for (const field of requiredFields) {
    if (asset[field] === undefined || asset[field] === "") {
      errors.push(`Asset ${index + 1} is missing required field: ${field}`);
    }
  }
  if (ids.has(asset.id)) errors.push(`Duplicate asset id: ${asset.id}`);
  ids.add(asset.id);
  if (!/^v\d{2}$/.test(asset.version)) {
    errors.push(`Invalid version for ${asset.id}: ${asset.version}`);
  }
  if (!Array.isArray(asset.purpose) || asset.purpose.length === 0) {
    errors.push(`Purpose must be a non-empty array for ${asset.id}`);
  }
  if (!Array.isArray(asset.renditions)) {
    errors.push(`Renditions must be an array for ${asset.id}`);
    continue;
  }
  validatePath(asset.sourcePath, `Source for ${asset.id}`);
  for (const rendition of asset.renditions) {
    validatePath(rendition.path, `Rendition for ${asset.id}`);
  }
}

function collectVisuals(directory) {
  const paths = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...collectVisuals(path));
    else if (visualExtensions.has(extname(entry.name).toLowerCase())) {
      paths.push(path.split(sep).join("/"));
    }
  }
  return paths;
}

for (const root of ["assets", "public/assets"]) {
  for (const path of collectVisuals(root)) {
    if (!cataloguedPaths.has(path)) errors.push(`Uncatalogued visual asset: ${path}`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `Asset Library valid: ${catalog.assets.length} catalog entries, ${cataloguedPaths.size} tracked files.`,
);
