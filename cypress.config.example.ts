import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
  },
  env: {
    wecasa_api_url: "https://****",
  },
  video: false,
  trashAssetsBeforeRuns: true,
});
