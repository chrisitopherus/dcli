# CLI Argument Parsing Rules

This document defines the rules, structure, and conventions for parsing CLI arguments in this tool or framework.

---

## 🎯 Overview

The CLI parser supports:

- **Positional arguments**
- **Named options (with short and long forms)**
- **Flags (boolean switches, short/long)**
- **Subcommands (with optional aliases)**
- **Variadic arguments (must appear last)**
- **End-of-options marker (`--`)**

Arguments are parsed **left to right** with context-aware behavior.

---

## 🧱 Token Types

| Token Type     | Description                                 | Example                      |
|----------------|---------------------------------------------|------------------------------|
| `command`      | Top-level action (can have aliases)         | `build`, `b`, `deploy`, `d`  |
| `subcommand`   | Nested command or action                    | `auth login`                 |
| `option`       | Named argument requiring a value            | `--out dist`, `-o dist`      |
| `flag`         | Named boolean argument (no value)           | `--verbose`, `-v`            |
| `value`        | Argument value, used by option or positional| `dist`, `main.ts`            |
| `variadic`     | One or more arguments, must be last         | `file1 file2 file3`          |

---

## 📐 Structure Guidelines

A typical CLI structure follows this pattern:

```
<command> [subcommand] [positional1] [positional2...] [--option <value>] [--flag] [--]
```

### Examples

```bash
tool build main.ts --out dist --verbose
tool b main.ts -o dist -v
tool auth login --username john --password secret
tool convert image.png --scale 2.0 -- --not-an-option
```

---

## 🧭 Parsing Rules

### 🔁 Order of Arguments

- Mixing positional and named args is allowed
- Named options and flags usually come *after* positionals (recommended)
- Arguments after `--` are treated as positional, even if they start with `--`

### 🔢 Positional Arguments

- Identified by position, not name
- Can appear before or after options
- Prefer placing them before options for clarity

### ✨ Variadic Arguments

- Accept multiple values (e.g., list of files)
- Must be **last positional** in the command signature
- Any tokens after a variadic argument are assumed to be values.

### 🏷️ Named Options

- Start with `--` (long form) or `-` (short form)
- Syntax:
  - `--key value`
  - `--key=value`
  - `-k value`
- Parser must associate the next token as the value if `=` is not used

### ⚑ Flags

- Start with `--` or `-`
- Do **not** expect a value
- Set to `true` when present

### 🛑 End-of-options Marker (`--`)

- Indicates that all following tokens are **positional**, even if they start with `--`

Example:
```bash
tool run -- --fake-flag --actually-a-filename
```

---

## 🔍 Classification Rules

| Token         | Classified As  | Notes                                |
|---------------|----------------|--------------------------------------|
| `--key=value` | option          | Named option with value inline       |
| `--key`       | option or flag  | Depends on context (expecting value?)|
| `-k`          | short option or flag | Same rules as `--key`         |
| `value`       | positional/value| Depends on context                   |
| `--`          | end-of-options  | Switches to positional-only parsing  |

---

## 💡 Recommendations

- Keep positional args first, options and flags second
- Use `--` to explicitly mark end of options
- Avoid ambiguous input like: `tool --option file.txt` unless clearly defined
- For strict parsing, define a known command signature per subcommand

---

## ✅ Supported CLI Patterns

```bash
tool build main.ts --out dist --verbose
tool b main.ts -o dist -v
tool deploy --env prod --verbose
tool convert image1.jpg image2.jpg --format png
tool --help
tool run -- --force --weird-flag
```

---

## 🔧 Parser Behavior Summary

- Parse left-to-right
- Context-sensitive classification
- Tokens after `--` → always positional
- Step resolution is based on token and context
- Commands and subcommands may have aliases
- Options can have long and short forms

---

## 📦 Future Extensions (Optional)

- Short flag grouping: `-abc` = `-a -b -c`
- Environment variable injection: `--from-env $MY_ENV`
- Required vs optional positional arguments
- Configurable command schemas

---
