import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: {
		headless: false,
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] }
		// },
		// {
		// 	name: 'safari',
		// 	use: { ...devices['Desktop Safari'] }
		// }
	],
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
