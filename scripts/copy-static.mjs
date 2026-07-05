import { cp, mkdir } from "node:fs/promises";

const folders = [
  "SVG",
  "assets",
  "cdn.jsdelivr.net",
  "fonts",
  "fonts.gstatic.com",
  "js",
];

await mkdir("dist", { recursive: true });

for (const folder of folders) {
  await cp(folder, `dist/${folder}`, {
    recursive: true,
    force: true,
  });
}
