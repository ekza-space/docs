---
title: Architecture
description: How Ekza is built - the registry, Studio, rendition profiles, game approval, accounts, SDKs and the optional Solana layer - with the current status of every part.
---

# Architecture

This page is the reference for how Ekza is put together and where it is going. Each
part carries a status, so the page describes the target and says honestly how much of
it exists.

## The idea in one paragraph

A creator publishes an avatar once. Every game declares what a file must be for that
game (a *rendition profile*). Ekza prepares a separate file for each profile, the
creator submits it to the game, and an owner of that game approves it. A player keeps
avatars in an Ekza account and sees them in every game that approved them. The main
path needs an email account, not a crypto wallet. Solana is an optional layer for
public proof of ownership, limited editions and trading.

```text
Creator ──> Studio ──> Registry ──> rendition per game ──> game owner approves
                          │                                        │
Player ──> account library ┘                 Game ──> SDK ──> catalogue, files, account link
                          └────────── optional: Solana ownership and trading layer
```

## Status legend

| Status | Meaning |
| --- | --- |
| **Working** | Implemented and covered by automated tests, exercised end to end on a local stack. Not yet redeployed to the public servers unless the row says so. |
| **In progress** | Partly implemented; the row says what is missing. |
| **Planned** | Designed, not implemented. |

## Components

| Component | Role | Status |
| --- | --- | --- |
| **Registry** (backend) | The single source of truth for new avatars: accounts, avatars and their revisions, rendition profiles, renditions, submissions, account libraries, and the catalogue games read. PostgreSQL, authentication and private file storage. | Working |
| **Studio** (web) | The human interface of the registry for four roles: creator, curator, game owner, player. Talks to the registry over HTTP only. | Working |
| **Workers** | Two durable queues: processing an uploaded revision, then building renditions for profiles. | Working |
| **Rendition builders** | The code that turns a creator's upload into a game's file. Owned by the game, run by the registry. See [Rendition Profiles](../developers/rendition-profiles). | Working for Omoba and the iOS mirror app |
| **Game SDKs** | Read the catalogue, download with hash and size verification, link a game to an account. Rust/Bevy first, TypeScript for web. | Rust: Working. TypeScript: In progress (wallet path only) |
| **Omoba** | A multiplayer game, the first consumer. Owns the profile `desktop / humanoid-glb-v1`. | Working end to end |
| **Ekza Space** | A web world, the second consumer. Owns `universal / vrm-humanoid-v1` (the upload is used as it is). | In progress: profile, approval and preview work; sign-in still needs a wallet |
| **Ekza Mirror** | An iOS AR app, the third consumer. Owns `ios / arkit-body-v1`. | Working through its existing library feed; not yet on the unified catalogue |
| **Solana layer** | Programs for avatar templates, Spaces and collaborative releases; the wallet storefront and the wallet pairing API. | Working, optional, frozen for new features. See [Solana Layer](../protocol/solana-protocol) |
| **Payments** | Paid avatars, creator payouts, provider integrations. | Planned. Everything published through Studio is free today; the accounting model for sales and payouts exists for one channel only |

## Roles and surfaces

| Role | Where | Does |
| --- | --- | --- |
| Creator | Studio | Uploads a model, sees what each game needs, prepares and submits renditions, follows decisions, publishes new revisions |
| Curator | Studio | Reviews safety and rights, publishes or returns a revision |
| Game owner | Studio, *Games* view | Sees submissions to their game, inspects the exact file in 3D, approves or declines |
| Player | Studio catalogue, then the game | Saves avatars to a library, connects the game to the account, picks an avatar in the game |

The registry itself has no human interface. People use Studio; programs use the API.

## Data model

```text
account ─┬─ avatar ── revision ─┬─ rendition ── submission ── project (game)
         │  (creator) (versions  │ (file for     (request to      │
         │             of upload)│  a profile)    a game)         ├─ owners
         ├─ library (saved avatars)                               └─ accepted profiles ── rendition profile
         └─ game links (connected games)
```

- A **revision** is one upload. Its life cycle is draft, queued, processing, review,
  then published, rejected or failed. Only a curator publishes.
