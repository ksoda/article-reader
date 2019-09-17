import puppeteer from "puppeteer";
import Readability from "readability";
import { JSDOM } from "jsdom";

async function main(req, res) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(req.body.url || "http://example.com");

  const html = await page.evaluate(() => {
    document.querySelectorAll("pre").forEach(e => e.remove());
    return document.body.innerHTML;
  });
  const { title, excerpt, textContent } = new Readability(
    new JSDOM(html).window.document
  ).parse();
  console.log([title, excerpt, ""].join("\n\n"), textContent);

  res.set("Content-Type", "application/json");
  res.send({ title, excerpt, textContent });

  await browser.close();
}

if (process.env.__DEV__)
  main(
    {
      body: {
        url: "http://example.com"
      }
    },
    { set: () => null, send: () => null }
  );
else exports.scrape = main;
