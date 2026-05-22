const { chromium } = require('playwright');

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[BROWSER PAGEERROR] ${err.message}`);
    console.log(err.stack);
  });

  console.log("Navigating to http://localhost:3010/property-in-hinjawadi ...");
  await page.goto('http://localhost:3010/property-in-hinjawadi');

  console.log("Waiting for network idle...");
  await page.waitForLoadState('networkidle');

  console.log("Taking screenshot of the page...");
  await page.screenshot({ path: 'C:\\Users\\mestr\\.gemini\\antigravity-ide\\brain\\0bb1bd7a-97d0-487a-9e2a-0accb69c0242\\console_test.png' });

  // Let's also check if the properties are present in the DOM
  const articlesCount = await page.locator('article').count();
  console.log(`Number of article elements in the DOM: ${articlesCount}`);

  await browser.close();
  console.log("Done.");
}

run().catch(err => {
  console.error("Error running test script:", err);
});
