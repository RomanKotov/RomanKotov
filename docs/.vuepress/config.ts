import { defineUserConfig } from "vuepress-vite";
import { DefaultThemeOptions } from "vuepress-vite";
import { path } from "@vuepress/utils";

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en-US',
  title: "Roman Kotov's blog",
  description: "Personal blog",
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "/assets/favicon_io/apple-touch-icon.png",
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/favicon_io/favicon-32x32.png",
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/favicon_io/favicon-16x16.png",
      }
    ],
    [
      "link",
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/assets/favicon_io/favicon.ico",
      }
    ],
    [
      "link",
      {
        rel: "manifest",
        href: "/assets/favicon_io/site.webmanifest",
      }
    ],
    [
      "meta",
      {
        name: "theme-color",
        content: "#3eaf7c",
      }
    ],
  ],
  markdown: {
    code: {
      lineNumbers: 3,
    },
  },
  theme: path.resolve(__dirname, "./theme"),
  themeConfig: {
    logo: "/assets/favicon_io/favicon-32x32.png",
    navbar: [],
  },
  plugins: [
    ['@vuepress/plugin-debug'],
    [
      "@vuepress/plugin-google-analytics",
      {
        id: "UA-100435298-1",
      },
    ],
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "Search",
          },
        },
      },
    ],
    [
      "@vuepress/plugin-shiki",
      {
        theme: "one-dark-pro",
      },
    ],
    require("./plugin"),
  ]
});
