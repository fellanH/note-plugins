# note-plugins

Community plugin registry for [Origin](https://github.com/fellanH/origin) — the extensible desktop dashboard.

The registry is published as a static JSON file via GitHub Pages:

```
https://fellanh.github.io/note-plugins/registry.json
```

## Submitting a plugin

1. Fork this repo
2. Create `plugins/<your-plugin-id>/plugin.json` using the schema below
3. Run `node scripts/generate-registry.mjs` locally to validate
4. Open a pull request — CI regenerates `registry.json` on merge

## plugin.json schema

```json
{
  "id": "com.yourname.plugin-name",
  "name": "My Plugin",
  "description": "Short description of what it does",
  "author": "yourGitHubUsername",
  "version": "1.0.0",
  "icon": "🔌",
  "github": "https://github.com/yourname/your-plugin-repo"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Reverse-domain unique identifier |
| `name` | Yes | Human-readable display name |
| `description` | Yes | One-line description |
| `author` | Yes | GitHub username |
| `version` | Yes | Semver string |
| `icon` | — | Emoji or URL |
| `github` | Yes | Link to source repo |

## Development

```bash
node scripts/generate-registry.mjs
```

Reads all `plugins/*/plugin.json` files and writes `registry.json` at the repo root.
