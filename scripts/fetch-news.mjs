import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const outputPath = resolve(projectRoot, "public/news.json");
const envPath = resolve(projectRoot, ".env");

function readApiKey() {
  if (process.env.VITE_GNEWS_API_KEY) {
    return process.env.VITE_GNEWS_API_KEY;
  }

  if (!existsSync(envPath)) {
    return "";
  }

  const envFile = readFileSync(envPath, "utf8");
  const match = envFile.match(/^VITE_GNEWS_API_KEY=(.+)$/m);
  return match?.[1]?.trim() || "";
}

async function updateNewsFile() {
  const apiKey = readApiKey();

  if (!apiKey) {
    console.warn("VITE_GNEWS_API_KEY is missing; keeping the existing news file.");
    return;
  }

  const params = new URLSearchParams({
    q: "football OR soccer",
    lang: "en",
    sortby: "publishedAt",
    max: "6",
    apikey: apiKey,
  });

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?${params.toString()}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0] || `GNews returned ${response.status}`);
    }

    writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
    console.log(`Saved ${data.articles?.length || 0} football articles to public/news.json.`);
  } catch (error) {
    console.warn(`Could not refresh football news: ${error.message}`);
    console.warn("Keeping the existing news file so the deployed site still has content.");
  }
}

await updateNewsFile();
