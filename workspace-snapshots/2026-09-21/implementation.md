# Coordinated implementation — 2026-09-21

Changes are on `feature/space-account-migration` in each repository. These are
review branches; no production rollout or shared database migration is implied.
Core uses the exact SDK Git revision below, without a sibling checkout.

| Repository | Commit |
| --- | --- |
| ekza-stellar-sdk | [41882a7](https://github.com/ekza-space/ekza-stellar-sdk/commit/41882a7b85d76cad688ce401b5cbb59ab86fe0bc) |
| ekza-bevy-sdk | [ff87b15](https://github.com/ekza-space/ekza-bevy-sdk/commit/ff87b15ede4d9906102123892c2fcebadb9de303) |
| ekza-registry | [59f086f](https://github.com/ekza-space/ekza-registry/commit/59f086f2406d36d9853f22d62c3d1d0dc9f0fb89) |
| ekza-rust-server | [fe105b2](https://github.com/ekza-space/ekza-rust-server/commit/fe105b2a58f72b1590940f458df70212f1e11913) |
| core | [05d7c70](https://github.com/ekza-space/core/commit/05d7c70c24ca349e436ecbdd56bf8cb7445ea6c1) |

## Verification

During implementation: TypeScript SDK 55 tests; Rust SDK 44 tests (unit,
integration and doctests); Rust server 16 unit tests plus the two-client network
scenario; Registry backend 313 passed / 28 skipped; Studio web 53 passed /
3 skipped; seven SQL suites and a populated-database migration fixture passed.
Earlier stabilization also exercised the real isolated Omoba builder. Full
Supabase Auth/Storage integration tests were not run against shared infrastructure.

After replacing Core's local SDK link with the published Git commit, npm installed
and built the SDK from GitHub; Core typecheck, all 52 tests and Vite build passed.
The renderer used the previously verified build at its unchanged pinned commit;
this is not a claim of a fresh end-to-end install of every dependency.

Browser and network tests used isolated account fixtures. A real Studio consent
roundtrip on staging, Blender/USDZ sandbox image validation, clean renderer package
installation and production rollout remain outstanding. Omoba's SDK dependency
has not been repinned by this change.

See [Space migration and verification](https://github.com/ekza-space/core/blob/feature/space-account-migration/docs/space-account-migration.md)
and [Registry rollout prerequisites](https://github.com/ekza-space/ekza-registry/blob/feature/space-account-migration/docs/stabilization-release.md).
