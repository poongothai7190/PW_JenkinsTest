import { test, expect } from "@playwright/test";

test("Sample test without annotations", async ({ page }) => {
  // Mark this test as critical in reports
  //   allure.severity("critical"); // <-- THIS sets severity in Allurenpm install allure-js-commons
  await page.goto("http://49.249.28.218:8098/");
  const title = await page.title();
  console.log(title);
  await expect(page).toHaveTitle(title); // replace with actual expected title
});
