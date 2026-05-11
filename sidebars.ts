import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Foundation',
      items: ['core-concepts/mission', 'core-concepts/architecture'],
    },
    {
      type: 'category',
      label: 'Solana Protocol',
      items: [
        'protocol/solana-protocol',
        'protocol/space-nft',
        'protocol/asset-passport',
        'protocol/avatar-passport',
        'protocol/metadata-standard',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: ['developers/sdk-overview', 'developers/game-integration'],
    },
    {
      type: 'category',
      label: 'Product',
      items: [
        'product/marketplace',
        'product/creator-royalties',
        'product/roadmap',
      ],
    },
  ],
};

export default sidebars;
