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
 expect(PUBLIC_NEXT).toContain('dir="rtl"');
 expect(PUBLIC_NEXT).toContain('class="product-stage"');
 expect(PUBLIC_NEXT).toContain('class="float-card plan"');
 expect(PUBLIC_NEXT).toContain('class="float-card prompt"');
 expect(PUBLIC_NEXT).toContain('id="heroTitle"');
 expect(PUBLIC_NEXT).toContain('از اولین پیام');
 expect(PUBLIC_NEXT).toContain('/api/fa/campaigns');
 expect(PUBLIC_NEXT).toContain('/api/public/interest');
 expect(PUBLIC_NEXT).toContain('پیش‌نمایش طراحی محصول');
 expect(PUBLIC_NEXT).not.toMatch(/[0-9,]{4,} customers|guaranteed meetings|fake leads|trusted by 50,000/i);
});
test("public copy does not claim payments, sending or lead discovery happened",()=>{
 expect(PUBLIC_NEXT).toContain("هیچ مخاطب یا نتیجه جعلی وجود ندارد");
 expect(PUBLIC_NEXT).toContain("پیش‌نویس ذخیره می‌شود");
 expect(PUBLIC_NEXT).toContain("پرداخت یا اشتراک پولی");
 expect(PUBLIC_NEXT).toContain("خیر. برنامه و پیام‌ها");
});
test("public legal pages still exist and remain UTF-8",()=>{
 expect(PRIVACY_PAGE).toContain("Privacy");
 expect(TERMS_PAGE).toContain("Service terms");
 for(const html of [PUBLIC_NEXT,PRIVACY_PAGE,TERMS_PAGE]){
 expect(html).not.toMatch(/\\u[0-9a-fA-F]{4}/);
 }
});
