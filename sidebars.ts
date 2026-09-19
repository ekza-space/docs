import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Foundation',
      items: [
        'core-concepts/mission',
        'core-concepts/architecture',
        'core-concepts/asset-lifecycle',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: [
        'developers/game-integration',
        'developers/rendition-profiles',
        'developers/sdk-overview',
      ],
    },
    {
      type: 'category',
      label: 'Solana Layer (optional)',
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
