---
title: Asset lifecycle source and rollout status
---

# Asset lifecycle source and rollout status

Audit date: **2026-10-06**. GitHub origins were fetched and compared with local
branches/worktrees. All identified avatar/weapon lifecycle source changes are
already included in the corresponding `main` branches. This is a source audit,
not a new end-to-end acceptance run or deployment.

## Source integration

| Repository | Audited main | Responsibility / integrated work |
| --- | --- | --- |
| `ekza-space/ekza-registry` | `90e7850` | Both Studio web and Registry API, migration `202610050001_source_publication.sql`, independent source/game/Mirror queues, source publication without waiting for USDZ, browser weapon-grip preparation |
| `ekza-space/ekza-mirror` | `dfcf430` | Native account connection, avatar library/store and access policy |
| `ekza-space/ekza-bevy-sdk` | `a9a253c` | Verified avatar/weapon downloads, account sessions, typed catalogues and Bevy 0.19.1 integration |
| `ekza-space/ekza-stellar-sdk` | `41882a7` | Web catalogue/account client |
| `ekza-space/core` | `acbc034` | Space account restoration and avatar consumer integration |
| `ekza-space/ekza-avatar-renderer` | `33c417c` | Shared web avatar renderer |
| `o-moba/omoba-bevy` | `2eaa678` | SDK integration, avatar/weapon selection and independent game-server eligibility; 0.44.0 candidate |

OMOBA pins SDK revision `a9a253cba110bcb308a7f81f6dfb5a4b2243f545`.
Registry branch `feat/creator-loop-release` points to its main commit; there is
no missing creator-loop merge. The SDK's older `chore/bevy-0.19` experiment
(`28205ae`) is not an ancestor of main, but the current SDK already includes the
engine migration on top of the later lifecycle/account implementation. Do not
merge that obsolete baseline just to eliminate an unmerged branch name.

No uncommitted lifecycle source was found in the audited primary checkouts or
Registry's creator-loop worktree. Local SDK proof files and unrelated Discord
work in the documentation checkout are not missing runtime features.

## Hosted state differs from source

Read-only inspection of the VPS on this audit date found:

- Registry container: `ekza-registry:assets-970c9b6`, healthy; OCI revision
  `970c9b6dee3b1e9ba05766c9ed75304c9b820393`.
- Studio web container: `ekza-studio-web:assets-970c9b6`, running.
- The older separate Mirror resolver container is running; its running status
  alone does not prove native Mirror compatibility or conversion acceptance.

Thus the latest creator-loop change `90e7850` is **merged but not deployed in
these Studio/API containers**. The October 2 hosted avatar/weapon proof remains
historical evidence of the earlier route. It does not certify the new decoupled
source-publication route. Database migration state and the local worker were not
reverified by this read-only container audit.

## Remaining delivery work

Follow Registry's [creator-loop rollout checklist](https://github.com/ekza-space/ekza-registry/blob/main/docs/creator-loop-release-plan.md)
and [implementation / rollback record](https://github.com/ekza-space/ekza-registry/blob/main/docs/creator-loop-implementation.md):

1. Record current hosted migration/worker state and preserve selected-release
   identities. Apply the additive migration under deployment authorization.
2. Deploy matching API/web and supervised worker queues, then enable validated
   source publication according to the staged rollout. Preserve ready-only Mirror
   selection and existing approved bytes.
3. Repeat the ordinary creator, curator and game-reviewer UI route for a fresh
   avatar and weapon. Terra was requested, but this audit found no evidence that
   Terra completed that hosted route. The latest recorded local UI proof used
   Robert and Forge Hammer.
4. Verify acquisition, equip, peer visibility, animation and cached relaunch on
   an installed physical iPhone and an independently cached desktop client.

The pilot uses Supabase Storage; IPFS publication is still a separate pending
integration. This audit did not modify infrastructure, secrets, database rows,
worker processes or installed mobile applications, and did not run a new game
build. A merge, deployment and physical-device acceptance remain separate states.
