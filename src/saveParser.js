/**
 * Parses .save file text (game-engine style serialization) into a plain JS object.
 * Returns { BlockName: { ... }, ... } e.g. { Save: {...}, Saved_entries: {...} }.
 *
 * @param {string} text - Raw contents of a .save file
 * @returns {Record<string, object>}
 */
export function parseSave(text) {
  const blocks = {}
  const lines = text.split(/\r?\n/)
  let i = 0

  while (i < lines.length) {
    const blockStart = lines[i].match(/^(\S+)\s*\{\s*$/)
    if (!blockStart) {
      i++
      continue
    }
    const blockName = blockStart[1]
    i++
    const block = {}
    while (i < lines.length && lines[i].trim() !== "}") {
      const line = lines[i]
      const assign = line.match(/^\s*([a-zA-Z0-9_.]+)\s*=\s*(.+)\s*$/)
      if (assign) {
        const [, path, rhs] = assign
        const value = parseTypedValue(rhs.trim())
        if (value !== undefined) {
          setByPath(block, path, value)
        }
      }
      i++
    }
    if (i < lines.length && lines[i].trim() === "}") i++
    buildColonNested(block)
    blocks[blockName] = block
  }

  return blocks
}

/**
 * For blocks that have a pairs array (e.g. Saved_entries), build a nested object
 * so that each pair.key is split on ":" and used as a path. E.g. "STATS:DEATH" -> block.STATS.DEATH = pair.value.
 */
function buildColonNested(block) {
  const pairs = block.pairs
  if (!Array.isArray(pairs)) return
  for (const pair of pairs) {
    if (pair == null || typeof pair.key !== "string" || !("value" in pair)) continue
    const pathStr = pair.key.split(":").join(".")
    if (pathStr) setByPath(block, pathStr, pair.value)
    else block[""] = pair.value
  }
}

/**
 * Set a nested value by dot path. Creates objects/arrays as needed.
 * Numeric path segments (e.g. "pairs.0.key") use array indices.
 */
function setByPath(root, path, value) {
  const segments = path.split(".")
  if (segments.length === 1) {
    root[path] = value
    return
  }
  let current = root
  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i]
    const nextSeg = segments[i + 1]
    const nextIsIndex = /^\d+$/.test(nextSeg)
    if (current[seg] === undefined) {
      current[seg] = nextIsIndex ? [] : {}
    }
    if (Array.isArray(current[seg]) && nextIsIndex) {
      const idx = parseInt(nextSeg, 10)
      if (current[seg][idx] === undefined) current[seg][idx] = {}
    }
    current = current[seg]
  }
  current[segments[segments.length - 1]] = value
}

/**
 * Parse the RHS of "path = Type(value)" into a JS value.
 */
function parseTypedValue(rhs) {
  // Flags() or Flags("A") or Flags("A""B")
  const flagsMatch = rhs.match(/^Flags\((.*)\)\s*$/)
  if (flagsMatch) {
    const inner = flagsMatch[1].trim()
    if (!inner) return []
    const parts = inner.match(/"([^"]*)"/g)
    return parts ? parts.map((p) => p.slice(1, -1)).filter(Boolean) : []
  }

  // String("...")
  const stringMatch = rhs.match(/^String\("((?:[^"\\]|\\.)*)"\)\s*$/)
  if (stringMatch) return stringMatch[1].replace(/\\./g, (c) => (c === '\\"' ? '"' : c))

  // Enum_single("...")
  const enumMatch = rhs.match(/^Enum_single\("((?:[^"\\]|\\.)*)"\)\s*$/)
  if (enumMatch) return enumMatch[1].replace(/\\./g, (c) => (c === '\\"' ? '"' : c))

  // bool(true) / bool(false)
  if (rhs === "bool(true)") return true
  if (rhs === "bool(false)") return false

  // Array(n)
  const arrayMatch = rhs.match(/^Array\((\d+)\)\s*$/)
  if (arrayMatch) return Array.from({ length: parseInt(arrayMatch[1], 10) })

  // f32x2(x, y)
  const f32x2Match = rhs.match(/^f32x2\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)\s*$/)
  if (f32x2Match) return [parseFloat(f32x2Match[1]), parseFloat(f32x2Match[2])]

  // f32x3(x, y, z)
  const f32x3Match = rhs.match(/^f32x3\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)\s*$/)
  if (f32x3Match)
    return [
      parseFloat(f32x3Match[1]),
      parseFloat(f32x3Match[2]),
      parseFloat(f32x3Match[3]),
    ]

  // u32, u64, i32, f32, f64
  const numMatch = rhs.match(/^(u32|u64|i32|f32|f64)\(([-\d.]+)\)\s*$/)
  if (numMatch) {
    const n = numMatch[2]
    return numMatch[1].startsWith("i") ? parseInt(n, 10) : parseFloat(n)
  }

  return undefined
}
