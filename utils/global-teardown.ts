import { clear } from "console";
import * as fs from "fs";
import path from "path";

async function globalTeardown() {
  // tiny wait to ensure file is fully written
  await new Promise((res) => setTimeout(res, 500));

  const filePath = path.join(process.cwd(), "playwright-report.json");
  if (!fs.existsSync(filePath)) {
    process.stdout.write("Playwright report not found!\n");
    return;
  }
  const rawData = fs.readFileSync(filePath, "utf-8");
  const reportData = JSON.parse(rawData);
  const summary = `
Total   : ${reportData.stats.expected + reportData.stats.unexpected + reportData.stats.skipped + (reportData.stats.flaky || 0)}
Passed  : ${reportData.stats.expected}
Failed  : ${reportData.stats.unexpected}
Skipped : ${reportData.stats.skipped}
Flaky   : ${reportData.stats.flaky || 0}
`;

  fs.writeFileSync(path.join(process.cwd(), "summary.txt"), summary);
  console.log(summary);
}

export default globalTeardown;
