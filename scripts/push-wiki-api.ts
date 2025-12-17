#!/usr/bin/env -S deno run --allow-read --allow-net --allow-env

/**
 * Push wiki pages using GitHub's web interface
 * Workaround: GitHub API doesn't support wiki creation, so we create pages via web
 */

const REPO = "ethanke/lum-ui";
const WIKI_FILES = [
  "Home.md",
  "Components.md", 
  "Charts.md",
  "Theme.md",
  "Examples.md"
];

console.log("📚 GitHub Wiki Manual Setup Instructions\n");
console.log("Since GitHub wikis must be initialized manually, follow these steps:\n");
console.log("=" .repeat(70));

console.log("\n1️⃣  Visit: https://github.com/ethanke/lum-ui/wiki");
console.log("2️⃣  Click 'Create the first page' button");
console.log("3️⃣  For the Home page:");

// Read and display Home.md
const homeContent = await Deno.readTextFile("wiki/Home.md");
console.log("\n📄 Copy this content:\n");
console.log("-".repeat(70));
console.log(homeContent);
console.log("-".repeat(70));

console.log("\n4️⃣  Title: Home");
console.log("5️⃣  Paste the content above");
console.log("6️⃣  Click 'Save Page'\n");

console.log("After creating the Home page, the wiki will be initialized!");
console.log("Then run: ./scripts/init-wiki.sh to push remaining pages\n");
