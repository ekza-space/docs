---
title: Solana Protocol
description: Current Solana protocol implementation across Stellar, Spaces, and Avatars.
---

# Solana Protocol

:::note Optional layer
This page describes the Solana layer. It keeps working and is frozen for new features.
Nothing in Ekza's main path requires it: creators publish, games approve and players play
with an email account. Solana adds public proof of ownership, limited editions and
trading. See [Architecture](../core-concepts/architecture).
:::

Ekza Space uses Anchor programs to represent creator collaboration, asset
ownership, virtual Spaces, avatar identity, and revenue accounting on Solana.

## Protocol Map

| Program | Repository | Program ID | Purpose |
| --- | --- | --- | --- |
| `solana_stellar` | `solana-stellar` | `3rVXfq7LLSLqbDzvZuSrQoMytwczLj2Q8Hue62rxPZAA` | Universes, assets, lineage, releases, revenue vaults, contributor shares. |
| `solana_ekza_space` | `solana-ekza-space` | `Bms233NNbKb5FAcsjCmmCAU98oCuBXwLrLXNE5sBRdbb` | Finite numbered Space NFTs and Space settings. |
| `user_profile` | `solana-avatars` | `56kfTdE1xmCkZ2eDuikD7S5Mr15nmdzQENDWfmdMVtt` | User profile PDA and selected avatar NFT. |
| `avatar_nft_minter` | `solana-avatars` | `29KLLArkfCfRGPgTh4k4qzXvR2JkkXfRnnNZTKn54TKz` | Avatar collection data, minting, fee escrow, and Stellar release links. |

## `solana_stellar`

Stellar is the protocol core for collaborative 3D asset production.

Main accounts:

| Account | Purpose |
| --- | --- |
| `Registry` | Global universe count. |
| `UniverseIndex` | Lookup from global index to universe. |
| `Universe` | Workspace owned by a creator or studio. |
| `Asset` | Typed content record backed by metadata hash and preview hash. |
| `AssetParent` | Directed lineage edge from child asset to parent asset. |
| `Release` | Immutable production snapshot for an approved asset. |
| `ReleaseVault` | PDA-controlled revenue vault. |
| `ContributorShare` | Basis-point revenue share and claim state. |

Important seeds:

| PDA | Seeds |
| --- | --- |
| Registry | `["registry"]` |
| Universe | `["universe", owner, universe_index_le]` |
| Universe index | `["universe_index", global_index_le]` |
| Asset | `["asset", universe, asset_index_le]` |
| Link | `["link", child_asset, parent_asset]` |
| Release | `["release", universe, release_index_le]` |
| Release vault | `["release_vault", release]` |
| Contributor share | `["share", release, contributor]` |

Core instructions:

- `create_universe`
- `update_universe`
- `close_universe`
- `create_asset`
- `update_asset_metadata`
- `add_asset_parent`
- `submit_asset`
- `approve_asset`
- `reject_asset`
- `close_asset`
- `create_release`
- `add_release_share`
- `finalize_release`
- `finalize_lineage_equal_release`
- `finalize_weighted_release`
- `link_avatar_data`
- `deposit_revenue`
- `claim_revenue`

## `solana_ekza_space`

Ekza Space provides finite numbered Space NFTs.

Each Space is a 1/1 mint plus a PDA storing settings:

- `space_id`;
- `mint`;
- `owner`;
- `name`;
- `space_config_uri`;
- `is_open`;
- `is_editable_by_others`;
- editor allowlist;
- reserved extension bytes.

The current implementation uses `space_v1` as the Space PDA seed root.

## `solana-avatars`

The avatar stack has two programs.

`user_profile` stores a wallet profile:

- owner;
- username;
- description;
- selected avatar mint;
- creation timestamp.

`avatar_nft_minter` stores avatar collection data:

- IPFS hash policy;
- creator;
- max supply;
- current supply;
- mint fee;
- unclaimed fees;
- Stellar release links.

The minter enforces non-inflationary NFT behavior by revoking mint and freeze
authority after minting.

## Metadata Strategy

The protocol stores compact references on-chain:

- metadata hash;
- preview hash;
- metadata URI;
- license enum;
- mint;
- PDA state.

Rich 3D data belongs in IPFS or another content-addressed storage layer.

## Verification Commands

Run protocol tests from each repository:

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
