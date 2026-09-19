---
title: Avatar Passport
description: Ekza Avatar Passport concept and mapping to solana-avatars.
---

# Avatar Passport

:::note Optional layer
This page describes the Solana layer. It keeps working and is frozen for new features.
Nothing in Ekza's main path requires it: creators publish, games approve and players play
with an email account. Solana adds public proof of ownership, limited editions and
trading. See [Architecture](../core-concepts/architecture).
:::

In these docs "passport" means the on-chain record of an avatar and the wallet pairing
service built on it. An avatar published through Studio has no passport of this kind: its
record lives in the registry under an `ekza:avatar:<uuid>` identifier, and a player reaches
it through an [account connection](../developers/game-integration), not a wallet.

An Avatar Passport links a user identity, avatar NFT, metadata, and optional
Stellar release into one portable identity record.

It lets a wallet prove:

- this is my profile;
- this NFT is my selected avatar;
- I hold the avatar token;
- the avatar metadata is valid;
- the avatar may come from a collaborative Stellar release.

## Current Programs

The avatar stack lives in:

```text
solana-avatars
```

It has two Anchor programs:

| Program | Purpose |
| --- | --- |
| `user_profile` | Stores profile data and selected avatar mint. |
| `avatar_nft_minter` | Publishes avatar collections and mints avatar NFTs. |

## Profile PDA

Seed:

```text
["profile", owner]
```

Fields:

| Field | Meaning |
| --- | --- |
| `owner` | Wallet that controls the profile. |
| `username` | Fixed 32-byte username. |
| `description` | Fixed 128-byte description. |
| `avatar_mint` | Selected avatar NFT mint. |
| `created_at` | Creation timestamp. |

Profile creation and avatar updates require proof that the owner holds the
selected avatar mint in a token account.

## Avatar Minter Accounts

| Account | Purpose |
| --- | --- |
| `AvatarRegistry` | Stores `next_index` for avatar collection data. |
| `AvatarData` | Stores creator, IPFS hash policy, supply, fee, and fee state. |
| `Escrow` | PDA that holds mint fees until creator claim. |
| `StellarAvatarLink` | Links avatar data to a Stellar release. |
| `StellarReleaseLink` | Reverse lookup from Stellar release to avatar data. |

Important seeds:

| PDA | Seeds |
| --- | --- |
| Registry | `["avatar_registry"]` |
| Avatar data | `["avatar_v1", next_index_le]` |
| Escrow | `["avatar_escrow", index_le]` |
| Stellar avatar link | `["stellar_avatar_link", avatar_data]` |
| Stellar release link | `["stellar_release_link", stellar_release]` |

## Main Instructions

`user_profile`:

- `initialize_profile`
- `update_profile`
- `update_avatar_mint`
- `delete_profile`

`avatar_nft_minter`:

- `initialize_avatar`
- `initialize_avatar_from_stellar`
- `mint_nft`
- `claim_fee`

## Mainnet Security Standard

The current protocol follows these production-oriented rules:

- NFT mints use `decimals = 0`.
- Mint authority and freeze authority are revoked after minting.
- Metadata must use the canonical Metaplex PDA.
- Mint URI must match the avatar hash policy stored in `AvatarData`.
- Mint fees are transferred atomically and tracked with checked arithmetic.
- Only the creator can claim escrowed fees.
- Profiles can only attach an avatar mint after ownership proof.
- Mutable state uses deterministic PDAs and signer constraints.

## Stellar Release Integration

`initialize_avatar_from_stellar` lets a finalized Stellar release become an
avatar collection.

The flow:

1. A collaborative asset is finalized in `solana-stellar`.
2. The release has a vault and contributor share distribution.
3. The avatar minter initializes `AvatarData` from that release.
4. Mints can generate revenue.
5. Revenue can be linked back to the release accounting model.

This makes avatars useful proof of a real production asset, not only a profile
image or isolated collectible.

## Avatar Passport Document

```json
{
  "schema": "ekza.avatar.passport.v1",
  "profile": "PUBLIC_KEY",
  "owner": "PUBLIC_KEY",
  "avatarMint": "PUBLIC_KEY",
  "avatarData": "PUBLIC_KEY",
  "metadataUri": "ipfs://bafy.../avatar.json",
  "stellarRelease": "PUBLIC_KEY",
  "model": "ipfs://bafy.../avatar.glb",
  "rig": "humanoid",
  "compatibility": ["web", "bevy", "unity"]
}
```
