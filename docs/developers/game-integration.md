---
title: Game Integration
description: How games should integrate Ekza Space assets, avatars, Spaces, and licensing.
---

# Game Integration

Ekza assets should be usable in games, not only collectible in wallets.

The game integration path is:

1. Connect wallet.
2. Resolve owned Ekza assets, avatars, or Spaces.
3. Fetch on-chain account state.
4. Resolve metadata URI or IPFS manifest.
5. Validate ownership and license.
6. Load the 3D model or Space scene.
7. Track usage or revenue event when needed.

## Integration Surfaces

| Surface | Game Use |
| --- | --- |
| Avatar Passport | Let a player select a verified avatar NFT. |
| Asset Passport | Load owned or licensed game-ready models. |
| Space NFT | Load a room, scene, arena, or social world. |
| Release Vault | Deposit revenue for a finalized production asset. |
| Marketplace | Discover and license additional assets. |

## Ownership Check

For an NFT-backed asset, a game should verify:

- wallet connected;
- token account belongs to wallet;
- token account mint matches expected mint;
- token amount is at least one;
- mint and metadata match the passport policy.

For profile avatars, the `user_profile` program already requires ownership
proof when setting or updating `avatar_mint`.

## License Check

A game should not treat every NFT as an unlimited commercial license.

The license check should resolve:

- `Asset.license_kind` from `solana-stellar`;
- a custom license URI when `license_kind` is `Custom`;
- marketplace listing terms if the asset is licensed rather than owned;
- game-specific usage such as playable character, skin, prop, map, or effect.

## Loading 3D Content

The recommended runtime path:

```text
asset passport
  -> metadata URI
  -> asset manifest
  -> model URI
  -> game loader
```

Use GLB where possible because it bundles geometry, materials, textures, and
animations in one portable file.

## OMOBA Showcase

OMOBA can be a flagship game powered by Ekza Space.

It should demonstrate:

- characters minted as avatar or asset passports;
- skins and effects published by creators;
- arenas or rooms represented as Spaces;
- release vaults receiving downstream revenue;
- SDK-based ownership and license checks.

OMOBA should not be described as the whole Ekza project. It is a showcase app
for the asset layer.

## Minimal Runtime Contract

A game needs a stable asset object after resolving Ekza metadata:

```ts
type EkzaGameAsset = {
  passport: string;
  owner?: string;
  license: string;
  modelUri: string;
  previewUri?: string;
  animations?: string[];
  scale?: number;
  sourceRelease?: string;
};
```

The SDK can evolve under this contract while games keep a simple runtime API.
