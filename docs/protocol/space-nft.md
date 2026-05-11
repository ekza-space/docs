---
title: Space NFT
description: NFT-backed virtual Spaces in the solana-ekza-space Anchor program.
---

# Space NFT

A Space is a virtual room, scene, world, game area, or collaborative creative
zone represented by a Solana NFT and a PDA with editable settings.

It is not just an image NFT. The NFT proves ownership, while the PDA stores
configuration that can point to an IPFS manifest for the actual Space content.

## Program

Repository:

```text
/Users/wotori/git/ekza/solana-ekza-space
```

Program:

```text
solana_ekza_space
Bms233NNbKb5FAcsjCmmCAU98oCuBXwLrLXNE5sBRdbb
```

## Accounts

### Config

Seed:

```text
["config"]
```

Fields:

| Field | Meaning |
| --- | --- |
| `authority` | Config authority. |
| `treasury` | SOL recipient for Space mint payments. |
| `total_spaces` | Maximum number of Spaces. |
| `minted_spaces` | Number of minted Spaces. |
| `price_lamports` | Mint price. |
| `collection_mint` | Optional collection mint or default pubkey. |
| `bump` | PDA bump. |

### Space

Seed:

```text
["space_v1", config_pubkey, space_id_le_bytes]
```

Fields:

| Field | Meaning |
| --- | --- |
| `space_id` | Unique ID from `1..=total_spaces`. |
| `mint` | NFT mint representing the Space. |
| `owner` | Owner of Space settings, synced with NFT holder on owner update. |
| `name` | Human-readable Space name, max 64 bytes. |
| `space_config_uri` | Off-chain config URI, max 512 bytes. |
| `is_open` | Whether other users can enter. |
| `is_editable_by_others` | Whether non-owners may update shared state. |
| `editors` | Explicit editor allowlist, max 10 pubkeys. |
| `bump` | PDA bump. |
| `reserved` | Reserved bytes for future extensions. |

## Instructions

### `init_config`

Initializes the global Config PDA.

Arguments:

- `total_spaces: u32`
- `price_lamports: u64`
- `treasury: Pubkey`
- `collection_mint: Option<Pubkey>`

### `update_config`

Updates mutable config fields. The signer must be the config authority.

Arguments:

- `new_price_lamports: Option<u64>`
- `new_treasury: Option<Pubkey>`

### `mint_next_space`

Mints a Space NFT and creates its Space PDA.

Behavior:

1. Validates capacity and `space_id`.
2. Transfers mint payment to treasury when price is non-zero.
3. Creates a mint with zero decimals.
4. Creates the payer ATA.
5. Mints exactly one token.
6. Creates canonical Metaplex metadata.
7. Revokes mint authority.
8. Initializes Space PDA settings.
9. Emits `SpaceMinted`.

Arguments:

- `space_id: u32`
- `uri: Option<String>`

If `uri` is not provided, metadata defaults to:

```text
https://meta.ekza.space/spaces/{space_id}.json
```

### `update_space_settings`

Updates Space settings.

The signer must provide a token account holding one NFT for the Space mint.
Settings access is split:

| Field | Who can update |
| --- | --- |
| `name` | NFT owner only. |
| `is_open` | NFT owner only. |
| `is_editable_by_others` | NFT owner only. |
| `add_editor` | NFT owner only. |
| `remove_editor` | NFT owner only. |
| `space_config_uri` | NFT owner, editor, or any signer when shared editing is enabled. |

This lets a Space owner keep authoritative ownership while allowing shared room
state updates for collaborative worlds.

## Space Config URI

`space_config_uri` should point to a JSON manifest describing the Space:

```json
{
  "schema": "ekza.space.config.v1",
  "name": "Studio Room",
  "scene": "ipfs://bafy.../scene.glb",
  "spawn": [0, 1.7, 0],
  "assets": [
    {
      "assetId": "stellar:release:...",
      "role": "environment",
      "uri": "ipfs://bafy.../asset-manifest.json"
    }
  ],
  "permissions": {
    "open": true,
    "editableByOthers": false
  }
}
```

The NFT proves ownership. The manifest describes the world.
