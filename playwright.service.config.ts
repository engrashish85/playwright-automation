import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS, ServiceAuth } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';
import config from './playwright.config';

export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
    serviceAuthType: ServiceAuth.ENTRA_ID,
  }),
  {
    reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],
  }
);