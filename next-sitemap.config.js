// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.shreeji.co.zm',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.shreeji.co.zm/sitemap.xml',
    ],
  },
}
