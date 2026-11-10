import { defineConfig, devices } from '@playwright/test';
export default defineConfig({testDir:'./e2e',testMatch:'*.e2e.ts',timeout:30000,expect:{timeout:8000},use:{baseURL:process.env.E2E_BASE_URL||'http://127.0.0.1:8080',trace:'retain-on-failure',screenshot:'only-on-failure'},projects:[{name:'chromium',use:{...devices['Desktop Chrome']}}],reporter:[['list'],['html',{open:'never'}]]});
