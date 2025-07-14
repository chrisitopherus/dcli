# 📚 CLI Component Reference with Decorators

## 🧭 1. Commands & Subcommands

| Component           | Description                        | CLI Syntax                  | Decorator       |
| ------------------- | ---------------------------------- | --------------------------- | --------------- |
| **Command**         | Top-level verb                     | `cli build`                 | `@Command()`    |
| **Subcommand**      | Nested command under a command     | `cli user add`              | `@Subcommand()` |
| **Default Command** | Executed when no command is passed | `cli`                       | `@Default()`    |
| **Alias**           | Alternative name for a command     | `cli ci` (alias for commit) | `@Alias()`      |
| **Hidden**          | Hidden from help output            | —                           | `@Hidden()`     |

---

## 🎛️ 2. Options / Flags

| Component            | Description                       | CLI Syntax                        | Decorator                                  |
| -------------------- | --------------------------------- | --------------------------------- | ------------------------------------------ |
| **Short Flag**       | Single-letter flag                | `-v`                              | `@Option('-v')` or `@Flag('-v')`           |
| **Long Flag**        | Full-name option                  | `--verbose`                       | `@Option('--verbose')`                     |
| **Flag with Value**  | Option followed by a value        | `--output dist` / `--output=dist` | `@StringOption('--output')`                |
| **Boolean Flag**     | Flag with no value, implies true  | `--force`                         | `@Flag('--force')`                         |
| **Required Option**  | Must be passed by user            | `--key abc123`                    | `@Option('--key', { required: true })`     |
| **Optional Option**  | May be omitted                    | `--format json`                   | `@Option('--format')`                      |
| **Repeating Option** | Can be passed multiple times      | `--tag a --tag b`                 | `@ArrayOption('--tag')`                    |
| **Choice Option**    | Only accepts specific values      | `--mode dev`                      | `@ChoiceOption('--mode', ['dev', 'prod'])` |
| **Option Alias**     | Alternate short/long name         | `-o` as alias for `--output`      | `@Option('-o', { aliasFor: '--output' })`  |
| **Default Value**    | Fallback value if not passed      | —                                 | `@Option('--env', { default: 'dev' })`     |
| **Environment Bind** | Reads value from env var if unset | —                                 | `@EnvVar('CLI_TOKEN')`                     |

---

## 📦 3. Positional Arguments

| Component               | Description                            | CLI Syntax           | Decorator                      |
| ----------------------- | -------------------------------------- | -------------------- | ------------------------------ |
| **Required Positional** | Must be passed                         | `cli build <file>`   | `@Arg(0)`                      |
| **Optional Positional** | May be omitted                         | `cli build [file]`   | `@Arg(0, { required: false })` |
| **Variadic Positional** | Accepts multiple values (must be last) | `cli add <files...>` | `@Arg(1, { variadic: true })`  |

---

## 🌍 4. Global Flags

| Component         | Description               | CLI Syntax        | Decorator         |
| ----------------- | ------------------------- | ----------------- | ----------------- |
| **Help**          | Print help output         | `--help`, `-h`    | (built-in)        |
| **Version**       | Print version info        | `--version`, `-v` | (built-in)        |
| **Global Option** | Available to all commands | `--config path`   | `@GlobalOption()` |

---

## 🛑 5. Miscellaneous

| Component           | Description                         | CLI Syntax     | Decorator        |
| ------------------- | ----------------------------------- | -------------- | ---------------- |
| **Stop Parsing**    | Everything after `--` is positional | `cli -- --raw` | (built-in)       |
| **Hidden Option**   | Hidden from help output             | —              | `@Hidden()`      |
| **Grouped Options** | Mutually required or exclusive      | —              | `@OptionGroup()` |

```
