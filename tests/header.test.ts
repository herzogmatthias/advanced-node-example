import puppeteer, { Browser, Page } from "puppeteer";
import { createSession } from "./factories/session.factory";
import { createUser } from "./factories/user.factory";

let browser: Browser;
let page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});
afterEach(async () => {
  await browser.close();
});

test("the header has the correct text", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);

  expect(text).toEqual("Blogster");
});

test("clicking login starts oauth flow", async () => {
  await page.click(".right a");
  const url = page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shows logout button", async () => {
  const user = await createUser();
  const { sig, session } = createSession(user);

  const cookies: puppeteer.SetCookie[] = [
    {
      name: "express:sess.sig",
      value: sig,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      expires: 30 * 24 * 60 * 60 * 1000,
    },
    {
      name: "express:sess",
      value: session,
      httpOnly: true,
      path: "/",
      domain: "localhost",
    },
  ];
  await page.setCookie(...cookies);
  await page.goto("http://localhost:3000");
  await page.waitForSelector('a[href="http://localhost:5000/auth/logout"]');

  const text = await page.$eval(
    'a[href="http://localhost:5000/auth/logout"]',
    (el) => el.innerHTML
  );

  expect(text).toEqual("Logout");
});
