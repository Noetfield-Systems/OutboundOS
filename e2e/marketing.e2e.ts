import { test, expect } from '@playwright/test';

test('A visitor sees a real marketing page instead of a private dashboard',async ({page})=>{
 await page.goto('/');
 await expect(page).toHaveTitle(/Find your next customers/);
 await expect(page.getByRole('heading',{level:1})).toContainText('Your next customers are out there');
 await expect(page.locator('#siteForm')).toBeVisible();
 await expect(page.locator('nav.navigation')).toBeVisible();
 await expect(page.getByText('Illustrative product walkthrough')).toBeVisible();
 await expect(page.locator('body')).not.toContainText('700K businesses');
 await expect(page.locator('body')).not.toContainText('Guaranteed meetings');
});

test('Free workspace CTA opens a real guest account without a password',async ({page})=>{
 await page.goto('/');
 await page.locator('.headright').getByRole('link',{name:/Start free/}).click();
 await expect(page).toHaveURL(/\/app/);
 await expect(page.locator('nav#nav button[title="Overview"]')).toBeVisible();
 await expect(page.locator('#accountType')).toContainText('Instant workspace');
});

test('Hero URL carries into website analysis with no setup form',async ({page})=>{
 let received='';
 await page.route('**/api/analyze',async route=>{
  received=JSON.parse(route.request().postData()||'{}').url;
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({mode:'SOURCE_EXTRACTED',domain:'example.com',profile:{name:'Example Company',offer:'Example offer'}})});
 });
 await page.goto('/');
 await page.locator('#siteInput').fill('example.com');
 await page.locator('#siteForm button').click();
 await expect(page).toHaveURL(/\/app/);
 await expect(page.locator('#main')).toContainText('Make your agent an expert');
 expect(received).toBe('https://example.com/');
});

test('Growth interest can be submitted with explicit consent, no payment',async ({page})=>{
 await page.goto('/');
 await page.locator('[data-interest="Growth early access"]').click();
 await expect(page.getByRole('dialog')).toBeVisible();
 const email='marketing-qa-'+Date.now()+'@example.com';
 await page.locator('input[name="email"]').fill(email);
 await page.locator('#interestForm input[name="website"]').fill('example.com');
 await page.locator('input[name="consent"]').check();
 await page.getByRole('button',{name:/Request access/}).click();
 await expect(page.getByRole('dialog')).toContainText('Request received');
 await expect(page.getByRole('dialog')).toContainText('Start free');
});

test('Mobile visitors can navigate, compare plans and access the workspace',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await page.locator('#menuToggle').click();
 await expect(page.locator('#mobileMenu')).toBeVisible();
 await page.locator('#mobileMenu').getByRole('link',{name:'Pricing'}).click();
 await expect(page).toHaveURL(/#pricing$/);
 await expect(page.locator('#mobileMenu')).toBeHidden();
 await expect(page.getByText('Free workspace does not include third-party')).toBeVisible();
 const dimensions=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
 expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport+2);
 await page.screenshot({path:'test-results/marketing-mobile.png',fullPage:true});
});

test('Privacy, terms, FAQ and mobile responsive affordances exist',async ({page})=>{
 await page.goto('/');
 await expect(page.locator('details')).toHaveCount(6);
 await page.locator('details').first().locator('summary').click();
 await expect(page.locator('details').first()).toHaveAttribute('open','');
 await page.getByRole('link',{name:'Privacy'}).click();
 await expect(page).toHaveURL(/\/privacy/);
 await expect(page.getByRole('heading',{name:'Privacy'})).toBeVisible();
 await page.goto('/terms');
 await expect(page.getByRole('heading',{name:'Service terms'})).toBeVisible();
});


test("Landing page contains no displayed backslash-u escapes at 1440px desktop",async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto("/");
 const visible=await page.evaluate(()=>({title:document.title,body:document.body.innerText}));
 expect(visible.title).not.toMatch(/\\u[0-9a-fA-F]{4}/);
 expect(visible.body).not.toMatch(/\\u[0-9a-fA-F]{4}/);
 expect(visible.body).toContain("✦");
 const bounds=await page.evaluate(()=>{
   const brand=document.querySelector(".brand")?.getBoundingClientRect();
   const logo=document.querySelector(".sitehead .logo")?.getBoundingClientRect();
   const name=document.querySelector(".sitehead .brand span:last-child")?.getBoundingClientRect();
   return {brand:brand?{left:brand.left,right:brand.right}:null,logo:logo?{left:logo.left,right:logo.right,width:logo.width}:null,name:name?{left:name.left,right:name.right}:null,viewport:innerWidth,scroll:document.documentElement.scrollWidth};
 });
 expect(bounds.logo).not.toBeNull();
 expect(bounds.logo.width).toBeGreaterThanOrEqual(36);
 expect(bounds.logo.right).toBeLessThan(bounds.name.left);
 expect(bounds.scroll).toBeLessThanOrEqual(bounds.viewport+2);
 await page.screenshot({path:"test-results/landing-desktop-clean.png",fullPage:true});
});
test("Mobile brand, icon text and CTA do not overlap at 390px",async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("/");
 const values=await page.evaluate(()=>{
  const logo=document.querySelector(".sitehead .logo")?.getBoundingClientRect();
  const brandName=document.querySelector(".sitehead .brand span:last-child")?.getBoundingClientRect();
  return {logoRight:logo?.right,brandLeft:brandName?.left,scroll:document.documentElement.scrollWidth,viewport:innerWidth,content:document.body.innerText};
 });
 expect(values.content).not.toMatch(/\\u[0-9a-fA-F]{4}/);
 expect(values.logoRight).toBeLessThan(values.brandLeft);
 expect(values.scroll).toBeLessThanOrEqual(values.viewport+2);
 await expect(page.locator("#siteForm button")).toBeVisible();
 await page.screenshot({path:"test-results/landing-mobile-clean.png",fullPage:true});
});
