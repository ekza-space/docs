---
title: SDK Overview
description: Developer SDK overview for Ekza Space Solana programs and game integrations.
---

# SDK Overview

Ekza SDKs should make protocol integration feel like product integration, not
raw Anchor account plumbing.

Current SDK entry points live inside the protocol repositories:

| Package | Repository | Purpose |
| --- | --- | --- |
| `solana-stellar-sdk` | `solana-stellar/sdk` | IDL, typed Anchor client, PDA helpers, account filters, and instruction helpers for universes, assets, and releases. |
| `avatars-sdk/profile` | `solana-avatars/sdk` | Profile client for `user_profile`. |
| `avatars-sdk/minter` | `solana-avatars/sdk` | Avatar collection and minting client for `avatar_nft_minter`. |
| `EkzaSpaceClient` | `solana-ekza-space/sdk` | Client for Config, Space PDAs, minting, and Space settings. |

## SDK Responsibilities

An Ekza SDK should provide:

- PDA derivation helpers;
- typed account fetchers;
- instruction builders;
- metadata URI normalization;
- ownership and license checks;
- game-ready asset manifest loading;
- simple integration primitives for inventory, marketplace, or avatar selection.

## Space Client Example

```ts
import {BN, Program, web3} from '@coral-xyz/anchor';
import {EkzaSpaceClient} from './sdk/ekzaSpaceClient';

const client = new EkzaSpaceClient(provider, program);

await client.initConfig({
  totalSpaces: 1000,
  priceLamports: new BN(0),
});

const {spacePda, mint} = await client.mintNextSpace(1, 'ipfs://bafy.../space.json');

await client.updateSpaceSettings(1, {
  name: 'Creator Studio',
  spaceConfigUri: 'ipfs://bafy.../space-config.json',
  isOpen: true,
  isEditableByOthers: false,
});
```

## Stellar Release Flow

The Stellar SDK should expose a higher-level release flow:

```ts
const universe = await stellar.createUniverse({
  metadataUri: 'ipfs://bafy.../universe.json',
  projectType: 'model3d',
  collaborationPolicy: 'lineageEqual',
  open: true,
});

const concept = await stellar.createAsset({
  universe,
  kind: 'image',
  subtype: 'concept',
  license: 'cc-by-4.0',
  metadataUri: 'ipfs://bafy.../concept.json',
});

const finalModel = await stellar.createAsset({
  universe,
  kind: 'model3d',
  subtype: 'final',
  license: 'cc-by-4.0',
  metadataUri: 'ipfs://bafy.../model.json',
  parents: [concept],
});

// For `LineageEqual` and `Weighted`, finalize needs lineage proof accounts and
// must call the policy-specific finalize instruction.
const release = await stellar.finalizeLineageEqualRelease({
  universe,
  asset: finalModel,
  assetCount: 1,
  linkCount: 0,
  remainingAccounts: [
    concept,
  ], // pass lineage assets, links, and auto-created share accounts
});
```

The exact wrapper can evolve, but the application-facing concepts should stay
stable: Universe, Asset, Release, Passport, License, Revenue Share.

## Game SDK Shape

A game integration package should eventually provide:

```ts
const passport = await ekza.resolveAssetPassport({
  chain: 'solana',
  release: releasePublicKey,
});

await ekza.assertLicense(passport, {
  use: 'in-game-runtime',
  gameId: 'omoba',
});

const asset = await ekza.loadGameAsset(passport);
scene.add(asset.model);
```

## Local Development

Current commands:

```bash
cd /Users/wotori/git/ekza/solana-stellar
yarn --cwd sdk build
anchor test

cd /Users/wotori/git/ekza/solana-ekza-space
anchor build
anchor run litesvm

cd /Users/wotori/git/ekza/solana-avatars
anchor test
```

For frontend apps, local package dependencies can point to SDK directories:

```json
{
  "dependencies": {
    "solana-stellar-sdk": "file:../solana-stellar/sdk",
    "avatars-sdk": "file:../solana-avatars/sdk"
  }
}
```
