import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@layouts": path.resolve(__dirname, "./src/layouts/"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@models": path.resolve(__dirname, "./src/models/"),
            "@apis": path.resolve(__dirname, "./src/apis/"),
        },
    },
});
