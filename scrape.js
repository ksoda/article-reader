const puppeteer = require("puppeteer");
const Readability = require("readability");
const { JSDOM } = require("jsdom");

async function main(url) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(url);

  const html = await page.evaluate(() => {
    document.querySelectorAll("pre").forEach(e => e.remove());
    return document.body.innerHTML;
  });
  const { title, excerpt, textContent } = new Readability(
    new JSDOM(html).window.document
  ).parse();

  await browser.close();
  return { content: [title, textContent].join("\n") };
}

if (process.env.__DEV__)
  (async () =>
    console.log(
      (await main(require("fs").readFileSync("/dev/stdin", "utf8"))).content
    ))();
else
  exports.scrape = async (req, res) => {
    res.set("Content-Type", "application/json");
    res.send(main(req.body.url));
  };
