// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     allowedHosts: ["192-168-30-199.openvidu-local.dev"],
//     proxy: {
//       "/ai": {
//         target: "http://192.168.30.201:5000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },

//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    allowedHosts: ["192-168-30-199.openvidu-local.dev"],
    host: "0.0.0.0",
    port: 5080,
    proxy: {
      "/ai": {
        target: "http://192.168.30.201:5000",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path,
      },
    },
  },
});
