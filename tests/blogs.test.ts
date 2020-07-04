import { CustomPage } from "./helpers/page.helper";
import { Browser, Page } from "puppeteer";
import { IAction } from "../src/interfaces/IAction";

let page: CustomPage & Browser & Page;
beforeEach(async () => {
  page = await CustomPage.build();
  await page.goto("http://localhost:3000");
});
afterEach(async () => {
  await page.close();
});

describe("When logged in", () => {
  beforeEach(async () => {
    await page.login();
    await page.goto("http://localhost:3000/blogs");
    await page.click("a.btn-floating");
  });
  test("can see blog create form", async () => {
    const label = await page.getContentsOf("form label");
    expect(label).toEqual("Blog Title");
  });

  describe("and using valid inputs", () => {
    beforeEach(async () => {
      await page.type(".title input", "My Title");
      await page.type(".content input", "My Content");
      await page.click("form button");
    });
    test("Submitting takes user to review screen", async () => {
      const text = await page.getContentsOf("h5");
      expect(text).toEqual("Please confirm your entries");
    });
    test("Submitting then saving adds blog to index page", async () => {
      await page.click("button.green");
      await page.waitForSelector(".card");

      const title = await page.getContentsOf(".card-title");
      const content = await page.getContentsOf("p");

      expect(title).toEqual("My Title");
      expect(content).toEqual("My Content");
    });
  });

  describe("and using invalid inputs", () => {
    beforeEach(async () => {
      await page.click("form button");
    });
    test("the form shows an error message", async () => {
      const titleError = await page.getContentsOf(".title .red-text");
      const contentError = await page.getContentsOf(".content .red-text");
      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
    });
  });
});

describe("User is not logged in", () => {
  const actions: IAction[] = [
    { method: "get", path: "/api/blogs" },
    {
      method: "post",
      path: "/api/blogs",
      body: {
        title: "My Title",
        content: "My Content",
      },
    },
  ];
  test("Blog related actions are prohibited", async () => {
    const results = await page.execRequests(actions);

    for (const result of results) {
      expect(result).toEqual({ error: "You must log in!" });
    }
  });
});
