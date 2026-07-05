import { access, cp, mkdir } from "node:fs/promises";

const folders = [
  "SVG",
  "assets",
  "fonts",
  "fonts.gstatic.com",
  "js",
];

await mkdir("dist", { recursive: true });

for (const folder of folders) {
  try {
    await access(folder);
  } catch {
    continue;
  }

  await cp(folder, `dist/${folder}`, {
    recursive: true,
    force: true,
  });
}
