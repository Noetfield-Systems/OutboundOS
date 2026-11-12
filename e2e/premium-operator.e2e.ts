import {test,expect} from '@playwright/test';

test('Premium operator journey: complete task and preserve audit; save views; CSV import',async ({page})=>{
 await page.goto('/fa');
 await expect(page.locator('#connection')).toContainText('فضای کاری متصل');
 await expect(page.locator('#screen')).toContainText('صف اقدام بعدی');

 await page.locator('.topactions [data-new-contact]').click();
 await page.locator('#contactForm [name="name"]').fill('QA Action Persona');
 await page.locator('#contactForm [name="company"]').fill('QA Action Org');
 await page.locator('#contactForm [name="source"]').fill('e2e-action-test');
 await page.locator('#contactForm [name="next_action"]').fill('Send initial message');
 await page.locator('#contactForm button[type="submit"]').click();
 await expect(page.locator('#drawerTitle')).toContainText('QA Action Persona');

 await page.locator('[data-detail-tab="action"]').click();
 await expect(page.locator('#completeActionForm')).toBeVisible();
 await expect(page.locator('#completeActionForm')).toContainText('Send initial message');
 await page.locator('#completeActionForm [name="next_action"]').fill('Review response tomorrow');
 await page.locator('#completeActionForm button[type="submit"]').click();
 await expect(page.locator('#drawerBody')).toContainText('Send initial message');
 await expect(page.locator('#drawerBody')).toContainText('Review response tomorrow');
 const state=await (await page.request.get('/api/fa/state')).json();
 expect(state.completed_actions.length).toBe(1);
 expect(state.contacts[0].next_action).toBe('Review response tomorrow');

 await page.locator('[data-close]').click();
 await page.locator('#nav [data-view="contacts"]').click();
 await expect(page.locator('#screen')).toContainText('QA Action Persona');
 await page.locator('#filterStage').selectOption('new');
 await page.locator('[data-save-view]').click();
 await page.locator('#savedViewForm [name="name"]').fill('QA Saved New Leads');
 await page.locator('#savedViewForm button[type="submit"]').click();
 await expect(page.locator('#savedViewSelect option')).toContainText(['نمای فعلی','QA Saved New Leads']);
 await page.locator('[data-board="board"]').click();
 await expect(page.locator('.kanban')).toContainText('QA Action Persona');
 await page.locator('[data-board="table"]').click();
 await expect(page.locator('.tablewrap')).toContainText('QA Action Persona');

 await page.locator('[data-import]').click();
 await page.locator('#importCsvFile').setInputFiles({
  name:'qa-outbound.csv',mimeType:'text/csv',buffer:Buffer.from('name,company,email,source,owner\nQA CSV Person,QA CSV Co,qa-csv@example.net,real-user-csv-test,Founder\n','utf8')
 });
 await expect(page.locator('#importPreview')).toContainText('QA CSV Person');
 await page.locator('#importCsvForm button[type="submit"]').click();
 await expect(page.locator('#screen')).toContainText('QA CSV Person');
 const end=await (await page.request.get('/api/fa/state')).json();
 expect(end.contacts.length).toBe(2);
 expect(end.saved_views.some((v:any)=>v.name==='QA Saved New Leads')).toBe(true);
 expect(end.metrics.converted_verified).toBe(0);
});

test('Premium responsive navigation and accessible theme toggle',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/fa');
 await expect(page.locator('#connection')).toContainText('فضای کاری متصل');
 await expect(page.locator('#screen')).toContainText('میز عملیات فروش');
 await page.locator('[data-theme]').click();
 await expect(page.locator('body')).toHaveClass(/light/);
 await page.reload();
 await expect(page.locator('body')).toHaveClass(/light/);
 await page.locator('#nav [data-view="analytics"]').click();
 await expect(page.locator('#screen')).toContainText('بازده هر کانال');
 await page.screenshot({path:'test-results/premium-persian-mobile.png',fullPage:true});
});

test('Premium API: no fake verification on manually reported outcomes',async ({page})=>{
 await page.goto('/fa');
 await expect(page.locator('#connection')).toContainText('فضای کاری متصل');
 await page.locator('.topactions [data-new-contact]').click();
 await page.locator('#contactForm [name="company"]').fill('QA conversion truth');
 await page.locator('#contactForm button[type="submit"]').click();
 await page.locator('[data-detail-tab="outcome"]').click();
 await page.locator('#outcomeForm [name="outcome"]').selectOption('converted');
 await page.locator('#outcomeForm [name="summary"]').fill('Only synthetic E2E user self-report');
 await page.locator('#outcomeForm button[type="submit"]').click();
 const state=await (await page.request.get('/api/fa/state')).json();
 expect(state.metrics.converted_reported).toBe(1);
 expect(state.metrics.converted_verified).toBe(0);
 await expect(page.locator('#goalFraction')).toContainText('۰ / ۱۰');
});