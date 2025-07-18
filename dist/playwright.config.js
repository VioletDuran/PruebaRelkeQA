"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    use: {
        headless: true,
        viewport: { width: 1280, height: 800 },
        baseURL: 'https://demo.relbase.cl',
        ignoreHTTPSErrors: true,
    },
    testDir: './tests',
    timeout: 30000,
});
