// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [require("remark-prism")],
//     rehypePlugins: [],
//   },
// });

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withMDX = require('@next/mdx')({
//   // ...
//   options: {
//     providerImportSource: '@mdx-js/react'
//   }
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

// module.exports = withMDX(nextConfig)
module.exports = nextConfig
