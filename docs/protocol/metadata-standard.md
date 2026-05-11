---
title: Metadata Standard
description: Recommended metadata and IPFS manifest standard for Ekza assets, avatars, and Spaces.
---

# Metadata Standard

Ekza stores ownership and compact references on Solana. The actual 3D content,
preview files, license documents, and compatibility data belong in metadata
documents addressed by URI.

Use IPFS or another content-addressed storage layer for production assets.

## Principles

- Do not store 3D files on-chain.
- Keep on-chain records small and verifiable.
- Make every metadata document versioned with a `schema` field.
- Include license data in a machine-readable form.
- Prefer GLB for portable game-ready models with embedded textures.
- Keep previews separate from heavy runtime files.
- Use content-addressed URIs for immutable assets.

## NFT Metadata

Metaplex metadata should point to a JSON document with standard fields and Ekza
extensions:

```json
{
  "name": "Ekza Space #1",
  "symbol": "EKZA",
  "description": "A portable Ekza Space owned on Solana.",
  "image": "ipfs://bafy.../preview.png",
  "animation_url": "ipfs://bafy.../scene.glb",
  "external_url": "https://space.ekza.io/spaces/1",
  "attributes": [
    {"trait_type": "Type", "value": "Space"},
    {"trait_type": "License", "value": "Custom"}
  ],
  "properties": {
    "files": [
      {"uri": "ipfs://bafy.../scene.glb", "type": "model/gltf-binary"},
      {"uri": "ipfs://bafy.../preview.png", "type": "image/png"}
    ],
    "category": "vr"
  },
  "ekza": {
    "schema": "ekza.asset.metadata.v1",
    "passport": "ipfs://bafy.../passport.json"
  }
}
```

## Asset Manifest

For game-ready assets, use a manifest that separates model, preview, animation,
license, and compatibility.

```json
{
  "schema": "ekza.asset.manifest.v1",
  "assetType": "model3d",
  "title": "Modular Sci-Fi Door",
  "description": "A game-ready animated door with baked textures.",
  "author": {
    "wallet": "PUBLIC_KEY",
    "displayName": "Creator"
  },
  "license": {
    "kind": "custom",
    "uri": "ipfs://bafy.../license.md"
  },
  "files": {
    "model": {
      "uri": "ipfs://bafy.../door.glb",
      "format": "glb",
      "sizeBytes": 4281000
    },
    "preview": {
      "uri": "ipfs://bafy.../door-preview.png",
      "format": "png"
    }
  },
  "runtime": {
    "scale": 1,
    "units": "meters",
    "animations": ["open", "close"],
    "colliders": "included"
  },
  "compatibility": {
    "engines": ["bevy", "unity", "threejs"],
    "platforms": ["web", "desktop"]
  }
}
```

## Space Manifest

A Space manifest describes a virtual scene or room.

```json
{
  "schema": "ekza.space.config.v1",
  "name": "Creator Studio",
  "description": "A collaborative room for reviewing avatar assets.",
  "scene": "ipfs://bafy.../studio.glb",
  "spawn": [0, 1.7, 0],
  "assets": [
    {
      "passport": "ipfs://bafy.../asset-passport.json",
      "position": [2, 0, -4],
      "rotation": [0, 180, 0],
      "scale": 1
    }
  ],
  "settings": {
    "open": true,
    "editableByOthers": false
  }
}
```

## Avatar Manifest

```json
{
  "schema": "ekza.avatar.metadata.v1",
  "name": "Ekza Avatar",
  "description": "Portable game-ready avatar.",
  "model": "ipfs://bafy.../avatar.glb",
  "thumbnail": "ipfs://bafy.../avatar.png",
  "rig": {
    "type": "humanoid",
    "standard": "vrm-compatible"
  },
  "traits": [
    {"trait_type": "Class", "value": "Pilot"},
    {"trait_type": "Style", "value": "Sci-Fi"}
  ],
  "license": {
    "kind": "cc-by-4.0",
    "uri": "ipfs://bafy.../license.md"
  }
}
```

## Hashes vs URIs

Some current accounts store `metadata_hash` or `preview_hash`. Product layers
may wrap these as full URIs:

```text
QmAssetHash -> ipfs://QmAssetHash
bafy... -> ipfs://bafy...
```

SDKs should normalize both forms.
