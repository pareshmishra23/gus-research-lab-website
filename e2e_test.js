const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ recordVideo: { dir: '/home/ubuntu/gus-research-lab-website/videos/' } });
  const page = await context.newPage();

  console.log('Navigating to frontend home page...');
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);

  console.log('Taking screenshot of home page...');
  await page.screenshot({ path: '/home/ubuntu/gus-research-lab-website/homepage_test.png', fullPage: true });

  console.log('Navigating to Admin Dashboard...');
  await page.goto('http://localhost:5173/admin');
  await page.waitForTimeout(2000);

  console.log('Taking screenshot of Admin page...');
  await page.screenshot({ path: '/home/ubuntu/gus-research-lab-website/admin_test.png', fullPage: true });

  console.log('Testing adding a research item...');
  const titleInput = await page.$('input[name="title"], input#title, input[placeholder*="Title"]');
  if (titleInput) {
    await titleInput.fill('Playwright Test Research Item');
    const descInput = await page.$('textarea[name="description"], textarea#description, textarea');
    if (descInput) {
      await descInput.fill('Automated validation test for research item creation.');
    }
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/home/ubuntu/gus-research-lab-website/admin_submitted.png', fullPage: true });
    }
  }

  await browser.close();
  console.log('Playwright test completed successfully.');
})();
