import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const pluginsDir = join(root, 'plugins')

const plugins = []

for (const id of readdirSync(pluginsDir)) {
  const pluginPath = join(pluginsDir, id, 'plugin.json')
  try {
    const data = JSON.parse(readFileSync(pluginPath, 'utf8'))
    plugins.push(data)
  } catch {
    console.warn(`Skipping ${id}: could not read plugin.json`)
  }
}

const registry = {
  generated: new Date().toISOString(),
  plugins,
}

writeFileSync(join(root, 'registry.json'), JSON.stringify(registry, null, 2) + '\n')
console.log(`Generated registry.json with ${plugins.length} plugin(s)`)
