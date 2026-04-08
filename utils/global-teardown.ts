import { clear } from "console";
import * as fs from "fs";
import path from "path";

async function globalTeardown() {
  // tiny wait to ensure file is fully written
  await new Promise((res) => setTimeout(res, 500));

  // const filePath = path.join(process.cwd(), "playwright-report.json");
  const filePath = path.join(
    process.env["PWD"] || process.cwd(),
    "playwright-report.json",
  );
  if (!fs.existsSync(filePath)) {
    process.stdout.write("Playwright report not found!\n");
    return;
  }
  const rawData = fs.readFileSync(filePath, "utf-8"); //Reads file content as a string.
  const reportData = JSON.parse(rawData); //Converts JSON string → JavaScript object.

  //template literal to create a summary string with test statistics from the report data. It calculates total tests, passed, failed, skipped, and flaky tests using the stats object from the report data.
  const summary = `
Total   : ${reportData.stats.expected + reportData.stats.unexpected + reportData.stats.skipped + (reportData.stats.flaky || 0)}
Passed  : ${reportData.stats.expected}
Failed  : ${reportData.stats.unexpected}
Skipped : ${reportData.stats.skipped}
Flaky   : ${reportData.stats.flaky || 0}
`;

  fs.writeFileSync(path.join(process.cwd(), "summary.txt"), summary); //creates summary.txt and write into it.
  console.log(summary);
}

export default globalTeardown;
