import puppeteer, { Browser, Page, SetCookie } from "puppeteer";
import { createUser } from "../factories/user.factory";
import { createSession } from "../factories/session.factory";

export class CustomPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  static async build() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const customPage = new CustomPage(page);

    return new Proxy<CustomPage & Page & Browser>(customPage as any, {
      get: (
        target: CustomPage,
        property: keyof Page | keyof Browser | keyof CustomPage
      ) => {
        return (
          target[property as keyof CustomPage] ||
          browser[property as keyof Browser] ||
          page[property as keyof Page]
        );
      },
    });
  }

  async login() {
    const user = await createUser();
    const { sig, session } = createSession(user);

    const cookies: SetCookie[] = [
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
    await this.page.setCookie(...cookies);
    await this.page.goto("http://localhost:3000");
    await this.page.waitForSelector(
      'a[href="http://localhost:5000/auth/logout"]'
    );
  }

  getContentsOf(selector: string) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }
}
