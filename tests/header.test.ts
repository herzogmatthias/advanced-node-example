import { Browser, Page, SetCookie } from "puppeteer";
import { CustomPage } from "./helpers/page.helper";

let page: CustomPage & Browser & Page;
beforeEach(async () => {
  page = await CustomPage.build();
  await page.goto("http://localhost:3000");
});
afterEach(async () => {
  await page.close();
});

test("the header has the correct text", async () => {
  const text = await page.getContentsOf("a.brand-logo");

  expect(text).toEqual("Blogster");
});

test("clicking login starts oauth flow", async () => {
  await page.click(".right a");
  const url = page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shows logout button", async () => {
  await page.login();

  const text = await page.getContentsOf(
    'a[href="http://localhost:5000/auth/logout"]'
  );

  expect(text).toEqual("Logout");
});
