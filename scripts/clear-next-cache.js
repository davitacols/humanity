const fs = require("fs");
const path = require("path");

const targets = [".next", "dev-server.log"];

for (const target of targets) {
  const fullPath = path.join(process.cwd(), target);

  try {
    fs.rmSync(fullPath, {
      recursive: true,
      force: true
    });
    console.log(`Removed ${target}`);
  } catch (error) {
    console.error(`Failed to remove ${target}:`, error.message);
    process.exitCode = 1;
  }
}

if (process.exitCode !== 1) {
  console.log("Next.js cache cleared.");
}
