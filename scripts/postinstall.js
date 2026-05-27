// Copies the platform-specific @tailwindcss/oxide native binding directly into
// the oxide package directory so that Turbopack's postcss child process can find
// it via a relative path, bypassing pnpm's symlink-based module resolution.
const { platform, arch } = process;
const path = require('path');
const fs = require('fs');

const platformSuffixes = {
  'linux-x64': ['linux-x64-gnu', 'linux-x64-musl'],
  'linux-arm64': ['linux-arm64-gnu', 'linux-arm64-musl'],
  'darwin-x64': ['darwin-x64'],
  'darwin-arm64': ['darwin-arm64'],
  'win32-x64': ['win32-x64-msvc'],
  'win32-arm64': ['win32-arm64-msvc'],
};

const suffixes = platformSuffixes[`${platform}-${arch}`];
if (!suffixes) process.exit(0);

const pnpmDir = path.join(process.cwd(), 'node_modules', '.pnpm');
if (!fs.existsSync(pnpmDir)) process.exit(0);

const entries = fs.readdirSync(pnpmDir);

const oxidePkgDir = entries
  .filter(d => /^@tailwindcss\+oxide@\d/.test(d))
  .map(d => path.join(pnpmDir, d, 'node_modules', '@tailwindcss', 'oxide'))
  .find(d => fs.existsSync(d));

if (!oxidePkgDir) process.exit(0);

for (const suffix of suffixes) {
  const bindingPkgDir = entries
    .filter(d => new RegExp(`^@tailwindcss\\+oxide-${suffix}@\\d`).test(d))
    .map(d => path.join(pnpmDir, d, 'node_modules', '@tailwindcss', `oxide-${suffix}`))
    .find(d => fs.existsSync(d));

  if (!bindingPkgDir) continue;

  const fileName = `tailwindcss-oxide.${suffix}.node`;
  const src = path.join(bindingPkgDir, fileName);
  const dest = path.join(oxidePkgDir, fileName);

  if (!fs.existsSync(src)) continue;
  if (fs.existsSync(dest)) { console.log(`oxide native binding already in place (${suffix})`); process.exit(0); }

  fs.copyFileSync(src, dest);
  console.log(`postinstall: copied ${fileName} into oxide package`);
  process.exit(0);
}