- A **rendition profile** is a selector `platform / profile` with a version, a
  requirements document and the name of a builder. It belongs to the protocol, not to
  one game: a game *accepts* profiles. A second game that accepts an existing profile is
  compatible with every rendition already built for it.
- A **rendition** is one file for one revision and one profile: either the upload itself
  or a file produced by a builder.
- A **submission** sends a rendition to a game. Only an owner of that game decides.
- Prices, creator shares, sales and payouts are terms of an accepted agreement in a
  separate commerce model. They are deliberately not fields of an avatar.

Access rules are enforced in the database, not in application code. No client has table
access; every write goes through a small set of server-only functions.

## The approval rule

An approval counts only for the avatar's **current published revision**. Unpublishing,
publishing a new revision, or withdrawing the submission removes it at once. The
curator's review (is it safe, are the rights clear) and the game owner's acceptance
(does it fit our game) are independent, and both are required.

## Identifiers

| Scheme | Meaning |
| --- | --- |
| `ekza:avatar:<uuid>` | An avatar published through Studio. No chain record. |
| `solana:<cluster>:avatar-data:<address>` | An on-chain avatar template from the Solana layer. |

A game never treats an identifier as a file. What a player wears is pinned by a slug
derived from the identifier **and** the SHA-256 of the exact rendition, so the same
bytes are verified on every client and on the game server.

## What games read

| Contract | Purpose | Status |
| --- | --- | --- |
| `GET /v2/avatars?project=&platform=&profile=` | One catalogue from both sources in a neutral shape: identifier, origin, renditions with absolute download URLs, hashes and sizes, approvals, and `access` (`free` or `owned`). With `project`, only what that game approved. Never cached, because publication is revocable. | Working |
| `GET /v1/profiles` | Every rendition profile with its machine-readable requirements and the games that accept it. Public. | Working |
| `POST /v1/account/device`, `/device/poll`, `GET /v1/account/library` | Connect a game to a player's account with a short code, then read that account's library for this game. | Working |
| Built rendition files | Served anonymously by content hash; revocation is immediate. | Working |
| `GET /v1/avatars` | The original catalogue of on-chain templates: an immutable, cacheable snapshot. Unchanged, kept for existing clients. | Working |

Details and examples: [Game Integration](../developers/game-integration).

## Trust boundaries

- **A client can never declare an avatar free or owned.** A game server reads the
  registry itself. It admits a `free` avatar from that read, and an `owned` one only
  with a one-use ticket from the wallet layer.
- **A builder is never trusted blindly.** After a game's builder produces a file, the
  registry verifies its path, hash and size and applies the profile's requirements
  itself.
- **Connecting a game grants nothing.** The account link lets a game list the player's
  library; admission to a match stays the server's decision.
- **Secrets are not stored.** Device codes and game tokens are generated by the registry
  and only their hashes are kept. A code works once and expires in minutes; a token
  reads one library for one game and can be revoked by the player.
- **Files are private until published.** A game owner can read exactly the files of a
  submission to their own game while it is pending or approved, and nothing else.

## The Solana layer

Solana is where Ekza started, and its programs keep working: numbered Spaces as NFTs,
avatar templates and minting, collaborative releases with lineage and contributor
shares. In the current architecture it is an optional layer with a specific job:

- public, server-independent proof that an edition is limited;
- ownership that survives Ekza itself, and trading between players;
- trustless revenue splits for collaborative releases.

Nothing in the main path requires it. A wallet is one way to hold `owned` avatars, not a
condition for using Ekza. See [Solana Layer](../protocol/solana-protocol).

## Not connected yet

Kept here on purpose, so this page stays a source of truth rather than a brochure.

1. The public servers have not been redeployed with the parts marked Working above; they
   currently serve the earlier catalogue and library only.
2. Sign-in is email and password. Google sign-in and regional identity providers are
   planned.
3. Ekza Space and Ekza Mirror do not use the account link yet; Space still signs in with
   a wallet.
4. Paid avatars, payment providers, limited editions and resale are planned.
5. Team creation with lineage and contributor shares exists only in the Solana layer;
   bringing it into Studio is planned.
6. A game token lives in memory, so a player reconnects the account after restarting the
   game.
