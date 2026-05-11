---
title: Asset Passport
description: Ekza 3D Asset Passport concept and mapping to current solana-stellar implementation.
---

# Asset Passport

An Asset Passport is the canonical record for a game-ready 3D asset.

It combines on-chain protocol state with off-chain metadata so a game,
marketplace, or creator profile can answer:

- who made this asset;
- who owns it;
- what license applies;
- where the model files live;
- which upstream work it depends on;
- whether it has a production release;
- how revenue should be shared.

## Current Protocol Mapping

The current Asset Passport is built on `solana-stellar`.

| Passport Field | Current Source |
| --- | --- |
| Universe | `Universe` account. |
| Asset ID | `Asset` PDA and `index`. |
| Creator | `Asset.creator`. |
| Asset type | `Asset.kind` and `Asset.subtype`. |
| License | `Asset.license_kind`. |
| Metadata | `Asset.metadata_hash`. |
| Preview | `Asset.preview_hash`. |
| Status | `Asset.status`. |
| Lineage | `AssetParent` links. |
| Production snapshot | `Release` account. |
| Revenue split | `ContributorShare` accounts. |
| Revenue vault | `ReleaseVault` PDA. |

## Asset Types

`solana-stellar` currently supports these high-level kinds:

- `Image`
- `Model3d`
- `Animation`
- `Audio`
- `Script`
- `Metadata`
- `Other`

Subtypes include:

- `Concept`
- `Sketch`
- `Texture`
- `Mesh`
- `Rig`
- `Motion`
- `Preview`
- `Final`
- `Other`

This lets a final game-ready asset point back to its concept, texture, rig, and
animation contributors.

## License Kinds

The current license enum includes:

- `Unknown`
- `AllRightsReserved`
- `Cc0`
- `CcBy4`
- `CcBySa4`
- `CcByNc4`
- `CcByNcSa4`
- `Mit`
- `Custom`

For production, `Custom` should resolve to a license document in the metadata
manifest.

## Passport Lifecycle

1. Create Universe.
2. Create Asset records for source work.
3. Add parent links to form lineage.
4. Submit and approve production-ready assets.
5. Create Release from an approved asset.
6. Add contributor shares when policy is `Custom`.  
   For `Equal`, `LineageEqual`, and `Weighted`, shares are inferred during finalization.
7. Finalize the release using the matching finalize instruction:
   - `finalizeRelease` for `Custom`.
   - `finalizeLineageEqualRelease` for `Equal` / `LineageEqual`.
   - `finalizeWeightedRelease` for `Weighted`.
8. Link the release to an avatar, Space, marketplace listing, or game inventory.

## Release Distribution Models

Stellar supports multiple collaboration policies:

| Policy | Meaning |
| --- | --- |
| `Equal` | Shares are distributed equally. |
| `LineageEqual` | Shares are inferred from asset lineage. |
| `Weighted` | Shares are weighted by lineage contribution rules. |
| `Custom` | Explicit shares are added by the Universe owner. |

The policy is immutable after Universe creation so contributors are not
surprised by a later economic change.

## Minimal Passport JSON

An off-chain passport document can wrap on-chain pointers:

```json
{
  "schema": "ekza.asset.passport.v1",
  "chain": "solana",
  "program": "solana_stellar",
  "universe": "PUBLIC_KEY",
  "asset": "PUBLIC_KEY",
  "release": "PUBLIC_KEY",
  "kind": "model3d",
  "subtype": "final",
  "license": "cc-by-4.0",
  "metadataUri": "ipfs://bafy.../asset.json",
  "previewUri": "ipfs://bafy.../preview.png"
}
```

Games should resolve the passport, validate the release or ownership state, then
load the 3D manifest referenced by metadata.
