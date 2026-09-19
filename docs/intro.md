---
title: Introduction
description: Ekza lets one 3D avatar work in many games while its creator stays its owner. Overview of the registry, Studio, game approval, SDKs and the optional Solana layer.
slug: /
---

# Ekza Space

Ekza is the layer that lets one 3D avatar work in many games, and lets its creator stay
its owner while it does.

A creator publishes an avatar once. Each game declares what a file must be for that game;
Ekza prepares that file, the creator submits it, and an owner of the game approves it. A
player keeps avatars in an Ekza account and finds them in every game that approved them.
The main path needs an email account, not a crypto wallet. Solana is an optional layer
for public proof of ownership, limited editions and trading.

## Positioning

Use these descriptions:

- Portable avatars and 3D assets for games and virtual worlds.
- One upload, a verified rendition for every game that accepts it.
- A registry where games publish their requirements and approve what enters them.
- A creator platform where authorship, license and usage stay attached to the asset.
- Optional on-chain ownership for limited editions and trading.

Avoid describing Ekza as only:

- a generic metaverse;
- a JPEG NFT marketplace;
- an avatar generator;
- a single game project;
- a blockchain product. A wallet is one way to hold an avatar, not a condition for using
  Ekza.

Ekza is an infrastructure layer for ownership, licensing, usage and monetization of 3D
content.

## What the system is made of

| Part | Role |
| --- | --- |
| Registry | Source of truth: accounts, avatars, revisions, rendition profiles, renditions, submissions, libraries, the catalogue games read |
| Studio | The web interface for creators, curators, game owners and players |
| Rendition builders | Code owned by each game that turns an upload into that game's file |
| SDKs | Catalogue, verified download, account connection; Rust/Bevy first |
| Omoba, Ekza Space, Ekza Mirror | The first three consumers: a multiplayer game, a web world, an iOS AR app |
| Solana layer | Optional: Spaces as NFTs, on-chain avatar templates, collaborative releases with contributor shares |

[Architecture](./core-concepts/architecture) gives the status of every part.

## Core flow

1. A creator uploads a model in Studio and a curator publishes it.
2. The creator sees what each game needs, and a rendition is built for the games they choose.
3. The creator submits the rendition; an owner of the game approves it.
4. A player saves the avatar to their library.
5. The game reads what it approved, the player connects their account, picks the avatar, and the game server admits it.

## First reads

- [Mission](./core-concepts/mission)
- [Architecture](./core-concepts/architecture)
- [Asset Lifecycle](./core-concepts/asset-lifecycle)
- [Game Integration](./developers/game-integration)
- [Rendition Profiles](./developers/rendition-profiles)
- [Solana Layer](./protocol/solana-protocol)
