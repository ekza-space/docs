import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ekza Space',
  tagline: 'On-chain ownership for portable 3D assets, avatars, and spaces.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.ekza.space',
  baseUrl: '/',
  organizationName: 'wotori-studio',
  projectName: 'ekza-space-docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Ekza Space',
      logo: {
        alt: 'Ekza Space',
        src: 'img/ekza-mark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/protocol/solana-protocol', label: 'Protocol', position: 'left'},
        {to: '/developers/sdk-overview', label: 'SDK', position: 'left'},
        {href: 'https://space.ekza.io', label: 'Space App', position: 'right'},
        {href: 'https://avatar.ekza.io', label: 'Avatar App', position: 'right'},
        {
          href: 'https://github.com/ekza-space',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/'},
            {label: 'Solana Protocol', to: '/protocol/solana-protocol'},
            {label: 'Metadata Standard', to: '/protocol/metadata-standard'},
          ],
        },
        {
          title: 'Product',
          items: [
            {label: 'Spaces', to: '/protocol/space-nft'},
            {label: 'Asset Passport', to: '/protocol/asset-passport'},
            {label: 'Creator Royalties', to: '/product/creator-royalties'},
          ],
        },
        {
          title: 'Build',
          items: [
            {label: 'SDK Overview', to: '/developers/sdk-overview'},
            {label: 'Game Integration', to: '/developers/game-integration'},
          ],
        },
      ],
      copyright: `Copyright (c) ${new Date().getFullYear()} Wotori Studio. Ekza Space docs are built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'rust', 'toml', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
