---
title: Roadmap
description: What Ekza has built, what is next and what comes later - the account-first path to portable avatars, with Solana as the optional ownership layer.
---

# Roadmap

The roadmap keeps Ekza on shippable slices. The order follows one rule: first prove the
whole loop with free avatars and no wallet, then add money, then add on-chain ownership
where it is the right tool.

> Published, approved, played: a creator uploads an avatar, a game's owner approves it,
> a player wears it in a match.

## Built

The loop above works end to end in the repositories and on a local stack. The public
servers have not been redeployed with it yet.

- **Studio** for creators, curators, game owners and players, with email accounts.
- **Rendition profiles**: games publish machine-readable requirements; creators see what
  stops an upload from fitting a game before anything is built.
- **Game-owned builders**: the registry runs a game's builder and verifies the result
  itself. Omoba's builder turns a VRM into a GLB with five retargeted animation clips.
- **Submissions and approval** by the owner of the game, with a 3D preview of the exact
  file. Each game retains its selected published rendition until approving an update.
- **Unified catalogue** `GET /v2/avatars` for games, from both Studio and the on-chain
  templates, with explicit `free` or `owned` access.
- **Account library and game connection**: a player saves avatars, connects a game with a
  short code, and the game lists their library.
- **Bevy SDK 0.6** with the catalogue, verified install, the slug contract and account
  connection.
- **Omoba** admits free approved avatars from its server's own catalogue read, next to
  shipped and purchased avatars.
- **Solana layer**: Spaces as NFTs, avatar templates and minting, collaborative releases
  with lineage and contributor shares, wallet pairing and one-use tickets.

## Next

- Verify the isolated Blender/USDZ runtime and stage the additive release-selection
  migration; release the SDK availability fix and repin game consumers.
- Rehearse the complete flow in the Omoba game window, including update and outage cases.
- Redeploy the public registry and Studio after release verification.
- Google sign-in; regional identity providers and regional storage of personal data.
- Ekza Space and Ekza Mirror on the unified catalogue and the account connection.
- Persist a game's connection across restarts.
- Self-service registration of games, profiles and builders.
- One test that fails whenever a profile document and the game's own validation drift.

## Later

- **Paid avatars.** Payment providers behind one interface, a platform fee, creator
  payouts. Prices and shares are terms of an agreement the creator accepts, never fields
  of an avatar.
- **Limited editions and resale.** Numbered copies, transfers through the platform,
  creator commission on every resale.
- **On-chain ownership as an option.** Issue an owned copy as an NFT for public,
  server-independent proof of a limited edition, and for trading outside Ekza.
- **Team creation in Studio.** Lineage, contributor shares and releases, brought over
  from the Solana layer, with trustless revenue splits remaining on-chain.
- **More engines.** Unity, Unreal and three.js examples on the same HTTP contracts.
- **Asset types beyond avatars.** Props, skins, effects and Spaces through the same
  profile and approval mechanism.

## Pitch Context

These numbers are project context and should not be changed unless the founder
provides updated data:

- Raised: `$20k seed`
- Seeking: `$500k`
- Early adopters: `20+ studios`
- Beta target: about `6 months`
- Concept started: around `2019`

## North Star

Every asset, avatar, and Space can have a passport:

- metadata;
- ownership;
- license;
- integration path;
- usage history;
- fair creator monetization.
