import { test, expect } from "bun:test";
import { LANDING_PAGE, PRIVACY_PAGE, TERMS_PAGE } from "../server/marketing.ts";

test("marketing HTML has actual glyphs rather than visible Unicode escape sequences",()=>{
 for(const html of [LANDING_PAGE,PRIVACY_PAGE,TERMS_PAGE]){
  expect(html).not.toMatch(/\\u[0-9a-fA-F]{4}/);
 }
 expect(LANDING_PAGE).toContain("✦");
 expect(LANDING_PAGE).toContain("→");
 expect(LANDING_PAGE).toContain("✓");
 expect(LANDING_PAGE).toContain("↗");
});
test("premium brand and logo reserve stable layout space",()=>{
 expect(LANDING_PAGE).toContain("flex:0 0 38px");
 expect(LANDING_PAGE).toContain("flex-shrink:0");
 expect(LANDING_PAGE).toContain("min-width:max-content");
});
test("public sales funnel remains live after glyph repair",()=>{
 for(const required of ['id="siteForm"','id="interestForm"','id="pricing"','id="mobileMenu"','/app?website=']){
  expect(LANDING_PAGE).toContain(required);
 }
});
