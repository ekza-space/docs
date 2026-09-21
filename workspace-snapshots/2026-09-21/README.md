# Ekza workspace map

Umbrella folder, not a Git repository. Each entry below is its own repository
(or a worktree of one). Updated 2026-09-21. Repository dates below refer to
commits, not production deployments.

Start with [ARCHITECTURE.md](ARCHITECTURE.md) for the implemented system,
[PLAN-WEB2-FIRST.md](PLAN-WEB2-FIRST.md) for remaining work, and [adr/](adr/)
for decisions. August and early-September strategy notes are historical context;
they do not override those documents.

Repositories sit side by side on purpose: scripts and manifests reference their
neighbours as `../<name>` (`solana-avatars/scripts/avatar-roundtrip.mjs`,
`omoba-bevy/scripts/ekza_demo.py`, `ekza-controll`, Cargo path dependencies in
the Arena stack). Do not nest an active repository into a subfolder without
fixing those references.

## The product today: avatars that work across apps

```text
creator -> Studio (ekza-registry/web) -> Registry + accounts + avatar library
                                          |
                          rendition builders -> game owner approval
                                          |
player -> save avatar -> connect account -> Omoba (Rust/Bevy SDK)
                                          |
                             Space / Mirror migration in progress

optional wallet ownership and tickets -> solana-avatars/app
```

The new account-first loop is implemented locally. Public rollout is a separate
step. Publishing a revision preserves each game's selected approved rendition;
see [ADR 0002](adr/0002-approved-revision-continuity.md).

| Repository | Role | Last | Notes |
| --- | --- | --- | --- |
| `solana-avatars` | Optional wallet storefront, passport API and Solana programs | 2026-09-19 | on `main`; Studio moved to Registry |
| `ekza-registry` | Registry, Studio web, accounts, library, profiles and approval | 2026-09-20 | on `main`, origin configured; local stabilization changes dated 2026-09-21 |
| `ekza-mirror` | iOS app | 2026-09-19 | Registry copies removed; independent uncommitted iOS work remains |
| `ekza-bevy-sdk` | Rust SDK: v2 catalogue, verified cache, account and wallet pairing | 2026-09-20 | on `main`; local availability fix pending release |
| `ekza-stellar-sdk` | TypeScript SDK (passport) used by Space | 2026-09-11 | feature branch |
| `core` | Ekza Space web app | 2026-09-11 | on `main`; account-first migration still pending |
| `ekza-avatar-renderer` | `@ekza/avatar-renderer` package | 2026-08-26 | |
| `omoba-bevy` | Omoba game (client, server, shared, passport) | 2026-09-21 | first SDK consumer; demo: `docs/ekza-avatar-demo.md` |
| `ekza-rust-server` | realtime server behind `wss.ekza.io` | 2026-08-26 | |
| `solana-ekza-space` | Spaces program | 2026-08-21 | |
| `omoba-web` | Omoba player portal (Next.js), public at `o-moba/omoba-web` | 2026-09-20 | depends on sibling `omoba-bevy/account-api` |
| `solana-donations` | Donations program + SDK + demo app (for the wotori/ekza landings) | 2026-09-19 | back from `_legacy` on 2026-09-19; not deployed yet |
| `ekza-controll` | Solana localnet/deploy orchestration | 2026-05-13 | references `../solana-stellar`, `../solana-users`, `../solana-avatars` |
| `doc` | Public documentation, including account-first architecture | 2026-09-20 | source of developer-facing contracts |
| `white-papers` | Historical concept papers | — | not the current implementation reference |

## Paused: Arena stack

Focus moved to the avatar marketplace (`EKZA-FOCUS-2026-09-11.md`). Kept
together because the programs depend on each other by path.

| Repository | Role | Last |
| --- | --- | --- |
| `solana-ekza-arena` | Arena + leaderboard programs (heavy: ~10.6 SOL to deploy) | 2026-08-19 |
| `ekza-arena-web` | Arena web client, auto-battler, creator pipeline | 2026-08-26 |
| `solana-stellar` | universes/assets program | 2026-07-23 |
| `ekza-stellar` | Stellar web app (`dev` branch, uncommitted work) | 2026-08-26 |

## Omoba working copies

One checkout: `omoba-bevy`. The old worktrees and clones were merged or removed on
2026-09-19.

| Folder | Kind |
| --- | --- |
| `omoba-bevy-playtest-audit` | **Cargo target dir of `omoba-bevy`** (`.cargo/config.toml`); not a checkout, do not delete while building |

## Legacy: `_legacy/`

Moved on 2026-09-18. Nothing active referenced them; HEAD and uncommitted
files were verified identical before and after the move.

`ekza-bevy` (2022), `cw-stellar` (2023), `NFText` (2023), `EkzaBot`, `ekza-bot`,
`omoba-bevy-archive`, `ekza-server`, `ekza-server-rust-outdated`, `bubblegum`,
`ekza-space-ui` (superseded by `core`), `ekza-radio` (35 uncommitted files),
`cc0-assets-nft`, `landing-archive`,
`solana-ai-tokens` (empty scaffold), `ekza-arena-bevy-archive`.

Moved on 2026-09-20: `solana-omoba-registry`, `solana-arena-registry` (never deployed
registry forks; the second has no commits at all, only untracked files). Paths that
pointed at them were updated: their own `Anchor.toml`, the `solana-stellar` Makefile
default `SOLANA_OMOBA_REGISTRY_DIR`, and `_workspace/ekza-arena.code-workspace`.

`solana-users` (2024) looks legacy but stays in place: `ekza-controll`
references it as `../solana-users`.

Not Ekza: `landing-v2-mobile-beta` (clone of `wotori/landing-v2`), `ppt-engine`.

## Shared infrastructure in this folder

- `agent-lock`, `_workspace/`, `AGENTS.md`, `CLAUDE.md`: cross-agent write leases.
- Strategy notes: `EKZA-FOCUS-2026-09-11.md`, `EKZA-CROSS-INTEGRATION-STRATEGY.md`,
  `AVATAR-INTO-CORE-PLAN.md`, `DEVNET-TEST.md`, `SPACES-LAUNCH-AUDIT.md`,
  `ITEC-DEMO-CONTRACT.md`.

## Known structural debt

1. **Public rollout.** Registry extraction and history migration are complete.
   Production migration, worker sandbox image/configuration and public rehearsal
   remain separate release work; see `ekza-registry/docs/stabilization-release.md`.
2. **Consumers.** Omoba uses the account-first catalogue; Space and Mirror still
   need their migration. The wallet passport remains an optional, separate contract.
3. **Release coordination.** The latest local SDK fix must be committed/released and
   consumers repinned before release. The TypeScript SDK still has its passport
   work on `feature/avatar-passport-roundtrip`.
4. **Disk.** Agents put Cargo target directories inside task folders
   (`omoba-bevy/.agent/tasks/*/cargo*`); 46 GB of them were removed on
   2026-09-18. `omoba-bevy/builds` (about 7 GB of device builds) was kept.
