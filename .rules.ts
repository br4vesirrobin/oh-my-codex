// This file defines archgate code quality rules for oh-my-codex.
// See https://github.com/r3dlex/ai-sdlc-init for schema documentation.

import { defineRules } from "ai-sdlc-rules";

export const rules = defineRules({
  backend: [
    {
      id: "no-unwrap-in-library",
      severity: "warn",
      description: "Library crates should not panic via .unwrap() on user-controlled paths.",
      pattern: "\\.unwrap\\(\\)",
      message: "Use expect() with a message or propagate the error via ? in library crates.",
    },
    {
      id: "no-panicking-defaults",
      severity: "error",
      description: "Default implementations must never panic on construction.",
      pattern: "Default::default\\(\\)\\s*\\{[^}]*unwrap",
      message: "Default impls must build safe sentinel values; panic only when truly unrecoverable.",
    },
  ],
  frontend: [
    {
      id: "no-untyped-state",
      severity: "warn",
      description: "React state hooks must declare an explicit type parameter.",
      pattern: "useState\\(\\s*[^,)<]+\\s*\\)",
      message: "Prefer useState<Type>(initial) so consumers see the contract.",
    },
  ],
  data: [
    // No data-domain rules — oh-my-codex is a CLI runtime, not a data platform.
  ],
  general: [
    {
      id: "no-silent-expect",
      severity: "warn",
      description: "Bare expect() with no message is discouraged in production paths.",
      pattern: "expect\\(\\s*['\"][^'\"]*['\"]\\s*\\)",
      message: "Pass an explicit message to expect() so failures are debuggable.",
    },
    {
      id: "no-raw-credentials",
      severity: "error",
      description: "No hardcoded credentials or secrets in source code.",
      pattern: "(password|api_key|secret|token)\\s*=\\s*['\"][^'\"]{8,}['\"]",
      message: "Credentials must come from config files or environment variables only.",
    },
  ],
  architecture: [
    {
      id: "no-runtime-mutation-of-config",
      severity: "error",
      description: "Config structs must not be mutated by runtime code paths.",
      pattern: "config\\.[a-z_]+\\s*=\\s*[^=]",
      message: "Config is immutable after load; pass new values as function arguments.",
    },
  ],
});
