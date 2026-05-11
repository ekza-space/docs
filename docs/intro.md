---
title: Introduction
description: Ekza Space protocol overview for 3D asset ownership, licensing, Spaces, avatars, SDKs, and creator monetization.
slug: /
---

# Ekza Space

Ekza Space is a Solana-native 3D asset ownership and licensing platform for
creators and game developers.

It lets creators publish game-ready avatars, assets, and virtual spaces with
on-chain ownership, IPFS metadata, portable identity, and future
royalty/profit-sharing support.

## Positioning

Ekza Space is building the on-chain ownership layer for portable 3D assets and
avatars.

Use these descriptions:

- Solana-native 3D asset ownership protocol.
- On-chain licensing layer for game-ready 3D assets.
- Portable avatars and 3D assets for games and virtual worlds.
- 3D creator economy platform with NFT ownership, IPFS metadata, and SDK integration.
- Collaborative platform for creating, owning, and monetizing 3D avatars, assets, and spaces.

Avoid describing Ekza as only:

- a generic metaverse;
- a JPEG NFT marketplace;
- an avatar generator;
- a single game project.

Ekza is an infrastructure layer for ownership, licensing, usage, and
monetization of 3D content.

## What This Documentation Covers

The current protocol implementation is split across three Solana codebases.

| Repository | Role |
| --- | --- |
| `solana-stellar` | Collaborative asset universes, asset lineage, releases, contributor shares, release vaults, and revenue claims. |
| `solana-ekza-space` | Numbered Space NFTs with Metaplex metadata and mutable PDA settings. |
| `solana-avatars` | Avatar profiles, avatar minting, creator fee escrow, and links to finalized Stellar releases. |

These docs turn the implementation into a single product story:

- creators publish assets instead of losing control after export;
- assets receive passports with metadata, license, author, and usage path;
- developers integrate assets through SDKs;
- revenue and royalties can be split between collaborators;
- Spaces and OMOBA can become showcase applications powered by the same asset layer.

## Core Flow

1. A creator or studio opens a Universe in `solana-stellar`.
2. Contributors add typed assets such as concepts, textures, meshes, rigs, animations, scripts, or metadata.
3. Assets are linked into lineage so final work can point back to upstream work.
4. An approved asset becomes a Release with a vault and contributor share snapshot.
5. A Space or avatar can reference that metadata and become a Solana NFT.
6. Games use SDKs to resolve ownership, metadata, license, and playable asset files.

## First Reads

- [Mission](./core-concepts/mission)
- [Architecture](./core-concepts/architecture)
- [Solana Protocol](./protocol/solana-protocol)
- [Space NFT](./protocol/space-nft)
- [Asset Passport](./protocol/asset-passport)
- [SDK Overview](./developers/sdk-overview)
