import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // base: "/TurconClone/", // Uncomment this if you are deploying to a subpath on your domain
  build: {
    outDir: "client", // Specify the directory where the build output should go
  },
  plugins: [react()],
});
