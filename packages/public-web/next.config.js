const path = require("path")
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        // this includes files from the monorepo base two directories up
        outputFileTracingRoot: path.join(__dirname, '../../'),
      },
};

module.exports = nextConfig
