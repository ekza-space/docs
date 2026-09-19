import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ekza Space',
  tagline: 'One avatar, many games. Creators stay owners; games approve what enters them.',
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
        {to: '/core-concepts/architecture', label: 'Architecture', position: 'left'},
        {to: '/developers/game-integration', label: 'Integrate a game', position: 'left'},
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
            {label: 'Architecture', to: '/core-concepts/architecture'},
            {label: 'Asset Lifecycle', to: '/core-concepts/asset-lifecycle'},
          ],
        },
        {
          title: 'Product',
          items: [
            {label: 'Roadmap', to: '/product/roadmap'},
            {label: 'Creator Royalties', to: '/product/creator-royalties'},
            {label: 'Solana Layer (optional)', to: '/protocol/solana-protocol'},
          ],
        },
        {
          title: 'Build',
          items: [
            {label: 'Game Integration', to: '/developers/game-integration'},
            {label: 'Rendition Profiles', to: '/developers/rendition-profiles'},
            {label: 'SDK Overview', to: '/developers/sdk-overview'},
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
