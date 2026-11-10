import { test, expect } from '@playwright/test';

test('Persona A · guest premium dashboard without admin key',async ({page})=>{
 await page.goto('/');
 await expect(page).toHaveTitle(/OutboundOS/);
 await expect(page.locator('nav#nav button[title="Overview"]')).toBeVisible();
 await expect(page.locator('#main')).toContainText('Your growth engine');
 await expect(page.locator('#main')).not.toContainText('ADMIN_TOKEN');
 await page.screenshot({path:'test-results/premium-desktop.png',fullPage:true});
});
test('Persona B · founder business memory persists',async ({page})=>{
 await page.goto('/');
 await page.locator('nav#nav button[title="AI Agent"]').click();
 await expect(page.locator('#main')).toContainText('Make your agent an expert');
 await page.locator('#aName').fill('Audit Example Co');
 await page.locator('#aOffer').fill('Synthetic automation offer');
 await page.locator('#aIcp').fill('SaaS founders');
 await page.getByRole('button',{name:'Save business memory'}).click();
 await expect(page.locator('#aOffer')).toHaveValue('Synthetic automation offer');
 await page.reload();
 await page.locator('nav#nav button[title="AI Agent"]').click();
 await expect(page.locator('#aOffer')).toHaveValue('Synthetic automation offer');
});
test('Persona C · CRM prospect onboarding',async ({page})=>{
 await page.goto('/');
 await page.locator('nav#nav button[title="Prospects"]').click();
 await page.getByRole('button',{name:/Add prospect/}).click();
 await page.locator('#pCompany').fill('Audit Prospect Co');
 await page.locator('#pName').fill('Taylor Audit');
 await page.locator('#pEmail').fill('taylor@example.com');
 await page.getByRole('button',{name:'Save contact'}).click();
 await expect(page.locator('#leadTable')).toContainText('Audit Prospect Co');
});
test('Persona D · campaign creates, activates and pauses',async ({page})=>{
 await page.goto('/');
 await page.locator('nav#nav button[title="Campaigns"]').click();
 await page.getByRole('button',{name:/New campaign/}).click();
 await page.locator('#cName').fill('Audit Sequence');
 await page.getByRole('button',{name:'Save sequence'}).click();
 await expect(page.locator('#main')).toContainText('Audit Sequence');
 await page.getByRole('button',{name:'Activate',exact:true}).click();
 await expect(page.locator('#main')).toContainText('active');
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 await expect(page.locator('#main')).toContainText('paused');
});
test('Persona E · mobile settings accessible through bottom rail',async ({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const settings=page.locator('nav#nav2 button[title="Settings"]');
 await settings.scrollIntoViewIfNeeded();
 await expect(settings).toBeVisible();await settings.click();
 await expect(page.locator('#main')).toContainText('Everything connected');
 await page.screenshot({path:'test-results/premium-mobile.png',fullPage:true});
});
test('Persona F · mobile Lead Finder and Inbox accessible',async ({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const finder=page.locator('nav#nav button[title="Lead Finder"]');
 await finder.scrollIntoViewIfNeeded();await finder.click();
 await expect(page.locator('#main')).toContainText('Find buyers who actually fit');
 const inbox=page.locator('nav#nav button[title="Inbox"]');
 await inbox.scrollIntoViewIfNeeded();await inbox.click();
 await expect(page.locator('#main')).toContainText('Turn replies into relationships');
});


test('Persona G · passkey enrollment and account recovery via virtual authenticator',async ({page,context})=>{
 const cdp=await context.newCDPSession(page);
 await cdp.send('WebAuthn.enable');
 await cdp.send('WebAuthn.addVirtualAuthenticator',{options:{
  protocol:'ctap2',transport:'internal',hasResidentKey:true,
  hasUserVerification:true,isUserVerified:true,automaticPresenceSimulation:true
 }});
 await page.goto('/');
 await page.locator('nav#nav2 button[title="Settings"]').click();
 await page.locator('#main').getByRole('button',{name:'Save with passkey'}).click();
 await expect(page.locator('#main')).toContainText('Your workspace is saved.');
 await page.once('dialog',dialog=>dialog.accept());
 await page.getByRole('button',{name:'Sign out'}).click();
 await page.locator('nav#nav2 button[title="Settings"]').click();
 await page.getByRole('button',{name:'Sign in with passkey'}).click();
 await expect(page.locator('#accountType')).toContainText('Passkey secured');
 await page.locator('nav#nav2 button[title="Settings"]').click();
 await expect(page.locator('#main')).toContainText('Your workspace is saved.');
});
