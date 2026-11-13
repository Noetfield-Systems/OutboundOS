import {test,expect} from '@playwright/test';

async function createKit(page:any){
 await page.goto('/');
 await page.locator('#offerInput').fill('We help property managers coordinate building maintenance requests');
 await page.locator('#buyerInput').fill('Property managers in Vancouver');
 await page.locator('#painInput').fill('Maintenance tickets are lost between calls and technicians');
 await page.locator('#proofInput').fill('Our pilot uses a single work order inbox');
 await page.locator('#kitForm button[type=submit]').click();
 await expect(page.locator('#kitOutput')).toHaveClass(/visible/);
}

test('Visual-first premium Persian landing is honest, RTL and uses live actions',async ({page})=>{
 await page.goto('/');
 await expect(page).toHaveTitle(/از اولین پیام تا اولین مشتری واقعی/);
 await expect(page.getByRole('heading',{level:1})).toContainText('مشتری واقعی');
 await expect(page.locator('#kitForm')).toBeVisible();
 await expect(page.locator('html')).toHaveAttribute('dir','rtl');
 await expect(page.locator('.product-stage')).toBeVisible();
 await expect(page.locator('.float-card.plan')).toBeVisible();
 await expect(page.locator('#interestForm')).toBeAttached();
 await expect(page.locator('.preview-notice')).toContainText('داده واقعی');
 await expect(page.locator('body')).not.toContainText('Guaranteed meetings');
 await expect(page.locator('body')).not.toContainText('Illustrative product walkthrough');
 await expect(page.locator('#kitOutput')).toBeHidden();
});

test('Live free tool generates editable text using only user-provided inputs',async ({page})=>{
 await createKit(page);
 await expect(page.locator('#kitOutput')).toContainText('Property managers in Vancouver');
 await expect(page.locator('#kitOutput')).toContainText('Maintenance tickets are lost');
 await expect(page.locator('#kitOutput .draft-box')).toHaveCount(3);
 await expect(page.locator('#kitOutput')).toContainText('روز 7');
 await expect(page.locator('#kitOutput')).toContainText('Our pilot uses a single work order inbox');
 await expect(page.locator('#kitOutput')).toContainText('هیچ مخاطب، ارسال یا نتیجه تأییدشده‌ای تولید نشده است.');
 await expect(page.locator('#downloadKit')).toBeVisible();
 await expect(page.locator('#exportTemplate')).toBeVisible();
 await page.screenshot({path:'test-results/product-led-desktop.png',fullPage:true});
});

test('Free kit can be persisted to a real PostgreSQL draft campaign and opened',async ({page})=>{
 await createKit(page);
 const [response]=await Promise.all([
   page.waitForResponse(x=>x.url().includes('/api/fa/campaigns')&&x.request().method()==='POST'),
   page.locator('#saveKit').click()
 ]);
 expect(response.status()).toBe(201);
 await expect(page).toHaveURL(/\/fa/);
 const stateResponse=await page.request.get('/api/fa/state');
 expect(stateResponse.ok()).toBe(true);
 const state=await stateResponse.json();
 expect(state.campaigns.length).toBe(1);
 expect(state.campaigns[0].name).toContain('Property managers in Vancouver');
 expect(state.campaigns[0].status).toBe('draft');
 expect(state.contacts.length).toBe(0);
 expect(state.metrics.converted_verified).toBe(0);
});

test('Waitlist saves real consent record; no payment or fake queue position',async ({page})=>{
 await page.goto('/');
 await page.locator('[data-interest]').click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.locator('#interestForm [name=email]').fill('growth-qa-'+Date.now()+'@example.net');
 await page.locator('#interestForm [name=website]').fill('example.org');
 await page.locator('#interestForm [name=consent]').check();
 const [response]=await Promise.all([
   page.waitForResponse(x=>x.url().includes('/api/public/interest')&&x.request().method()==='POST'),
   page.locator('#interestSubmit').click()
 ]);
 expect(response.ok()).toBe(true);
 await expect(page.getByRole('dialog')).toContainText('درخواست ثبت شد');
 await expect(page.getByRole('dialog')).toContainText('No charge was made');
});

test('Free workspace CTA opens a real guest workspace',async ({page})=>{
 await page.goto('/');
 await page.locator('.nav-actions').getByRole('link',{name:'ورود'}).click();
 await expect(page).toHaveURL(/\/app/);
 await expect(page.locator('#accountType')).toContainText('Instant workspace');
});

