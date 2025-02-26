#!/usr/bin/env bun
import { build } from "esbuild";
import fs from "fs";
import path from "path";

// Create dist directory if it doesn't exist
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

// Define the JS files to build
const entryPoints = ["pricing-update.js", "./pricing-page/pricing-page-components.js"];

// Build configuration
const buildOptions = {
  entryPoints,
  bundle: true,
  minify: true,
  sourcemap: false,
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

    // Move files from subdirectories to the root of dist
    moveFilesToRoot();

    // Log file sizes
    entryPoints.forEach((file) => {
      try {
        const originalSize = fs.statSync(file).size;

        // For files in subdirectories, we need to get just the filename
        const outputFileName = path.basename(file);
        const outputFilePath = path.join("dist", outputFileName);

        if (fs.existsSync(outputFilePath)) {
          const minifiedSize = fs.statSync(outputFilePath).size;
          const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

          console.log(
            `${file}: ${formatBytes(originalSize)} → ${formatBytes(minifiedSize)} (${reduction}% reduction)`
          );
        } else {
          console.log(
            `${file}: Built successfully, but could not find output file for size comparison`
          );
        }
      } catch (err) {
        console.warn(`Could not calculate size for ${file}: ${err.message}`);
      }
    });
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

// Helper function to move files from subdirectories to the root of dist
function moveFilesToRoot() {
  // Get all subdirectories in dist
  const distPath = path.resolve("dist");
  const items = fs.readdirSync(distPath);

  items.forEach((item) => {
    const itemPath = path.join(distPath, item);

    // Check if it's a directory
    if (fs.statSync(itemPath).isDirectory()) {
      // Get all files in the subdirectory
      const subItems = fs.readdirSync(itemPath);

      // Move each file to the root of dist
      subItems.forEach((subItem) => {
        const subItemPath = path.join(itemPath, subItem);
        const targetPath = path.join(distPath, subItem);

        // Only move if it's a file
        if (fs.statSync(subItemPath).isFile()) {
          // Copy the file to the root
          fs.copyFileSync(subItemPath, targetPath);

          // Delete the original file
          fs.unlinkSync(subItemPath);

          console.log(`Moved ${subItemPath} to ${targetPath}`);
        }
      });

      // Remove the now-empty directory
      fs.rmdirSync(itemPath);
      console.log(`Removed directory ${itemPath}`);
    }
  });
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
