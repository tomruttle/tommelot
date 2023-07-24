/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');
   
module.exports = withNextIntl({
    reactStrictMode: true,
    swcMinify: true,
});
