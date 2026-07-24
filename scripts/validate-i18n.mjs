import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const locales = ["hu", "en", "sk", "de"];
const requiredMasterplanKeys = [
  "navigation.masterplan",
  "navigation.apartments",
  "masterplan.title",
  "masterplan.subtitle",
  "masterplan.selectBuilding",
  "masterplan.viewBuilding",
  "masterplan.availableUnits",
  "masterplan.floorCount",
  "masterplan.unitCount",
  "masterplan.layers",
  "masterplan.overview",
  "masterplan.smartPark",
  "masterplan.parking",
  "masterplan.orientation",
  "masterplan.closePanel",
  "masterplan.noData",
  "masterplan.loading",
  "status.comingSoon",
  "status.available",
  "status.temporarilyReserved",
  "status.reserved",
  "status.sold",
  "status.notForSale",
  "cta.viewApartments",
  "cta.contactSales",
  "cta.requestInformation",
  "accessibility.selectBuilding",
  "accessibility.openBuildingDetails",
  "accessibility.closeBuildingDetails",
];

function flatten(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child !== null && typeof child === "object" && !Array.isArray(child)
      ? flatten(child, path)
      : [path];
  });
}

async function parse(relativePath) {
  const source = await readFile(join(root, relativePath), "utf8");
  return JSON.parse(source);
}

const messages = Object.fromEntries(
  await Promise.all(
    locales.map(async (locale) => [
      locale,
      await parse(`i18n/messages/${locale}.json`),
    ]),
  ),
);

await Promise.all(
  locales.map((locale) => parse(`content/marek5/${locale}.json`)),
);

const canonicalKeys = flatten(messages.hu).sort();
for (const locale of locales) {
  const keys = flatten(messages[locale]).sort();
  const missing = canonicalKeys.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !canonicalKeys.includes(key));
  if (missing.length || extra.length) {
    throw new Error(
      `${locale}: translation key mismatch; missing=${missing.join(",") || "-"}; extra=${extra.join(",") || "-"}`,
    );
  }
  const absentMasterplanKeys = requiredMasterplanKeys.filter(
    (key) => !keys.includes(key),
  );
  if (absentMasterplanKeys.length) {
    throw new Error(
      `${locale}: missing Masterplan preparation keys: ${absentMasterplanKeys.join(", ")}`,
    );
  }
}

console.log(
  `i18n validation passed: ${locales.length} locales, ${canonicalKeys.length} UI keys, ${requiredMasterplanKeys.length} required Masterplan keys.`,
);
