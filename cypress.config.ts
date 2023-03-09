import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  env: {
    wecasa_api_url: "https://www.wecasa.fr/api/v1",
  },
  video: false,
});
