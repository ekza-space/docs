---
title: Creator Royalties
description: Creator royalties and profit sharing model for Ekza Space assets and releases.
---

# Creator Royalties

:::note Current state
Everything published through Ekza Studio is free today, and a player adds an avatar to a
library with one click. Paid avatars, payment providers, limited editions and resale are
planned; see the [Roadmap](./roadmap). Where this page says "NFT" or "mint", read it as
the optional Solana layer: a price and a creator's share are terms of an agreement the
creator accepts, recorded in the registry, and an on-chain copy is an option on top.
:::

Ekza Space should help creators keep economic participation after an asset
leaves the editor.

The current protocol foundation is in `solana-stellar`:

- releases have vaults;
- contributors have basis-point shares;
- revenue can be deposited;
- contributors can claim their share.

## Current Accounts

| Account | Role |
| --- | --- |
| `Release` | Production snapshot of an approved asset. |
| `ReleaseVault` | PDA-controlled vault for revenue deposits. |
| `ContributorShare` | Contributor wallet, bps allocation, and claimed amount. |

## Basis Points

Shares use a denominator of `10_000`.

```text
10000 bps = 100%
1000 bps = 10%
250 bps = 2.5%
```

## Release Revenue Flow

1. Create and approve assets.
2. Create a release.
3. Add contributor shares or infer them from lineage.
4. Finalize the release.
5. Deposit revenue into the release vault.
6. Contributors claim their share.

This supports mint fees, marketplace royalties, licensing fees, or downstream
game revenue.

## Collaboration Policies

| Policy | Use Case |
| --- | --- |
| `Equal` | Simple teams with equal contributors. |
| `LineageEqual` | Revenue follows asset lineage equally. |
| `Weighted` | Revenue follows weighted lineage rules. |
| `Custom` | Studio-defined split. |

The policy is immutable after Universe creation. That protects contributors
from later changes to the economic deal.

## Relationship to Metaplex Royalties

Metaplex creator fields are useful, but they are not enough for complex 3D
production.

Ekza keeps collaboration accounting in protocol accounts so it can support more
than simple NFT creator arrays:

- many contributors;
- lineage-based splits;
- game revenue deposits;
- custom release accounting;
- claims independent of NFT metadata limits.

## Future Royalty Layer

Future marketplace and SDK layers should connect:

- NFT sales;
- license checkout;
- game usage events;
- marketplace fees;
- release vault deposits;
- creator dashboards.

The goal is not only resale royalties. The bigger goal is fair participation in
ongoing asset usage.
