import puppeteer, { Browser, Page } from "puppeteer";

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
          page[property as keyof Page] ||
          browser[property as keyof Browser]
        );
      },
    });
  }
}
