---
title: Avatars and handheld weapons
description: Typed assets, immutable game approvals and the creator-to-player route.
---

# Avatars and handheld weapons

Avatars and weapons share a publication lifecycle. Their file requirements and
runtime behavior stay separate. A weapon is cosmetic equipment in OMOBA; selecting
one does not change damage, abilities, range or inventory stats.

The current rollout and verification status is recorded in [demo readiness](./demo-readiness).

## Creator → reviewer → player

| Person | Action | Result |
| --- | --- | --- |
| Creator | In [Studio](https://studio.ekza.io/studio), choose Upload model, then Avatar or Weapon. Include the license and original credits. | Private draft with stable identity |
| Creator | Upload & submit | Immutable source queued for technical checks; failures stay private |
| Curator | Review the prepared model and usage rights | Public Studio publication, or an actionable rejection |
| Creator | In My uploads, choose a compatible game, prepare its version and submit | Game request tied to exact rendition bytes |
| Game owner | In Games, inspect the request and exact file; approve or decline with a reason | This game selects that rendition, or the creator sees what to fix |
| Player | Open the game's Ekza collection and select the avatar or weapon | Verified download to the user's writable cache; server independently checks eligibility |

Studio publication and game acceptance are independent gates. A pending game
request is not a playable asset. The creator's view refreshes while processing or
review is pending; the game owner's queue refreshes as requests arrive.

A declined or withdrawn request can be submitted again once the exact rendition
is ready and still eligible. The request keeps its history of decisions and
notes. Creators cannot approve their own game requests unless they separately
hold that game's owner role; curator rights do not confer game-owner rights.

## Stable identity and exact bytes

| Kind | Canonical identity | OMOBA profile | Source |
| --- | --- | --- | --- |
| Avatar | `ekza:avatar:<uuid>` | `desktop / humanoid-glb-v1` | Humanoid VRM; prepared GLB with runtime-compatible motion |
| Weapon | `ekza:weapon:<uuid>` | `desktop / handheld-glb-v1` | Static embedded GLB with hand-grip metadata |

Storage retains the `studio.avatars` table name for migration compatibility and
adds `asset_kind`, defaulting old records to `avatar`. Revisions, renditions,
submissions, grants and selected game releases are shared. There is no separate
weapon approval database or independent copy of the publishing workflow.

Publishing a revision does not silently change a game's selected bytes. Its owner
must approve the new rendition. Withdrawing or revoking a selected release hides
it without falling back to an older approval. Unpublishing hides all releases.

## Public contracts

Existing avatar consumers continue using `/v2/avatars`; weapons never appear in
that feed or the legacy avatar/Mirror feeds. Typed consumers use:

```http
GET /v2/assets?kind=weapon&project=omoba&platform=desktop&profile=handheld-glb-v1
```

The response has `schema: "ekza.asset.catalog.v2"`, `count` and `items`. Each
item adds `assetKind` to the existing `id`, `access`, `renditions` and
`projectSupport` contract. Consumers require explicit free access and approval for
their exact project/platform/profile. Unknown kinds do not become avatars.

The Rust SDK's typed asset store shares bounded transport, byte-count/hash checks,
atomic installation and consumer-provided validation with the avatar path. A
complete empty catalogue removes eligibility; an outage preserves the last
successful catalogue. The typed endpoint does not fall back to an avatar feed.
Cache metadata is isolated by Registry origin, asset kind and profile selector;
the installed file is rechecked before use. A cached file alone grants no game
admission.

## Handheld profile v1

The file is a static GLB, at most 8 MiB, with one scene, at most 64 nodes and 16
meshes. Geometry and textures are embedded. Skins, animation tracks and external
resources are unsupported. Required extensions are limited to
`KHR_materials_unlit` and `KHR_texture_transform`.

The attachment is inside the hashed GLB JSON:

```json
{
  "asset": {
    "version": "2.0",
    "extras": {
      "ekza_handheld_v1": {
        "bone": "rightHand",
        "offset": [0, 0, 0],
        "rotation_degrees": [0, 0, 0],
        "scale": 1
      }
    }
  }
}
```

`bone` is `rightHand` or `leftHand`; each offset is within ±0.3 metres, each
rotation within ±360 degrees, and scale within 0.25–2. The grip cannot be edited
separately from the reviewed file. Games map the semantic hand to each compatible
avatar's actual humanoid joints; filenames and bone names are not the contract.

OMOBA's project-authored source models and exporter are in
[`assets-src/weapons`](https://github.com/o-moba/omoba-bevy/tree/main/assets-src/weapons).
The existing handheld slug remains `ekza-` plus the first 32 hexadecimal digits
of SHA-256 over `identity + ":" + renditionHash`; avatar slugs retain their
existing full-length algorithm.

## Runtime responsibilities

The client lists compatible assets and downloads selected files on demand. Models
live in writable per-user storage mounted under `ekza://`. The same storage design
supports mobile, where downloaded equipment must not be written into packaged
application assets; physical phone verification remains pending.
Peers receive an immutable equipment ID, resolve it through their own catalogue
and verify their own download. Gameplay packets cannot provide a URL, grip or
approval claim.

The authoritative game server reads approval metadata independently. It does not
need to download GLBs. An approval for equipment cannot bypass avatar admission.
Withdrawal affects future selections according to the documented refresh policy;
it does not erase downloaded bytes or replace an actor in a running match.

Paid equipment, portable payment entitlements, phone performance certification and
IPFS publication are separate work. A free catalogue entry is not a purchase.

## Code and data ownership

| Repository | Owns | Where to change it |
| --- | --- | --- |
| [ekza-registry](https://github.com/ekza-space/ekza-registry) | Persistent identity, revisions, publication, game requests, decision history and selected releases; Studio UI and processing | `supabase/migrations/202610010001_typed_assets.sql`, shared Studio services, `backend/app/services/handheld.py`; UI in `web/app/routes/studio.tsx`, `web/app/components/games.tsx`, `web/app/lib/studio-assets.ts` |
| [ekza-bevy-sdk](https://github.com/ekza-space/ekza-bevy-sdk) | Typed public DTOs and verified local installation, independent of a game's renderer | `src/assets.rs`, `src/registry.rs` |
| [omoba-bevy](https://github.com/o-moba/omoba-bevy) | Accepted game profiles, model validation, hand attachment, collection/loadout, peer resolution and authoritative admission | `passport/src/weapon_store.rs`, `client/src/held_weapons.rs`, `server/src/passport_admission.rs` |
| [docs](https://github.com/ekza-space/docs) (local `doc/`) | Published contracts, creator route and explicit acceptance boundaries | This guide, [repository/data map](../core-concepts/ecosystem-map), [demo readiness](./demo-readiness) |

SQL migrations are the versioned definition of the hosted database. Supabase
stores the actual records and private files. Neither SDK caches nor an OMOBA
configuration file owns publication or approval. Space and Mirror keep their
existing avatar integrations; this rollout does not add weapon support to them.

New asset kinds should extend this typed contract and add a game validator/profile.
They should reuse publication, immutable revisions and owner approval rather than
copying those workflows into another service.
