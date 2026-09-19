---
title: Rendition Profiles
description: How a game tells Ekza what an avatar file must be, and how the game's own builder produces it.
---

# Rendition Profiles

A game does not accept "a GLB". It accepts a file with a particular skeleton, particular
animation clips, a size limit, embedded textures. A **rendition profile** is how a game
says this once, in a form both people and programs can read.

## What a profile is

A profile is a selector, a requirements document and the name of a builder.

| Field | Example | Meaning |
| --- | --- | --- |
| `platform` / `profile` | `desktop` / `humanoid-glb-v1` | The selector games and creators refer to |
| `version` | `1` | Bumped when the requirements change |
| `ownerProjectId` | `omoba` | The game that defined it |
| `acceptedBy` | `["omoba"]` | Games that take renditions of this profile |
| `builder` | `omoba-humanoid-glb` or `none` | What produces the file |
| `format` | `glb` | The file family of the rendition |
| `requirements.source` | VRM 0 or 1, up to 50 MB, humanoid | What the creator's upload must be |
| `requirements.rendition` | binary glTF 2, self-contained, at least one skin with joints, clips `idle, walk, attack, cast, death` | What the file handed to the game must be |

Profiles are public:

```http
GET /v1/profiles
GET /v1/profiles/desktop/humanoid-glb-v1
```

A profile belongs to the protocol, not to one game. If your game can load what
`desktop / humanoid-glb-v1` describes, accept that profile and every avatar already
prepared for it becomes a candidate for your game. You only approve submissions.

## Profiles today

| Selector | Defined by | Builder | In short |
| --- | --- | --- | --- |
| `desktop / humanoid-glb-v1` | Omoba | `omoba-humanoid-glb` | VRM in, GLB out with five retargeted animation clips |
| `universal / vrm-humanoid-v1` | Ekza Space | `none` | The VRM upload is used as it is; the runtime supplies idle and walk |
| `ios / arkit-body-v1` | Ekza Mirror | `arkit-usdz` | VRM in, USDZ out on Apple's 91-joint body skeleton |

## What the creator sees

Before anything is built, Studio asks the registry what stops an upload from becoming a
profile's rendition and shows the answer as a list:

```json
{
  "ok": false,
  "builder": "omoba-humanoid-glb",
  "issues": [
    {"code": "source_format", "message": "The upload must be a VRM model (vrm0, vrm1); it has no VRM metadata."},
    {"code": "source_too_large", "message": "The file is 61.2 MB; the limit is 50 MB."}
  ]
}
```

When the list is empty the creator asks for the rendition, a worker builds it, and the
creator submits it to the game.

## Builders: the game owns its rules

`builder: none` means the upload itself is handed to the game after the same checks.
Any other builder is **a command that lives in the game's repository**. The registry runs
it; the game keeps both its requirements and the code that satisfies them. Connecting a
new game is a profile and a command, not a change to the registry.

The contract is deliberately small:

```text
<command> --source <file> --output-dir <dir>
```

- stdout carries exactly one JSON document;
- exit `0`: `{"ok": true, "format": "glb", "assetPath": "<dir>/<sha256>.glb", "sha256": "...", "sizeBytes": 1885072, "report": {...}}`;
- exit `2`: `{"ok": false, "issues": [{"code": "...", "message": "..."}]}` when the avatar
  cannot become a valid rendition;
- no network access, nothing written outside the output directory, output named by its
  content hash so a repeated build is idempotent.

The registry runs a builder with a minimal environment in a scratch directory that
belongs to one build attempt. Then it verifies the path, the hash and the size and
applies `requirements.rendition` **itself**. A builder is never trusted blindly. A failed
build records a short reason without file system paths, and the creator can ask again.

## Bringing your game to Ekza

1. Decide whether an existing profile fits. If it does, ask for your project to accept it.
2. Otherwise write a requirements document and, if the upload has to be transformed, a
   builder that follows the contract above. Keep both in your repository.
3. Register the project and its owners with the Ekza operator.
4. Read your approved avatars from the catalogue and let your server decide admission.
   See [Game Integration](./game-integration).

Self-service registration of projects and profiles is planned; today an operator adds
them.