test('Mobile responsive: nav, tool, pricing, no horizontal overflow',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await page.locator('#menuToggle').click();
 await expect(page.locator('#mobileMenu')).toBeVisible();
 await page.locator('#mobileMenu').getByRole('link',{name:'قیمت‌گذاری'}).click();
 await expect(page).toHaveURL(/#pricing$/);
 await expect(page.locator('#mobileMenu')).toBeHidden();
 await expect(page.locator('#pricing')).toContainText('Free Workspace');
 const b=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
 expect(b.width).toBeLessThanOrEqual(b.viewport+2);
 await page.locator('#offerInput').fill('A simple booking service for local homeowners');
 await page.locator('#buyerInput').fill('Busy homeowners in Vancouver');
 await page.locator('#painInput').fill('Scheduling appointments takes too many calls');
 await page.locator('#kitForm button[type=submit]').click();
 await expect(page.locator('#kitOutput')).toHaveClass(/visible/);
 const after=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
 expect(after.width).toBeLessThanOrEqual(after.viewport+2);
 await page.screenshot({path:'test-results/product-led-mobile.png',fullPage:true});
});

test('FAQ, legal and public playbook alias remain available',async ({page})=>{
 await page.goto('/');
 await expect(page.locator('#faq details')).toHaveCount(6);
 await page.locator('#faq details').first().locator('summary').click();
 await expect(page.locator('#faq details').first()).toHaveAttribute('open','');
 await page.getByRole('link',{name:'حریم خصوصی'}).click();
 await expect(page).toHaveURL(/\/privacy/);
 await expect(page.getByRole('heading',{name:'Privacy'})).toBeVisible();
 await page.goto('/terms');
 await expect(page.getByRole('heading',{name:'Service terms'})).toBeVisible();
 await page.goto('/playbook');
 await expect(page.locator('#kitForm')).toBeVisible();
});

test('User input is rendered as text rather than HTML; no fake prospect injected',async ({page})=>{
 await page.goto('/');
 await page.locator('#offerInput').fill('I help improve building repairs for residential property managers');
 await page.locator('#buyerInput').fill('<img src=x onerror=alert(1)> Real home managers');
 await page.locator('#painInput').fill('Service requests get lost and missed every single week');
 await page.locator('#kitForm button[type=submit]').click();
 await expect(page.locator('#kitOutput')).toHaveClass(/visible/);
 expect(await page.locator('#kitOutput img').count()).toBe(0);
 await expect(page.locator('#kitOutput')).toContainText('<img src=x onerror=alert(1)>');
});


test('Image-first design: desktop composition, legible hero and working preview frame',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('dir','rtl');
 await expect(page.locator('#heroTitle')).toContainText('مشتری واقعی');
 await expect(page.locator('.hero-eyebrow')).toBeVisible();
 await expect(page.locator('.product-stage')).toBeVisible();
 await expect(page.locator('.mini-metrics .mini-metric')).toHaveCount(4);
 await expect(page.locator('.board .lane')).toHaveCount(5);
 await expect(page.locator('.preview-notice')).toContainText('داده واقعی');
 const layout=await page.evaluate(()=>{
   const hero=document.querySelector('#heroTitle')?.getBoundingClientRect(),stage=document.querySelector('.product-stage')?.getBoundingClientRect();
   return {heroWidth:hero?.width,stageWidth:stage?.width,stageLeft:stage?.left,stageRight:stage?.right,viewport:innerWidth,scroll:document.documentElement.scrollWidth};
 });
 expect(layout.stageWidth).toBeGreaterThan(900);
 expect(layout.stageLeft).toBeGreaterThanOrEqual(0);
 expect(layout.stageRight).toBeLessThanOrEqual(layout.viewport+2);
 expect(layout.scroll).toBeLessThanOrEqual(layout.viewport+2);
 await page.screenshot({path:'test-results/image-first-hero-desktop.png',fullPage:false});
});

test('Image-first design: mobile hero, stage, CTA remain reachable without horizontal scroll',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await expect(page.locator('#heroTitle')).toBeVisible();
 await expect(page.locator('.hero-buttons .primary')).toBeVisible();
 await expect(page.locator('.product-stage')).toBeVisible();
 const x=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
 expect(x.width).toBeLessThanOrEqual(x.viewport+2);
 await page.screenshot({path:'test-results/image-first-hero-mobile.png',fullPage:false});
});