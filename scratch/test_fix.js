const { chromium } = require('playwright');

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 360, height: 800 });

  console.log("Navigating to http://localhost:3010/property-in-hinjawadi ...");
  await page.goto('http://localhost:3010/property-in-hinjawadi');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // wait for hydration

  const overflowBefore = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const mainEl = document.querySelector('main');
    return {
      docWidth,
      mainWidth: mainEl ? mainEl.getBoundingClientRect().width : null,
      mainRight: mainEl ? mainEl.getBoundingClientRect().right : null,
    };
  });
  console.log("Before fix - Document width:", overflowBefore.docWidth);
  console.log("Before fix - Main width:", overflowBefore.mainWidth);
  console.log("Before fix - Main right edge:", overflowBefore.mainRight);

  // Apply fixes
  console.log("Applying CSS fixes...");
  await page.evaluate(() => {
    // Fix 1: Add min-w-0 to main element
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.classList.add('w-full', 'min-w-0');
    }

    // Fix 2: Ensure any outer flex container allows shrinking
    const flexParent = document.querySelector('div.flex.gap-6.items-start');
    if (flexParent) {
      flexParent.classList.add('w-full', 'min-w-0');
    }
  });

  // Re-evaluate overflow
  const overflowAfter = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const mainEl = document.querySelector('main');
    
    const elementsWithOverflow = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1) {
        let selector = el.tagName.toLowerCase();
        if (el.id) selector += `#${el.id}`;
        if (el.className) selector += `.${Array.from(el.classList).join('.')}`;
        elementsWithOverflow.push({
          selector: selector.substring(0, 100),
          width: rect.width,
          right: rect.right
        });
      }
    }

    return {
      docWidth,
      mainWidth: mainEl ? mainEl.getBoundingClientRect().width : null,
      mainRight: mainEl ? mainEl.getBoundingClientRect().right : null,
      elementsWithOverflow
    };
  });

  console.log("\nAfter fix - Document width:", overflowAfter.docWidth);
  console.log("After fix - Main width:", overflowAfter.mainWidth);
  console.log("After fix - Main right edge:", overflowAfter.mainRight);
  
  console.log("\nElements still overflowing after fix:");
  if (overflowAfter.elementsWithOverflow.length === 0) {
    console.log("None! All elements fit perfectly within the viewport!");
  } else {
    overflowAfter.elementsWithOverflow.forEach((el, index) => {
      console.log(`${index + 1}. Selector: ${el.selector}`);
      console.log(`   Width: ${el.width}px, Right edge: ${el.right}px`);
    });
  }

  // Take a screenshot of the fixed view
  await page.screenshot({ path: 'C:\\Users\\mestr\\.gemini\\antigravity-ide\\brain\\0bb1bd7a-97d0-487a-9e2a-0accb69c0242\\mobile_search_hinjawadi_fixed_test.png' });
  console.log("Screenshot saved.");

  await browser.close();
}

run().catch(console.error);
