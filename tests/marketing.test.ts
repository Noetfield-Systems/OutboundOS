import {test,expect} from "bun:test";
import {PUBLIC_NEXT} from "../server/public-next.ts";
import {PRIVACY_PAGE,TERMS_PAGE} from "../server/marketing.ts";
test("new public launch surface is real and independent of any demo statistics",()=>{
 expect(PUBLIC_NEXT).toContain('id="kitForm"');
 expect(PUBLIC_NEXT).toContain('id="kitOutput"');
 expect(PUBLIC_NEXT).toContain("save.id='saveKit'");
 expect(PUBLIC_NEXT).toContain('id="interestForm"');
 expect(PUBLIC_NEXT).toContain('id="pricing"');
 expect(PUBLIC_NEXT).toContain('id="mobileMenu"');
 expect(PUBLIC_NEXT).toContain('id="faq"');
 expect(PUBLIC_NEXT).toContain('/api/fa/campaigns');
 expect(PUBLIC_NEXT).toContain('/api/public/interest');
 expect(PUBLIC_NEXT).toContain('No fabricated contacts or conversion numbers.');
 expect(PUBLIC_NEXT).not.toMatch(/[0-9,]{4,} customers|guaranteed meetings|fake leads|trusted by 50,000/i);
});
test("public copy does not claim payments, sending or lead discovery happened",()=>{
 expect(PUBLIC_NEXT).toContain("does not scrape, message, or invent people");
 expect(PUBLIC_NEXT).toContain("It saves a draft campaign");
 expect(PUBLIC_NEXT).toContain("no charge today");
 expect(PUBLIC_NEXT).toContain("No. It prepares outreach");
});
test("public legal pages still exist and remain UTF-8",()=>{
 expect(PRIVACY_PAGE).toContain("Privacy");
 expect(TERMS_PAGE).toContain("Service terms");
 for(const html of [PUBLIC_NEXT,PRIVACY_PAGE,TERMS_PAGE]){
 expect(html).not.toMatch(/\\u[0-9a-fA-F]{4}/);
 }
});
