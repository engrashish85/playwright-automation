import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import base from 'playwright.config'
import { blob } from 'stream/consumers';
// import { defineBddConfig } from 'playwright-bdd';


export default defineConfig({
  ...base,
  use: {
    ...base.use,
    baseURL: process.env.tutorialsPointBaseUrl,
  },
});
