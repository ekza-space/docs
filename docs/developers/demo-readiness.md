---
title: Studio to OMOBA demo readiness
---

# Studio to OMOBA demo readiness

Status: **2026-10-02 — hosted avatar and weapon route verified on desktop**.
The creator → publication → game-owner approval → OMOBA route passed against the
real Studio API with two independent native clients and a cached relaunch.
The integrated source includes the current combat UI. This does not certify
physical phones or public multiplayer capacity.

Product flow, immutable identities, profiles and code ownership:
[Avatars and handheld weapons](./typed-assets).

## Current rollout evidence

| Component or acceptance | Status as of this snapshot |
| --- | --- |
| Registry/Studio | Application `970c9b6`, deployed |
| Hosted database | Additive `202610010001_typed_assets.sql` applied; migration-file MD5 `9f33391ebf6f89642fbac669a2fe4a92` matches the deployed verification record; 3 existing assets and 1 selected release preserved |
| Local processor | Restarted against the updated Registry checkout |
| Rust SDK | Main `927fc0d`, version 0.8.0; 50 tests passed |
| OMOBA | Main `5aa2fe4`, version 0.34; hosted asset baseline `518f982` retained; public VPS lobby and editable client server presets verified |
| Game tests | Integrated gate: 1,265 passed, 4 ignored (826 client, 304 server, 105 shared, 30 passport) |
| Backend integration checks | Local HTTP: 25 passed, 4 skipped; disposable PostgreSQL: 8 suites passed |
| New hosted weapon | **Passed:** upload, publication, rejection/retry, exact game approval, revoke/reapproval; revoked public GLB returned 404 |
| Two native clients | **Passed:** two empty-cache clients, ordinary weapon picker, animated preview, movement, reciprocal equipped peers; cached relaunch also passed |

The migration checksum records the deployed SQL file. Model content identity uses
SHA-256 and a byte count, independently of that deployment check. Local tests and
a successful deployment do not replace hosted or rendered acceptance.

## Working deployment

- **Studio:** https://studio.ekza.io/studio. Vercel's old Studio URL redirects here.
- API and persistent web BFF run on existing **v357770**, 77.246.105.57, 2 vCPU / 2 GiB. Mirror library, WSS and unrelated services are preserved.
- Studio PostgreSQL/Auth/private Storage: existing Free Supabase **Ekza-Space**, `snrjxwutqxokeujuiepn`.
- OMOBA beta lobby: `77.246.105.57:4000` UDP on the same VPS, at most two worker rooms on UDP41000–41001. Dedicated game PostgreSQL database `omoba` in the existing local PostgreSQL16 instance; game roles and state are separate from Studio. systemd supervises the lobby/worker group with700MiB memory and150% CPU ceilings.
- Processor: operator Mac, real Blender 4.5.14/USDZ and Omoba GLB builder in restricted Docker jobs; Supabase TCP routing through an SSH tunnel avoids the Mac's unreliable VPN path while preserving HTTPS verification.
- Files in this new pilot use **Supabase Storage**. Paid IPFS remains unchanged and is not yet integrated into Studio publication.

