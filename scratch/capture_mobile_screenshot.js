const { chromium } = require('playwright');

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set to mobile view
  await page.setViewportSize({ width: 360, height: 850 });

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[BROWSER PAGEERROR] ${err.message}`);
  });

  console.log("Navigating to http://localhost:3010/property-in-hinjawadi ...");
  await page.goto('http://localhost:3010/property-in-hinjawadi');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // wait for hydration and transitions

  console.log("Taking mobile screenshot...");
  await page.screenshot({ 
    path: 'C:\\Users\\mestr\\.gemini\\antigravity-ide\\brain\\0bb1bd7a-97d0-487a-9e2a-0accb69c0242\\mobile_search_hinjawadi_fixed_real.png',
    fullPage: false 
  });

  console.log("Taking full page mobile screenshot...");
  await page.screenshot({ 
    path: 'C:\\Users\\mestr\\.gemini\\antigravity-ide\\brain\\0bb1bd7a-97d0-487a-9e2a-0accb69c0242\\mobile_search_hinjawadi_fixed_real_full.png',
    fullPage: true 
  });

  await browser.close();
  console.log("Screenshot saved.");
}

run().catch(console.error);
