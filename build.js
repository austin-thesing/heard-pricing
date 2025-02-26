#!/usr/bin/env bun
import { build } from "esbuild";
import fs from "fs";
import path from "path";

// Create dist directory if it doesn't exist
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

// Define the JS files to build
const entryPoints = ["pricing-swap.js", "pricing-update.js"];


// Build configuration
const buildOptions = {
  entryPoints,
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["es2020"],
  outdir: "dist",
  format: "esm",
  loader: { ".js": "js" },
};

// Production build
async function runBuild() {
  try {
    // Build the files
    await build(buildOptions);

    console.log("✅ Build completed successfully!");

    // Log file sizes
    entryPoints.forEach((file) => {
      const originalSize = fs.statSync(file).size;
      const minifiedSize = fs.statSync(path.join("dist", file)).size;
      const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

      console.log(`${file}: ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${reduction}% reduction)`);
    });
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

// Helper function to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

runBuild();