Deployment, rollback, worker controls and capacity:
[Registry hosted pilot](https://github.com/ekza-space/ekza-registry/blob/main/deploy/hosted-pilot.md).

## Current weapon pilot

Forge Hammer is original Open Moba geometry, **CC-BY-4.0** with project credits.
The publisher is a technical demo account; it does not replace original attribution.

- Asset: `ekza:weapon:38a9903e-b3ec-4b12-a5f8-83516c77ba8b`.
- Revision: `21f32ab5-6862-4827-97e8-3e983358c33b`.
- OMOBA rendition: `e650737f-5c06-4928-9635-c5fc63ea1ed3`, `desktop / handheld-glb-v1`.
- Exact GLB: **26,180 bytes**, SHA-256 `cb7d098f277b3016e6472f85c1f9178368a0eaa52a811c481a9ffc445622f659`.
- SDK item: `ekza-64a577b6a472c3bacbf809a045c6327d`.
- Submission: `ff36cea6-921f-48f1-8116-29c8c40f9c0f`, restored to **approved** after negative-path checks.

Before approval and after rejection/revocation it was absent from the game feed;
a revoked public download returned 404. Approval restored the exact original bytes.
EYEWizard's existing approved identity and file hash stayed unchanged throughout.
Technical publication and game review were performed through the ordinary Studio
UI; the initial upload and repeated negative-path setup used the authenticated
public Studio API. No database edit granted game approval.

### Try the route

In Studio, upload an Avatar or Weapon with credits, wait for technical publication,
then use **My uploads → Prepare for the game → Submit**. The OMOBA owner uses
**Games → Waiting → Inspect the exact 3D file → Approve for the game**.

In OMOBA: **Home → Avatars → Ekza Studio · Library → Refresh**, select the avatar,
then **Play as this**. Open **Weapons → Refresh**, select the approved weapon and
wait until it is ready. Return and join a game. Avatar tile selection previews it;
**Put on card** changes the profile showcase. Weapon tile selection equips it.
Free approved assets need no wallet. The authoritative server independently checks
both approvals; two clients download and validate their own files.
The native check automates ordinary UI buttons and movement commands. On one Mac,
its coordinator hands real OS focus between the two windows; it does not disable
the game’s focus-loss cancellation or fabricate model/animation state. This is
scripted desktop acceptance, not a manual-input or phone certification.

## Public beta server — 2026-10-02

Fresh0.34 clients default to **77.246.105.57:4000**. Home's server-link button opens the editor: **OMOBA Beta** and **Localhost** prefill the address, which remains manually editable; **Connect** validates, reconnects and saves. Existing custom/local choices remain saved—choose Beta once to move an older installation. Runtime/build overrides remain available; temporary room ports never replace the saved lobby.

A fresh graphical client with no server override completed Home → HeroSelect → Searching → Draft → Loading → InMatch against the real VPS. A separate saved-custom restart verified address priority. Final client tests:829 passed,1 ignored; independent focused verification:44 passed. One English1280×720 desktop UI capture; physical phones remain untested.

[Deployment and rollback](https://github.com/o-moba/omoba-bevy/tree/main/ops/vps) · [Native and two-room evidence](https://github.com/o-moba/omoba-bevy/blob/main/docs/progress/2026-10-02-vps-beta.md).

## Historical avatar baseline — 2026-10-01

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
| Native desktop, English, 1280 × 720 | Hosted SDK avatar rendered in collection and real local UDP match; Run state, movement 0.508 units, loaded forge-sword attached with zero measured transform error |

The SDK slug is
`ekza-fb00f73b815e4d6bfa564a694cdefa0b8b68bf53208e0407b06a6d0fe30b4d2a`.
Historical source and game binaries: OMOBA `1aa9cbe` (0.31.1), SDK `cef1d6a`.
The later native capture rebuilt the client at `67a4592` plus the QA-only
collection-state fix; [capture identity and limitations](https://github.com/o-moba/omoba-bevy/blob/main/docs/progress/2026-10-01-hosted-avatar-smoke.json)
pin the binary and exact rendition. Clip availability is verified, not full playback quality.
The twenty-model local rehearsal is separate; only this one hosted avatar has
completed publication/game approval in this pilot.

Permanent [native evidence and screenshots](https://github.com/o-moba/omoba-bevy/tree/main/docs/progress/2026-10-02-asset-lifecycle) record exact source, binary and rendition identities.

## Remaining acceptance

1. Visual polish: Forge Hammer is large but dominates this small avatar's preview. Rebalance a new asset revision's grip scale/proportions and approve that revision explicitly; do not silently replace reviewed bytes. Base geometry can occlude heroes at the closest camera zoom.
2. Permanent publisher email/account and public signup/confirmation delivery. Technical `.invalid` demo accounts do not prove email delivery.
3. iPhone and Android visuals/performance using the current desktop profile selectors; Mirror USDZ generation alone does not prove ARKit playback.
4. IPFS publication transport with private draft protection and verified content identity. Paid equipment and portable purchase entitlements also remain outside this free-asset rollout.
5. Remaining nineteen avatars. Several original R3 VRMs have unaligned GLB JSON chunks and are rejected by current strict upload validation; normalize/re-export with preserved provenance before bulk import. Do not weaken the parser boundary to claim a bulk pass.
6. Broader VPS capacity testing. Two bot-heavy rooms and third-client capacity waiting passed a30-second external test; p95 snapshot gaps≈88/91ms. Worker RSS≈13MiB each at one observation; this is not a peak/load SLA. Physical players, longer combat and more rooms remain unmeasured.

The operator Mac and Docker must remain awake for queued conversion. Studio and
already published downloads remain served by the VPS while the Mac is offline.

## Source and automated checks

Current typed-route source and checks are pinned in the rollout table above.
Existing unchanged integration baselines: web SDK `41882a7`, Space `acbc034`,
realtime `fe105b2`, Mirror `dfcf430`. Their avatar support does not imply handheld
weapon support.

The historical avatar baseline ran 324 backend tests (29 optional skipped),
backend lint, Studio TypeScript and production build, and 55 Studio tests
(3 optional skipped). Real Docker processing and a live Rust SDK install were
additional integration evidence for that baseline.

Creator instructions and collection provenance:
[OMOBA production avatar runbook](https://github.com/o-moba/omoba-bevy/blob/main/docs/ekza-production-avatars.md).
