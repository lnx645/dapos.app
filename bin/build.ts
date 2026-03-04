import { build } from "bun";
import { rmSync, mkdirSync, existsSync } from "node:fs";

const OUT_DIR = "./dist";
const OUT_FILE = `${OUT_DIR}/server.js`;

console.log("🧹 Cleaning up old builds...");
if (existsSync(OUT_DIR)) {
  rmSync(OUT_DIR, { recursive: true, force: true });
}
mkdirSync(OUT_DIR);

console.log("🚀 Bundling dapos.app for Node.js target...");

const result = await build({
  entrypoints: ["./bin/app.ts"],
  outdir: OUT_DIR,
  target: "node",     
  packages: "bundle",     
  minify: true,       
  sourcemap: "external", 
  naming: "server.js",
});

if (result.success) {
  console.log("---------------------------------------");
  console.log("✅ SUCCESS!");
  console.log(`📂 File: ${OUT_FILE}`);
  console.log("💡 Jalankan dengan: node dist/server.js");
  console.log("---------------------------------------");
} else {
  console.error("❌ Build Failed!");
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}