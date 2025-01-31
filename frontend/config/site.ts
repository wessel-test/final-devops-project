export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "PennyTracker",
  description:
    "Easily track your expenses with this user-friendly app",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Tips to Save More",
      href: "/save-more",
    },
    {
      title: "Smart Spending Insights",
      href: "/common-spendings",
    },
  ],
  links: {
    home: "/home",
    saveMore: "/save-more",
    commonSpendings: "/common-spendings"
  },
}