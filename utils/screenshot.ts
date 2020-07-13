import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

function getViewport() {
  const A4 = [8.27, 11.7];
  const dpi = 72;
  return {
    deviceScaleFactor: 1,
    hasTouch: false,
    width: Math.round(A4[0] * dpi),
    height: Math.round(A4[1] * dpi),
    isLandscape: false,
    isMobile: false,
  };
}

export async function getPDF(html: string) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  page.setViewport(getViewport());
  page.emulateMediaType("screen");
  await page.setContent(html, {
    waitUntil: "load",
  });
  const pdf = await page.pdf({ format: "A4" });
  await browser.close();
  return pdf;
}
