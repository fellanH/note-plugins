# Contributing

Thanks for building an Origin plugin! Here's how to add it to the registry.

## Submission checklist

1. **Fork** this repo on GitHub
2. **Create** `plugins/<your-plugin-id>/plugin.json`
   - Use a reverse-domain ID like `com.yourname.plugin-name`
   - Fill in all required fields (see README for schema)
3. **Validate** locally:
   ```bash
   node scripts/generate-registry.mjs
   ```
   If it prints "Generated registry.json with N plugin(s)" without errors, you're good.
4. **Open a PR** against `main` — CI will run the script and check for errors
5. On merge, the registry is automatically published to GitHub Pages

## Plugin ID guidelines

- Use reverse-domain format: `com.yourname.plugin-name`
- All lowercase, hyphens OK, no spaces
- Must be globally unique — if your ID conflicts with an existing entry, you'll be asked to rename

## Questions?

Open an issue or start a discussion on the [Origin repo](https://github.com/fellanH/origin).
