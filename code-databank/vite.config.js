import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh()],
// });

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [reactRefresh()],
    build: {
      chunkSizeWarningLimit: 900,
    },
    server: {
      port: process.env.VITE_PORT,
    },
  });
};
