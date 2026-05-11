---
title: Architecture
description: Ekza Space architecture across protocol, metadata, SDKs, product surfaces, and future marketplace.
---

# Architecture

Ekza Space is organized as a stack, not as a single NFT app.

```text
Creator mission
  -> Solana protocol
  -> Asset, Avatar, and Space passports
  -> IPFS metadata and 3D manifests
  -> SDKs for games and apps
  -> Marketplace, inventory, and revenue distribution
```

## Layers

| Layer | Responsibility |
| --- | --- |
| Protocol | Solana accounts, PDAs, ownership, releases, vaults, and access control. |
| Metadata | IPFS or metadata URI documents that point to models, previews, animations, licenses, and compatibility data. |
| SDK | TypeScript clients, PDA helpers, IDLs, account fetchers, and integration helpers for games or frontends. |
| Product | Space minting, avatar passports, creator profiles, marketplace publishing, and asset pages. |
| Economy | Mint fees, royalties, contributor shares, release vaults, and future profit sharing. |

## Current Repositories

### `solana-stellar`

Anchor protocol for collaborative asset universes.

It stores:

- global registry;
- universes;
- typed assets;
- asset parent links;
- releases;
- release vaults;
- contributor shares.

This is the collaboration and revenue accounting foundation.

### `solana-ekza-space`

Anchor protocol for numbered virtual Spaces.

Each Space has:

- a unique `space_id`;
- a 1/1 NFT mint;
- a Metaplex metadata account;
- a `Space` PDA with settings;
- owner-gated and editor-aware settings updates.

This is the first direct Space ownership primitive.

### `solana-avatars`

Anchor programs and app for avatar identity and avatar minting.

It includes:

- `user_profile` for profile PDAs and selected avatar NFT;
- `avatar_nft_minter` for avatar collection data, mint fees, escrow, and Metaplex NFT minting;
- Stellar release links so a finalized collaborative release can be published as an avatar collection.

## Data Model Summary

Ekza should not store 3D model files on-chain.

On-chain accounts store compact, verifiable state:

- mint addresses;
- owners;
- IDs and indexes;
- metadata hashes or URIs;
- license enum or policy;
- access-control flags;
- vault and share data.

Off-chain metadata stores rich asset documents:

- GLB, VRM, FBX, OBJ, or USDZ file references;
- preview image;
- animation list;
- license document;
- author profile;
- compatibility tags;
- game integration notes.

## Product Surfaces

| Surface | Uses |
| --- | --- |
| Space | Mint, configure, open, and co-edit virtual rooms or worlds. |
| Avatar Passport | Link identity, avatar NFT, metadata, creator, and Stellar release. |
| Asset Passport | Describe any 3D asset with ownership, license, manifest, and usage history. |
| Marketplace | Publish, discover, buy, sell, or license game-ready assets. |
| SDK | Let games verify and load assets from Ekza. |

## AI Layer

AI can help create metadata, review files, describe assets, assist minting, or
guide SDK integration. It should not reposition Ekza as an AI-only project.

The center is still creator ownership, Solana-native licensing, and portable
3D asset use.
