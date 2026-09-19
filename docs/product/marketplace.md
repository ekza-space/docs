---
title: Marketplace
description: Marketplace direction for publishing, licensing, and monetizing game-ready Ekza assets.
---

# Marketplace

:::note Current state
Everything published through Ekza Studio is free today, and a player adds an avatar to a
library with one click. Paid avatars, payment providers, limited editions and resale are
planned; see the [Roadmap](./roadmap). Where this page says "NFT" or "mint", read it as
the optional Solana layer: a price and a creator's share are terms of an agreement the
creator accepts, recorded in the registry, and an on-chain copy is an option on top.
:::

The Ekza marketplace should be a product layer on top of the protocol, not the
whole project.

Its job is to help creators publish game-ready assets and help developers find,
license, and integrate them.

## Marketplace Goals

- Publish assets with metadata and passports.
- Mint or link NFT-backed ownership.
- Sell or license usage rights.
- Show creator, license, compatibility, and lineage.
- Support royalty or profit-sharing settings.
- Let developers move from discovery to SDK integration.

## Listing Model

A marketplace listing should reference:

- asset passport;
- owner or creator;
- price;
- license terms;
- supported engines;
- preview media;
- model manifest;
- optional release vault;
- optional royalty split.

Example:

```json
{
  "schema": "ekza.marketplace.listing.v1",
  "assetPassport": "ipfs://bafy.../passport.json",
  "seller": "PUBLIC_KEY",
  "price": {
    "currency": "SOL",
    "amountLamports": 100000000
  },
  "license": {
    "kind": "commercial-game-use",
    "uri": "ipfs://bafy.../license.md"
  },
  "compatibility": ["bevy", "unity", "threejs"],
  "royaltyBps": 500
}
```

## Marketplace Is Not

The marketplace should not reduce Ekza to:

- generic NFT trading;
- JPEG collection minting;
- speculative-only asset flips;
- a disconnected store with no SDK integration.

The marketplace should make the protocol useful for creators and game teams.

## Product Pages

Each asset page should answer:

- What is this asset?
- Can I use it in my game?
- What license applies?
- Who created it?
- Which files are included?
- Which engines are supported?
- What is the on-chain passport?
- How do I integrate it?

## Future Work

- Primary sales.
- Secondary sales.
- License checkout.
- Creator profiles.
- Studio accounts.
- Bundle listings.
- Revenue dashboards.
- Game-specific asset collections.
