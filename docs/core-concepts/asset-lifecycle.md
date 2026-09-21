---
title: Asset Lifecycle
description: From a creator's upload to a player wearing the avatar in a game - the six steps, who acts at each, and what makes an approval stop counting.
---

# Asset Lifecycle

One avatar, many games. The lifecycle is the same whichever game it ends up in.

| Step | What happens | Who acts | Where |
| --- | --- | --- | --- |
| 1. Create | A finished model is uploaded. One creator, one owner. Team creation with lineage and shares is planned for Studio and exists today in the Solana layer. | Creator | Studio |
| 2. Publish | The upload becomes a revision with a content hash, a license and an attribution. A curator reviews safety and rights and publishes it. | Curator | Studio |
| 3. Integrate | The creator picks games. For each game the upload is checked against the game's profile; when it passes, a rendition is built for that game. | Creator, worker | Studio, registry |
| 4. Accept | The creator submits the rendition. An owner of that game inspects the exact file and approves or declines with a note. | Game owner | Studio, *Games* view |
| 5. Acquire | A player saves the avatar to their library. Everything published through Studio is free today; paid avatars are planned. | Player | Studio catalogue |
| 6. Use | The game lists what it approved, the player connects an account to see their own library first, picks an avatar, and the game server decides admission. | Player, game | The game |

## Two independent gates

```text
upload ──> curator publishes ──────────┐
                                        ├──> visible to the game
rendition ──> game owner approves ─────┘
```

The curator answers "is this safe and are the rights clear". The game owner answers
"does this fit our game". Neither can stand in for the other, and an avatar reaches a
game only when both said yes.

## Updating an avatar

A new upload is a new revision with a new hash. Its renditions are built and checked
again, and approvals are **not** carried over: a game approved particular bytes, not a
name. Publishing the new revision keeps each game on its selected, previously approved
file. Only that game's approval switches it to the new bytes. Games can update at
different times; approving a reviewed revision before publication takes effect when
the curator publishes it.

## What makes an approval stop counting

| Event | Effect |
| --- | --- |
| The curator unpublishes the avatar | It leaves every game's catalogue and its files stop being served, at once |
| A new revision is published | Existing game releases stay available until each game approves an update |
| The creator withdraws the selected submission | It leaves that game's catalogue; older approvals do not reappear automatically |
| The creator's account is deleted | Avatars, renditions, submissions and game links go with it |

Registry discovery and new downloads enforce withdrawal immediately. Omoba re-checks
its catalogue on a new admission when its five-minute cache has expired; it does not
replace an avatar in an already running match. An outage preserves the last complete
catalogue. Downloaded bytes cannot be recalled.

## Where the wallet fits

An avatar that started as an on-chain template follows the same steps 3 to 6. It differs
in one thing: wearing it needs proof of ownership, which the wallet layer provides as a
one-use ticket. See [Avatar Passport](../protocol/avatar-passport).
