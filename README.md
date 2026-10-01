# Ekza Space Docs

Docusaurus documentation and architecture entry point for Ekza Space: portable
3D assets, Studio, SDKs and applications, with an optional Solana ownership layer.

Start with [repositories and data ownership](docs/core-concepts/ecosystem-map.md)
and [Studio to OMOBA demo readiness](docs/developers/demo-readiness.md).

## Commands

```bash
pnpm install
pnpm start
pnpm run build
pnpm run typecheck
```

## Source Protocol Repositories

- `/Users/wotori/git/ekza/solana-stellar`
- `/Users/wotori/git/ekza/solana-avatars`
- `/Users/wotori/git/ekza/solana-ekza-space`

## Deployment

The site is live at <https://docs.ekza.io>. Vercel builds and publishes every push to
`main`; other branches get a preview deployment. There is no manual deploy step.
