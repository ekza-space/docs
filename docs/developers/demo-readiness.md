---
title: Studio to OMOBA demo readiness
---

# Studio to OMOBA demo readiness

Status date: **2026-10-01**. Integration into main and a passing build are separate
from deployment and a successful public avatar demonstration.

## Integrated source baseline

| Repository | Integrated revision |
| --- | --- |
| Registry / Studio | `23e16d9` |
| Rust/Bevy SDK | `cef1d6a` (includes the previous debug LAN fix and existing main licensing) |
| TypeScript SDK | `41882a7` |
| Space web (`core`) | `acbc034` |
| Realtime server | `fe105b2` |
| Mirror | `dfcf430` |

OMOBA 0.31.1 pins SDK revision `cef1d6ad43e364ad0a116dc7be74122854ee8b7e` for
client and server. Its existing twenty-model collection is a local integration
proof; those models have not been published through the hosted Studio.

## Public deployment gate

- Supabase Ekza-Space has the additive Studio/commerce migrations. Existing public
  landing data was preserved, and the account/API reference did not change.
- Studio frontend: https://ekza-studio.vercel.app/studio (HTTP 200).
- Registry health: HTTP 200; **Studio status, profiles and v2 catalogue: HTTP 404**.
- Backend host SSH is restored: the operator Mac now routes `vds-eternal` through
  Wi-Fi instead of the VPN path that closed SSH. No new API/worker deployment has
  been performed. [Access and capacity report](https://github.com/ekza-space/ekza-registry/blob/main/deploy/ssh-access.md).
- Custom Studio domain, author signup/email delivery, large VRM upload transport,
  production Blender/USDZ worker, IPFS publication and real phone acceptance
  remain pending. Schema initialization does not prove any of those steps.

The maintained operational procedure is
[Registry production rollout](https://github.com/ekza-space/ekza-registry/blob/main/deploy/studio-production.md).

## First public demonstration, in order

1. Operator SSH access is restored. Inspect the existing service,
   persistent volumes and proxy; preserve the legacy Mirror library and WSS.
2. Deploy the integrated API with backend-only Supabase settings. Configure and
   test a digest-pinned isolated processor containing the actual Blender/USDZ
   conversion toolchain. The local rehearsal image is not that production image.
3. Verify Studio readiness, profiles and a complete v2 catalogue; finish Auth and
   large-file upload transport. Reuse paid IPFS for published files while retaining
   private draft handling. Never expose backend credentials to a browser.
4. Provision Open Source Avatars as publisher, a curator and the `omoba` project
   owner. Keep original author, source and license separate from publisher identity.
5. Upload **one original VRM** (pilot: EYEWizard), process and curate it; prepare
   `omoba / desktop / humanoid-glb-v1` and approve it for the game. This selector
   is also used by current iOS/Android OMOBA clients.
6. From a production-configured game, download, preview and equip the approved
   model; verify size/hash and join a match. A second client must see the same
   avatar. Check skeleton, animation, scale, attack facing and hand-held equipment.
7. Check cold download, cached relaunch and withdrawal handling, then repeat for
   the remaining nineteen avatars and run phone visual/performance acceptance.

Detailed creator steps and model provenance:
[OMOBA production avatar runbook](https://github.com/o-moba/omoba-bevy/blob/main/docs/ekza-production-avatars.md).

## Verification boundary

Fresh integration checks passed for Registry Python tests/lint, Studio frontend
TypeScript/tests/build, both SDKs, Space TypeScript/tests/build, realtime Rust
unit tests and portable Mirror Swift suites. OMOBA passport tests (28) and client/server checks passed against the exact SDK pin. The opt-in Studio tests also passed against the isolated local Supabase Auth and Storage, using test-only conversion output. Seven SQL suites and the populated
release migration passed in disposable PostgreSQL. The real Docker sandbox probes
also passed, including the Omoba rendition builder.

Portable Swift checks do not certify ARKit or signed iOS builds. Unit/SQL tests do
not prove a public upload. No successful live publication or phone match is claimed.
