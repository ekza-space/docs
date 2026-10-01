---
title: Repositories and data ownership
---

# Repositories and data ownership

This is the maintained entry point for the Ekza ecosystem as of 2026-10-01.
Component code and migrations remain in their owning repositories. The umbrella
`git/ekza` directory is not itself a Git repository. Its September workspace
snapshots in this repository are historical, not current deployment state.

## Services and consumers

```text
Creator -> Studio web -> Registry API -> Supabase Auth / Studio / commerce
                              |
                    isolated model processors
                              |
                  approved project renditions
                              |
                  SDK -> OMOBA / Space / Mirror

Space <-> realtime server -> room layout JSON files
OMOBA <-> game server / Account API -> game PostgreSQL
```

The diagram describes component responsibilities. It is not evidence that the
whole public flow is deployed. See [demo readiness](../developers/demo-readiness.md).

| Repository | Responsibility | Data definitions |
| --- | --- | --- |
| [ekza-registry](https://github.com/ekza-space/ekza-registry) | Studio frontend (`web`), API (`backend`), workers | `supabase/migrations`, `backend/app/domain`, API request/response models |
| [core](https://github.com/ekza-space/core) | Browser Ekza Space | `src/features/ekza`, `src/realtime/protocol.ts` |
| [ekza-rust-server](https://github.com/ekza-space/ekza-rust-server) | Presence, movement, rooms, account/avatar verification | `src/realtime`, `src/store.rs` |
| [ekza-bevy-sdk](https://github.com/ekza-space/ekza-bevy-sdk) | Rust/Bevy catalogue, verified downloads and account connections | `src/catalog.rs`, `src/registry.rs`, `src/account.rs`, `src/store.rs` |
| [ekza-stellar-sdk](https://github.com/ekza-space/ekza-stellar-sdk) | Web SDK; historical repository name | `src/catalog`, `src/passport` |
| [ekza-avatar-renderer](https://github.com/ekza-space/ekza-avatar-renderer) | Shared browser VRM/GLB renderer | Renderer package API |
| [ekza-mirror](https://github.com/ekza-space/ekza-mirror) | Native iOS AR consumer | Swift models and clients; backend belongs to Registry |
| [omoba-bevy](https://github.com/o-moba/omoba-bevy) | Desktop/mobile game and authoritative servers | `career-store/migrations/postgres`, `account-api/migrations`, shared game protocol |
| [omoba-web](https://github.com/o-moba/omoba-web) | Player portal | Omoba Account API contracts |
| [doc](https://github.com/ekza-space/docs) | Architecture entry point and integration documentation | Links to owning repositories, not duplicate editable SQL |

The optional Solana repositories retain their own on-chain account definitions.
Free Studio avatar publication does not require a wallet or NFT mint.

## Real storage

The hosted Supabase project **Ekza-Space** (`snrjxwutqxokeujuiepn`, Free,
Wotori Studio organization) was renamed from Wotori without changing its project
reference or replacing existing data. It is one PostgreSQL database with SQL
schemas, not one database per app:

- `studio`: profiles, avatars, revisions, renditions, projects, approvals, selected
  project releases, grants, account links and saved libraries.
- `commerce`: commerce records; table availability does not mean payments are live.
- `public`: existing landing subscriptions/analytics and server RPC entry points.
- `auth`: Supabase-managed identities and sessions.
- `storage`: Storage metadata. The new private Studio bucket is empty at rollout.

Browse [tables](https://supabase.com/dashboard/project/snrjxwutqxokeujuiepn/editor)
and [schemas](https://supabase.com/dashboard/project/snrjxwutqxokeujuiepn/database/schemas).
The source of Studio schema changes is
[Registry migrations](https://github.com/ekza-space/ekza-registry/tree/main/supabase/migrations).
The three preserved landing migrations are historical records, not a complete
backup of all pre-existing public tables.

Original -> revision -> platform/profile rendition -> project approval -> selected
project release is the central asset lifecycle. Updating an avatar does not
silently replace an older game-approved rendition.

Other stores are separate:

- Existing distributed model files use IPFS. New Studio upload/processing still
  uses Supabase Storage in code; private drafts and IPFS publication need integration.
- Space layout files live at `DATA_DIR/rooms/<id>.json` on the realtime host;
  presence is in process memory. These are not Supabase tables.
- OMOBA career and portal data use their own PostgreSQL connection configured by
  `OMOBA_DATABASE_URL`. This audit did not establish its current production host.
- The deployed legacy Mirror library uses its own server files/SQLite and must be
  preserved when updating Registry.

## Change and evidence policy

Update this map when ownership changes. Update the demo readiness page and the
Registry deployment runbook when deployment changes. Keep SQL migrations in Git
alongside the owning service; never treat `.agent/tasks` logs as the schema source.
Task logs may be local and private. Record their non-secret conclusions in the
owning repository before declaring a release ready.
