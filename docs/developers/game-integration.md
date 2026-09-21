---
title: Game Integration
description: How a game reads approved Ekza avatars, connects a player's account, downloads verified files and decides admission.
---

# Game Integration

An Ekza avatar should be playable, not only collectible. This page is the integration
path for a game. It needs no wallet and no blockchain code. The optional wallet path for
purchased on-chain avatars is at the end.

## The path

1. Accept a [rendition profile](./rendition-profiles), or define your own.
2. Approve submissions in Studio, *Games* view.
3. Read your catalogue.
4. Download and verify the file.
5. Let your **server** decide who may wear what.
6. Optionally connect the player's account to list their own library first.

## 1. Read your catalogue

```http
GET /v2/avatars?project=omoba&platform=desktop&profile=humanoid-glb-v1
```

```json
{
  "schema": "ekza.avatar.catalog.v2",
  "count": 1,
  "items": [{
    "id": "ekza:avatar:2f0c1f0e-7b1a-4c55-9d53-0a6d3c1b9e77",
    "name": "Robert",
    "thumbnailUrl": "https://…/thumbnail",
    "license": {"text": "CC0", "attribution": "…"},
    "creator": {"name": "alice"},
    "origin": {"kind": "studio"},
    "access": "free",
    "renditions": [{
      "platform": "desktop", "profile": "humanoid-glb-v1", "format": "glb",
      "sha256": "…", "sizeBytes": 1885072, "downloadUrl": "https://…/rendition"
    }],
    "projectSupport": [{"projectId": "omoba", "platform": "desktop", "profile": "humanoid-glb-v1", "status": "approved"}]
  }]
}
```

With `project` you receive only what your game approved for that rendition. The response
is never cached. A selected approval can be withdrawn, and a curator can unpublish the
entire avatar. New downloads stop when no active game release authorizes those bytes.
Publishing an update preserves each game's selected rendition until its own approval.

A Studio outage returns **503**, with `Retry-After`; keep the last complete catalogue.
Older servers can return a partial 200 with `X-Studio-Status: unavailable`: treat that
as an error too. Fall back to v1 only when v2 returns 404, never on a dependency outage.
A healthy empty response is different: it must replace stale approvals.

Without the project filter, an avatar ID can occur in multiple revision records because
games may have selected different bytes. Keep each record's `origin.revisionId`,
renditions and `projectSupport` together; never merge approvals by avatar ID alone.

`origin.kind` is `studio` for avatars published through Ekza Studio and `solana` for
on-chain templates. `access` tells you what proof wearing it needs:

| `access` | Proof |
| --- | --- |
| `free` | None. Anyone may wear it. |
| `owned` | A one-use ticket from the wallet layer, consumed by your server. |

Treat a missing or unknown value as `owned`.

## 2. Download and verify

Download `downloadUrl`, then check the byte length against `sizeBytes` and the SHA-256
against `sha256` before the file reaches your loader. Run your own profile check as well.
The SDK does all three and installs the file only if they pass.

## 3. The slug, and who decides admission

What a player selects travels on the wire as a slug:

```text
ekza-<sha256( id + "\n" + rendition.sha256 )>
```

It pins the identity **and** the exact bytes, so two avatars sharing geometry never
collapse into one, and a new revision is a new slug. Every client and your server derive
the same value from public catalogue data.

The rule that matters:

> A client can never declare an avatar free or owned. Your server reads the catalogue
> itself.

A minimal server policy:

- a slug your server found in its own catalogue read with `access: "free"`: admit;
- a slug with `access: "owned"`: admit only with a consumed wallet ticket for exactly
  that rendition;
- anything else: refuse.

Omoba does this off the game tick: an unknown slug triggers one catalogue read on a
worker thread. On a new admission a known avatar is re-checked when the five-minute
catalogue cache has expired. This is not a background replacement of avatars in running
matches. Unknown slugs can trigger a read at most every ten seconds, and a registry
outage keeps the last successful catalogue.

## 4. Connect the player's account (optional)

Without it, a player sees every free avatar your game approved. With it, they see their
own library first. The flow is a device code, so it works in a native game with no
embedded browser:

```http
POST /v1/account/device            {"projectId": "omoba"}
→ {"deviceCode": "<secret>", "userCode": "E9QCAG9V",
   "verificationUrl": "https://<studio>/studio?view=connect&code=E9QCAG9V",
   "expiresAt": "…", "interval": 3}
```

Show `userCode` and open `verificationUrl`. The player signs in to Studio and confirms;
the page names your game and says what it will be able to see.

```http
POST /v1/account/device/poll       {"deviceCode": "<secret>"}
→ {"status": "pending"}  …then once…
→ {"status": "approved", "accessToken": "<secret>", "account": {"username": "…"}, "projectId": "omoba"}

GET /v1/account/library            Authorization: Bearer <accessToken>
→ {"schema": "ekza.account.library.v1", "account": {…}, "items": [ …same shape as /v2/avatars… ]}
```

The library holds published avatars, approved for **your** game, that the account saved
or created. Poll it again to pick up an avatar the player saved in the browser.

What the token is and is not:

- it reads one library for one game, and nothing else;
- it is not a Studio session, and a Studio session is not a game token;
- a code works once and expires in ten minutes; a token lasts thirty days and the player
  can disconnect your game under *Account*;
- **it grants nothing.** Admission stays your server's decision (step 3), so a guest and
  a connected player can wear exactly the same avatars.

## With the Bevy SDK

```rust
use ekza_bevy_sdk::{
    account::{AccountClient, AccountFlow},
    passport::{SupportSelector, pairing::PairingState},
    store::AvatarStore,
};

let selector = SupportSelector::new("my-game", "desktop", "humanoid-glb-v1", &["glb"]);

// Catalogue, verified install, offline copy.
let store = AvatarStore::new(root, "https://registry.ekza.io", selector.clone())?;
for item in store.refresh()? {
    // item.slug, item.name, item.free, item.protected (identity + exact rendition)
    // Size, SHA-256 and the GLB envelope are checked before your own check runs.
    let path = store.install(&item, |bytes| my_profile_check(bytes))?;
}

// Account connection, off the game loop.
let flow = AccountFlow::start(AccountClient::new("https://registry.ekza.io", "my-game")?, selector);
match flow.state() {
    PairingState::AwaitingApproval { user_code, verification_url, .. } => { /* show both */ }
    PairingState::Connected => { let session = flow.take_session(); /* session.items */ }
    _ => {}
}
```

See [SDK Overview](./sdk-overview).

## The wallet path (optional)

On-chain avatar templates are listed with `origin.kind: "solana"` and `access: "owned"`.
A player pairs a wallet with the same kind of device flow against the wallet storefront,
the game requests a sixty-second ticket bound to the project, the game session and the
exact rendition, and the game **server** consumes it. Replay, expiry, a transferred NFT
and a withdrawn approval all fail closed. See [Avatar Passport](../protocol/avatar-passport).

## What Omoba demonstrates

Omoba is the first consumer, not the whole project. Today it shows:

- shipped avatars, free community avatars from Studio, the connected account's library,
  and purchased on-chain avatars side by side in one picker;
- the server deciding admission from its own catalogue read;
- a second player downloading the first player's avatar on demand, verified, with a
  fallback model until it is ready;
- the game owning its rendition builder.
