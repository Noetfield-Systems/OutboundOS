import { test, expect } from '@playwright/test';

test('Persian pilot: real-data-only empty state and no admin barrier', async ({ page }) => {
  await page.goto('/fa');
  await expect(page).toHaveTitle(/OutboundOS/);
  await expect(page.locator('html')).toHaveAttribute('dir','rtl');
  await expect(page.locator('#connection')).toContainText('فضای کاری متصل');
  await expect(page.locator('#screen')).toContainText('مخاطب');
  await expect(page.locator('#goalFraction')).toContainText('۰ / ۱۰');
  await expect(page.locator('#screen')).not.toContainText('ADMIN_TOKEN');
});

test('Persian pilot: campaign → contact → draft → manual send → reply → outcome → handoff → evidence', async ({ page }) => {
  await page.goto('/fa');
  await expect(page.locator('#connection')).toContainText('فضای کاری متصل');

  await page.locator('#nav [data-view="campaigns"]').click();
  await page.locator('#campaignForm [name="name"]').fill('Synthetic Pilot Outreach');
  await page.locator('#campaignForm [name="target_audience"]').fill('Synthetic pilot founder ICP');
  await page.locator('#campaignForm [name="goal"]').fill('Test one booked conversation');
  await page.locator('#campaignForm [name="subject"]').fill('Hello {first_name}');
  await page.locator('#campaignForm [name="body"]').fill('I noticed {company}. Would you like to talk?');
  await page.locator('#campaignForm button[type="submit"]').click();
  await expect(page.locator('#screen')).toContainText('Synthetic Pilot Outreach');

  await page.locator('.topactions [data-new-contact]').click();
  await page.locator('#contactForm [name="name"]').fill('Synthetic Test Contact');
  await page.locator('#contactForm [name="company"]').fill('Synthetic QA Ltd');
  await page.locator('#contactForm [name="email"]').fill('qa-contact@example.net');
  await page.locator('#contactForm [name="source"]').fill('manual-e2e');
  await page.locator('#contactForm [name="signal"]').fill('Explicitly synthetic QA-only record');
  await page.locator('#contactForm [name="next_action"]').fill('Prepare first message');
  await page.locator('#contactForm [name="campaign_id"]').selectOption({ index: 1 });
  await page.locator('#contactForm button[type="submit"]').click();
  await expect(page.locator('#drawerTitle')).toContainText('Synthetic Test Contact');

  await page.locator('[data-detail-tab="draft"]').click();
  await page.locator('#draftForm button[type="submit"]').click();
  await expect(page.locator('#sendForm')).toBeVisible();
  await expect(page.locator('#sendForm [name="actual_body"]')).toContainText('Synthetic QA Ltd');
  await page.locator('#sendForm [name="actual_body"]').fill('Actually sent synthetic audit text (NOT real delivery).');
  await page.locator('#sendForm button[type="submit"]').click();
  await expect(page.locator('#drawerBody')).toContainText('ارسال دستی گزارش‌شده');

  await page.locator('[data-detail-tab="reply"]').click();
  await page.locator('#replyForm [name="body"]').fill('Synthetic test reply, recorded manually.');
  await page.locator('#replyForm button[type="submit"]').click();
  await expect(page.locator('#drawerBody')).toContainText('پاسخ ثبت دستی');

  await page.locator('[data-detail-tab="outcome"]').click();
  await page.locator('#outcomeForm [name="outcome"]').selectOption('converted');
  await page.locator('#outcomeForm [name="summary"]').fill('Test conversion is a self-report; NOT independently verified.');
  await page.locator('#outcomeForm button[type="submit"]').click();
  await expect(page.locator('#drawerBody')).toContainText('conversion');

  await page.locator('[data-detail-tab="handoff"]').click();
  await page.locator('#handoffForm [name="handoff_type"]').selectOption('human');
  await page.locator('#handoffForm [name="handoff_to"]').fill('QA Human');
  await page.locator('#handoffForm [name="next_action"]').fill('Review QA-only outcome');
  await page.locator('#handoffForm button[type="submit"]').click();

  const state = await page.request.get('/api/fa/state');
  expect(state.ok()).toBeTruthy();
  const json = await state.json();
  expect(json.metrics.contacts).toBe(1);
  expect(json.metrics.contacted).toBe(1);
  expect(json.metrics.replied).toBe(1);
  expect(json.metrics.converted_reported).toBe(1);
  expect(json.metrics.converted_verified).toBe(0);
  expect(json.contacts[0].owner).toBe('QA Human');
  expect(json.messages.find((m:any) => m.status==='manually_sent').provenance).toBe('self_reported');
  expect(json.messages.find((m:any) => m.status==='reported_received').provenance).toBe('self_reported');
  expect(json.evidence.some((e:any) => e.kind==='conversion' && e.verification==='self_reported')).toBe(true);

  await page.locator('[data-close]').click();
  await page.locator('#nav [data-view="analytics"]').click();
  await expect(page.locator('#screen')).toContainText('تأیید مستقل');
  await page.locator('#nav [data-view="evidence"]').click();
  await expect(page.locator('#screen')).toContainText('conversion');
});

test('Persian pilot: another guest workspace cannot read first workspace records', async ({ browser }) => {
  const one=await browser.newContext();
  const two=await browser.newContext();
  try {
    const a=await one.newPage(),b=await two.newPage();
    await a.goto('/fa'); await b.goto('/fa');
    await expect(a.locator('#connection')).toContainText('فضای کاری متصل');
    await expect(b.locator('#connection')).toContainText('فضای کاری متصل');
    await a.locator('.topactions [data-new-contact]').click();
    await a.locator('#contactForm [name="company"]').fill('Synthetic Workspace Isolation');
    await a.locator('#contactForm [name="source"]').fill('e2e-only');
    await a.locator('#contactForm button[type="submit"]').click();
    const aState=await (await a.request.get('/api/fa/state')).json();
    const bState=await (await b.request.get('/api/fa/state')).json();
    expect(aState.contacts.some((c:any)=>c.company==='Synthetic Workspace Isolation')).toBe(true);
    expect(bState.contacts.some((c:any)=>c.company==='Synthetic Workspace Isolation')).toBe(false);
  } finally {await one.close();await two.close()}
});
