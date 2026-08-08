const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const srcRoot = path.join(root, 'src')
const tokenPath = path.join(srcRoot, 'styles', 'tokens.css')
const providerPath = path.join(srcRoot, 'shared', 'theme', 'theme-provider.tsx')
const contextPath = path.join(srcRoot, 'shared', 'theme', 'theme-context.ts')
const receiptPath = path.join(srcRoot, 'shared', 'ui', 'receipt.tsx')

const failures = []

function fail(message) {
  failures.push(message)
}

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    fail('File wajib tidak ditemukan: ' + path.relative(root, filePath))
    return ''
  }

  return fs.readFileSync(filePath, 'utf8')
}

function collectFiles(directory, extensions) {
  if (!fs.existsSync(directory)) {
    return []
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectFiles(absolutePath, extensions)
    }

    return extensions.has(path.extname(entry.name)) ? [absolutePath] : []
  })
}

function extractThemeBlock(source, theme) {
  const pattern =
    theme === 'light'
      ? /:root\s*,\s*\[data-theme\s*=\s*(['"])light\1\]\s*\{([\s\S]*?)\}/m
      : /\[data-theme\s*=\s*(['"])dark\1\]\s*\{([\s\S]*?)\}/m
  const match = source.match(pattern)

  if (!match) {
    fail('Blok token tema tidak ditemukan: ' + theme)
    return ''
  }

  return match[2]
}

function extractVariables(block) {
  const variables = new Map()

  for (const match of block.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    variables.set(match[1], match[2].trim())
  }

  return variables
}

const tokens = readRequired(tokenPath)
const provider = readRequired(providerPath)
const context = readRequired(contextPath)
const receipt = readRequired(receiptPath)

const lightVariables = extractVariables(extractThemeBlock(tokens, 'light'))
const darkVariables = extractVariables(extractThemeBlock(tokens, 'dark'))

const missingFromDark = [...lightVariables.keys()].filter(
  (name) => !darkVariables.has(name),
)
const missingFromLight = [...darkVariables.keys()].filter(
  (name) => !lightVariables.has(name),
)

if (missingFromDark.length > 0) {
  fail(
    'Token light yang tidak memiliki pasangan dark: ' +
      missingFromDark.join(', '),
  )
}

if (missingFromLight.length > 0) {
  fail(
    'Token dark yang tidak memiliki pasangan light: ' +
      missingFromLight.join(', '),
  )
}

const requiredSemanticTokens = [
  'color-background',
  'color-surface',
  'color-surface-subtle',
  'color-surface-raised',
  'color-text',
  'color-text-muted',
  'color-border',
  'color-primary',
  'color-primary-foreground',
  'color-success',
  'color-warning',
  'color-danger',
  'color-info',
  'color-overlay',
  'color-print-surface',
  'color-print-text',
  'shadow-sm',
  'shadow-md',
  'focus-ring-color',
  'focus-ring',
]

for (const token of requiredSemanticTokens) {
  if (!lightVariables.has(token)) {
    fail('Token semantic wajib tidak ditemukan pada tema light: --' + token)
  }

  if (!darkVariables.has(token)) {
    fail('Token semantic wajib tidak ditemukan pada tema dark: --' + token)
  }
}

const identityTokens = [
  'color-background',
  'color-surface',
  'color-text',
  'color-primary',
]

for (const token of identityTokens) {
  if (
    lightVariables.has(token) &&
    lightVariables.get(token) === darkVariables.get(token)
  ) {
    fail(
      'Token identitas tema harus memiliki nilai light/dark berbeda: --' +
        token,
    )
  }
}

if (!/document\.documentElement/.test(provider)) {
  fail('ThemeProvider belum menyinkronkan tema ke document root.')
}

if (!/setAttribute\(\s*['"]data-theme['"]/.test(provider)) {
  fail('ThemeProvider belum memasang atribut data-theme.')
}

if (!/localStorage/.test(context) || !/localStorage/.test(provider)) {
  fail('Theme system belum membaca dan menyimpan preferensi tema.')
}

if (!/matchMedia/.test(context)) {
  fail('Theme context belum menangani preferensi tema sistem.')
}

if (/export\s+(?:const|function)\s+useTheme\b/.test(provider)) {
  fail(
    'useTheme masih diekspor dari theme-provider.tsx dan dapat memicu warning Fast Refresh.',
  )
}

if (!/export\s+(?:const|function)\s+useTheme\b/.test(context)) {
  fail('useTheme tidak ditemukan pada theme-context.ts.')
}

if (!/createContext/.test(context)) {
  fail('Theme context tidak ditemukan pada theme-context.ts.')
}

if (!/receipt-foundation/.test(receipt)) {
  fail('Komponen receipt tidak menggunakan foundation class.')
}

if (/\bbg-white\b|\btext-black\b|\bborder-black(?:\/\d+)?\b/.test(receipt)) {
  fail('Receipt masih menggunakan literal palette Tailwind.')
}

const sourceFiles = collectFiles(
  srcRoot,
  new Set(['.ts', '.tsx', '.js', '.jsx', '.css']),
).filter((filePath) => filePath !== tokenPath)

const forbiddenPatterns = [
  {
    label: 'hex color literal',
    pattern: /#[0-9a-f]{3,8}\b/gi,
  },
  {
    label: 'rgb/hsl color literal',
    pattern: /\b(?:rgb|rgba|hsl|hsla)\s*\(/gi,
  },
  {
    label: 'Tailwind dark variant',
    pattern: /(?:^|\s)dark:[^\s'"]+/g,
  },
  {
    label: 'Tailwind palette literal',
    pattern:
      /\b(?:bg|text|border|ring|outline|shadow|fill|stroke)-(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d{2,3})?(?:\/\d+)?\b/g,
  },
]

for (const filePath of sourceFiles) {
  const source = fs.readFileSync(filePath, 'utf8')
  const relativePath = path.relative(root, filePath)

  for (const rule of forbiddenPatterns) {
    rule.pattern.lastIndex = 0

    if (rule.pattern.test(source)) {
      fail(relativePath + ' mengandung ' + rule.label + '.')
    }
  }

  if (
    /export\s+(?:function|const|class)\s+(?:Light|Dark)[A-Z][A-Za-z0-9_]*/.test(
      source,
    )
  ) {
    fail(
      relativePath +
        ' mengekspor komponen khusus light/dark. Gunakan satu komponen dengan semantic token.',
    )
  }
}

if (failures.length > 0) {
  console.error('\nDual-theme contract FAILED:\n')

  for (const [index, failure] of failures.entries()) {
    console.error(String(index + 1) + '. ' + failure)
  }

  process.exit(1)
}

console.log('Dual-theme contract PASSED')
console.log('- Token light dan dark memiliki kontrak yang sama')
console.log('- ThemeProvider menyinkronkan tema ke document root')
console.log('- Preferensi tersimpan dan mengikuti tema sistem')
console.log('- Theme hook terpisah dari file komponen Fast Refresh')
console.log('- Source UI tidak menggunakan literal palette atau dark: variant')
console.log('- Receipt menggunakan semantic print token')
