---
title: SDK Overview
description: Ekza SDKs - the Bevy SDK for games, the registry HTTP API any engine can call, and the optional Solana SDKs.
---

# SDK Overview

An Ekza SDK should make integration feel like product integration: list what my game
approved, install a verified file, connect a player's account. No blockchain code is
needed for that path.

## Game SDKs

| Package | For | What it gives a game | Status |
| --- | --- | --- | --- |
| `ekza-bevy-sdk` (Rust) | Bevy and any Rust engine (`default-features = false` drops Bevy) | The unified catalogue, a store of approved avatars with offline copy, verified download and install, the slug contract, account connection, wallet pairing and tickets, a Bevy loader | Working, 0.6 |
| `@ekza/stellar-sdk` (TypeScript) | Web games and apps | Owned-avatar/passport plus a wallet-independent `catalog` entry for v2, Space approvals, verified VRM downloads and account contracts | Wallet path released; catalogue/account entry available on `feature/space-account-migration`, production rollout pending |
| `@ekza/avatar-renderer` | React / three.js surfaces | One shared GLB/VRM avatar component | Working |

### Bevy SDK modules

| Module | Purpose |
| --- | --- |
| `registry` | HTTP client: `catalog_v2` (unified catalogue, narrowed to what a project approved), the older template catalogue and the free library |
| `catalog` | One normalized avatar shape for every feed |
| `store` | Approved avatars as store items (`slug`, exact rendition, `free`), persisted for offline starts; `install` verifies size, SHA-256 and the GLB envelope, then runs the game's own check before anything is placed on disk |
| `account` | Connect a game to a player's account with a short code and read their library; runs off the game loop and exposes a renderable state |
| `passport` | The wallet path: pairing, purchased library, one-use tickets, server-side consume |
| `cache`, `validation` | Verified download cache and typed model validation issues |
| `bevy` | Resources and an asset loader (behind the `bevy` feature) |

Secrets (device codes, tokens) stay in memory, never appear in URLs or logs, and the
types that hold them have no `Debug` output.

## No SDK for your engine yet

Everything the SDK does is plain HTTP plus two checks. The contracts are documented in
[Game Integration](./game-integration): `GET /v2/avatars`, the download with size and
SHA-256 verification, the slug derivation, and the account device flow.

## Solana SDKs (optional layer)

These are needed only when a product works with the on-chain layer directly. They live
inside the protocol repositories:

| Package | Repository | Purpose |
| --- | --- | --- |
| `solana-stellar-sdk` | `solana-stellar/sdk` | IDL, typed Anchor client, PDA helpers, account filters, and instruction helpers for universes, assets, and releases. |
| `avatars-sdk/profile` | `solana-avatars/sdk` | Profile client for `user_profile`. |
| `avatars-sdk/minter` | `solana-avatars/sdk` | Avatar collection and minting client for `avatar_nft_minter`. |
| `EkzaSpaceClient` | `solana-ekza-space/sdk` | Client for Config, Space PDAs, minting, and Space settings. |

### Responsibilities of the Solana SDKs

They should provide:

- PDA derivation helpers;
- typed account fetchers;
- instruction builders;
- metadata URI normalization;
- ownership and license checks;
- game-ready asset manifest loading;
- simple integration primitives for inventory, marketplace, or avatar selection.

### Space client example

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

### Stellar release flow

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

## On-chain asset resolution (planned shape)

For products that resolve an on-chain release directly, a package should eventually
provide the following. This is separate from the game path above, which already exists.

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

### Local development

Current commands:

```bash
cd solana-stellar
yarn --cwd sdk build
anchor test

cd solana-ekza-space
anchor build
anchor run litesvm

cd solana-avatars
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
