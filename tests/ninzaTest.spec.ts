import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright"; // <-- Importing allure from allure-playwright
test("Sample test without annotations", async ({ page }) => {
  // Mark this test as critical in reports
  //   allure.severity("critical"); // <-- THIS sets severity in Allurenpm install allure-js-commons
  await page.goto("http://49.249.28.218:809/");
  const title = await page.title();
  console.log(title);
  await expect(page).toHaveTitle(title); // replace with actual expected title
});

//Use tags @critical to filter testcases in Allure UI report
test("@critical Sample test with annotation", async ({ page }) => {
  // Mark this test as critical in reports
  // test.info().annotations.push({ type: "severity", description: "critical" });
  allure.severity("critical"); // <-- THIS sets severity in Allure reports
  //test.step() -> Step description → helps in Allure reports / debugging
  await test.step("Open application", async () => {
    // await page.goto("http://49.249.28.218:8098/");
    await page.goto("http://49.249.28.218:8098/");
  });
  await test.step("Validate title", async () => {
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle(title); // replace with actual expected title
  });
});

// test("Allure with full meta data", async ({ page }) => {
//   await allure.epic("E-Commerce");
//   await allure.feature("Authentication");
//   await allure.story("User Login");

//   await allure.severity("critical");

//   await page.goto("http://49.249.28.218:8098/");
// }); //edited
