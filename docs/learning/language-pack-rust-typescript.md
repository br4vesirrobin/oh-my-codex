# Polyglot Language Pack (Rust + TypeScript) — oh-my-codex

Per `r3dlex/skills/ai-sdlc-init/modules/language-packs.md`, this repo uses
**both the Rust and TypeScript packs** in polyglot mode. Each pack runs
independently and failures are attributable to the originating pack.

## Detection evidence

| Pack | Signal | File | Match |
| --- | --- | --- | --- |
| Rust | workspace | `Cargo.toml` | yes (`[workspace]` with 6 crates) |
| Rust | lockfile | `Cargo.lock` | yes (root) |
| TypeScript | manifest | `package.json` | yes (`oh-my-codex` 0.18.9) |
| TypeScript | lockfile | `package-lock.json` | yes (root) |

## Selected local checks (Rust pack)

| Check | Command | Source |
| --- | --- | --- |
| Format | `cargo fmt --all -- --check` | `CONTRIBUTING.md` |
| Lint | `cargo clippy --all-targets -- -D warnings` | `CONTRIBUTING.md` |
| Tests | `cargo test --workspace` | `CONTRIBUTING.md` |

## Selected local checks (TypeScript pack)

| Check | Command | Source |
| --- | --- | --- |
| Lint | `npm run lint` (when script present) | `package.json` scripts |
| Typecheck | `npx tsc --noEmit` (when tsconfig present) | `tsconfig.json` |
| Tests | `npm test` (when script present) | `package.json` scripts |

## CI checks (already present in `.github/workflows/`)

| Job | File | Trigger |
| --- | --- | --- |
| CI | `ci.yml` | push to main / PR |
| PR check | `pr-check.yml` | pull_request |
| Release | `release.yml` | tag |
| Pre-commit (new) | `ci-prek.yml` | push to main / PR |

## Intentionally skipped

- `dotnet ef migrations script` — not applicable (Rust+TS repo)
- `pytest` — not applicable (Rust+TS repo)
- `prek` will only run the rust-fmt/clippy hooks until TypeScript
  tooling (eslint/biome) is detected; we do not silently install
  eslint when it is not present.
- New dependencies — not added; pack reuses existing `cargo` and
  `npm` toolchains.

## Toolchain pin

`Cargo.toml` uses the stable toolchain implicitly. CI installs stable
via `dtolnay/rust-toolchain@stable`. No `rust-toolchain.toml` is
present (stable implied).
