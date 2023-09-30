/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Datavines',
  tagline: 'Datavines - Next-gen Data Observability platform',
  url: 'https://datavines.io',
  baseUrl: '/datavines-website/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'image/favicon.ico',
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["en", "zh-CN"],
    localeConfigs: {
      zh-CN: {
        label: "简体中文",
        direction: 'ltr',
      },
      en: {
        label: "English",
        direction: 'ltr',
      }

    },
  },
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // config url is: https://github.com/easyops-cn/docusaurus-search-local#theme-options
        hashed: true,
        indexDocs: true,
        indexPages: true,
        highlightSearchTermsOnTargetPage: false, // Highlight search terms on target page.
        explicitSearchResultPath: true,
        language: ["zh-CN", "en"]
      }),
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          editLocalizedFiles: true,
          sidebarCollapsed: false,
          // Please change this to your repo.
          editUrl: 'https://github.com/datavane/datavines-website/edit/dev/'
        },

        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/datavane/datavines-website/edit/dev/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: ({
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true
    },
    navbar: {
      title: 'Datavines',
      logo: {
        alt: 'Datavines Logo',
        src: 'image/logo.png',
      },
      items: [
        {
          to: '/docs/intro',
          label: 'Document',
          position: 'left',
          activeBaseRegex: `/docs`,
        },
        {
          label: 'Community',
          position: 'left',
          items: [
            {
              label: "Code of conduct",
              to: "/community/contribution_guide/code-conduct",
            },
            {
              label: "Contributor",
              to: "/community/contribution_guide/contributor",
            },
            {
              label: "Pull Request Notice",
              to: "/community/contribution_guide/pull-request",
            },
          ],
        },
        {
              to: '/docs/roadmap',
              label: 'Roadmap',
              position: 'left'
        },
        {
          to: '/docs/faq',
          position: 'left',
          label: 'FAQ'
        },
        {
          href: 'https://github.com/datavane/datavines',
          label: 'GitHub',
          position: 'left',
        },
        {
          type: "localeDropdown",
          position: "right",
        }
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/datavane/datavines',
            },
            {
              label: 'Issue Tracker',
              href: 'https://github.com/datavane/datavines/issues',
            },
            {
              label: 'Pull Requests',
              href: 'https://github.com/datavane/datavines/pulls',
            },
          ],
        },
        {
          title: 'Resource',
          items: [
            {
              label: 'Document',
              href: '/docs/intro',
            },
            {
              label: 'Releases',
              href: 'https://github.com/datavane/datavines/releases',
            },
            {
              label: 'FAQ',
              href: 'https://github.com/datavane/datavines/issues/507',
            }
          ],
        },
        {
          items: [
            {
              html: `
                  <div class="footer-left-box">
                    <div class="flex align-center footer-system">
                      <span class='system-title'>About Datavines</span>
                    </div>
                    <p>Next-gen Data Observability platform</p>
                  </div>`
           
            }
          ],
        },
      ],
      copyright: `Copyright © 2022-${new Date().getFullYear()} Datavines Community.`,
        
    },

    prism: {
      theme: require('prism-react-renderer/themes/vsLight'),
      darkTheme: darkCodeTheme,
      additionalLanguages: ['powershell', 'java', 'scala', 'yaml'],
    }

  }),

  plugins: [
    'docusaurus-plugin-less',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
  ]
};

module.exports = config;
