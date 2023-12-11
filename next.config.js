const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
});
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
	output: 'export',
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true,
			},
		];
	},
});
module.exports = nextConfig;
