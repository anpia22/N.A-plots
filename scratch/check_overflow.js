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

  const overflowInfo = await page.evaluate(() => {
    const docWidth = document.documentElement.offsetWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const bodyScrollWidth = document.body.scrollWidth;
    
    const elementsWithOverflow = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1) { // 1px tolerance
        // Find selector/tag
        let selector = el.tagName.toLowerCase();
        if (el.id) {
          selector += `#${el.id}`;
        }
        if (el.className) {
          selector += `.${Array.from(el.classList).join('.')}`;
        }
        elementsWithOverflow.push({
          selector: selector.substring(0, 100),
          width: rect.width,
          right: rect.right,
          offsetLeft: el.offsetLeft
        });
      }
    }

    return {
      docWidth,
      scrollWidth,
      bodyScrollWidth,
      elementsWithOverflow
    };
  });

  console.log("Document width:", overflowInfo.docWidth);
  console.log("Document scroll width:", overflowInfo.scrollWidth);
  console.log("Body scroll width:", overflowInfo.bodyScrollWidth);
  console.log("\nElements overflowing the viewport:");
  overflowInfo.elementsWithOverflow.forEach((el, index) => {
    console.log(`${index + 1}. Selector: ${el.selector}`);
    console.log(`   Width: ${el.width}px, Right edge: ${el.right}px`);
  });

  await browser.close();
}

run().catch(console.error);
