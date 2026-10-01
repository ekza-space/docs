---
title: Studio to OMOBA demo readiness
---

# Studio to OMOBA demo readiness

Status: **2026-10-01**. The hosted data/processing/game-admission loop has passed.
Native visual acceptance is still pending an unlocked operator Mac; no phone
or public multiplayer capacity claim is made.

## Working deployment

- **Studio:** https://studio.ekza.io/studio. Vercel's old Studio URL redirects here.
- API and persistent web BFF run on existing **v357770**, 77.246.105.57, 2 vCPU / 2 GiB. Mirror library, WSS and unrelated services are preserved.
- PostgreSQL/Auth/private Storage: existing Free Supabase **Ekza-Space**, `snrjxwutqxokeujuiepn`.
- Processor: operator Mac, real Blender 4.5.14/USDZ and Omoba GLB builder in restricted Docker jobs; Supabase TCP routing through an SSH tunnel avoids the Mac's unreliable VPN path while preserving HTTPS verification.
- Files in this new pilot use **Supabase Storage**. Paid IPFS remains unchanged and is not yet integrated into Studio publication.

Deployment, rollback, worker controls and capacity:
[Registry hosted pilot](https://github.com/ekza-space/ekza-registry/blob/main/deploy/hosted-pilot.md).

## Live evidence

Original **EYEWizard**, Polygonal-Mind / 100Avatars R2 / CC0, was uploaded through
the public authenticated Studio BFF, freshly converted on the Mac, reviewed,
published, prepared for Omoba and approved by a separate project-owner account.
Publisher `OpenSourceAvatarsDemo` is a technical pilot account; original author,
license and source URL remain in attribution.

| Stage | Result |
| --- | --- |
| Original VRM upload | 1,888,392 bytes; source SHA `c64c91ecbe86b7be41d54f1765306a23bc5786032af756a917a37511c66ddc9a` |
| Public Studio avatar | `c99325d8-4c89-4245-b7ff-12cfa756ecb6` |
| Published revision | `f1be50c6-98ae-453d-933a-add596ac0e43` |
| Omoba rendition | `cb312c12-7b3c-43e2-a0e0-28ae5363166f`, `desktop / humanoid-glb-v1` |
| GLB | 2,103,820 bytes; SHA `af5a15879488b1859f1a6a3db4516a241eee49320886961487879d04d2861ba1` |
| Real Rust SDK cold install | Passed against `https://registry.ekza.io`; size/hash and game profile verified |
| Actual OMOBA UDP server | Approved avatar admitted; unknown hash rejected |
| Withdraw approval | Public Omoba catalogue became empty; fresh server rejected the previously approved avatar |
| Restore approval | Re-submitted and approved; final catalogue restored |
| Representative larger upload | FireEye, 10,054,644 bytes, accepted as a private draft; not published |
| Public browser | Catalogue displays the published avatar and supported games |

The SDK slug is
`ekza-fb00f73b815e4d6bfa564a694cdefa0b8b68bf53208e0407b06a6d0fe30b4d2a`.
Source and game binaries: OMOBA `1aa9cbe` (0.31.1), SDK `cef1d6a`.
The twenty-model local rehearsal is separate; only this one hosted avatar has
completed publication/game approval in this pilot.

## Remaining acceptance

1. On the unlocked Mac: native preview, equip and rendered match; check clips, scale, movement, facing and sword attachment. Then check a second rendered client and cached relaunch.
2. Permanent publisher email/account and public signup/confirmation delivery. Technical `.invalid` demo accounts do not prove email delivery.
3. iPhone and Android visuals/performance using the current `desktop / humanoid-glb-v1` selector; Mirror USDZ generation alone does not prove ARKit playback.
4. IPFS publication transport with private draft protection and verified content identity.
5. Remaining nineteen avatars. Several original R3 VRMs have unaligned GLB JSON chunks and are rejected by current strict upload validation; normalize/re-export with preserved provenance before bulk import. Do not weaken the parser boundary to claim a bulk pass.
6. Optional VPS beta: deploy one headless Omoba room and measure its load. Post-Studio idle memory available was ~1122 MiB; this is headroom, not a certified player count.

The operator Mac and Docker must remain awake for queued conversion. Studio and
already published downloads remain served by the VPS while the Mac is offline.

## Source and automated checks

Registry/Studio deployment fixes are maintained in the Registry repository.
Existing integrated baselines: web SDK `41882a7`, Space `acbc034`, realtime
`fe105b2`, Mirror `dfcf430`. OMOBA pins SDK main `cef1d6a`.

Registry backend: 324 passed, 29 optional tests skipped; lint passed. Studio:
TypeScript and production build passed; 55 tests passed, 3 optional skipped.
Real Docker processing and the live Rust SDK test are additional integration
evidence. Native OMOBA client/server built successfully from `1aa9cbe`.

Creator instructions and collection provenance:
[OMOBA production avatar runbook](https://github.com/o-moba/omoba-bevy/blob/main/docs/ekza-production-avatars.md).
