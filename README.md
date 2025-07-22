# dcli

`dcli` is a lightweight toolkit for building command line interfaces in TypeScript. It uses decorators to describe commands and options so your code stays organised and strongly typed.

## Features

- Declarative commands and subcommands with decorators
- Options, flags and positional arguments
- Global flags such as `--help` and `--version`
- Simple parser with well defined rules

## Installation

```bash
npm install dcli
```

## Quick Example

```ts
import { Command, Flag, Option } from 'dcli'

@Command({ name: 'build', description: 'Compile the project' })
export class BuildCommand {
  @Flag({ name: 'verbose', description: 'Verbose output', aliases: ['v'] })
  verbose!: boolean

  @Option({ name: 'out', description: 'Output directory', type: String })
  out!: string
}
```

## Idea & Motivation

The design follows a clear set of parsing rules. The parser understands positional arguments, named options, flags, subcommands and variadic arguments. Arguments are handled left to right for predictable behaviour.【591852†L7-L18】

The component model maps your code to the CLI. Commands are annotated with decorators such as `@Command()` and may include aliases or be hidden from help output.【80d050†L1-L11】 Options and flags are decorated in a similar fashion, supporting required/optional values, repeating options and choices.【22caaf†L15-L29】

## Pros

- Strongly typed API
- Declarative structure using decorators
- Extensible with subcommands and global options

## Cons

- Requires TypeScript experimental decorators and metadata
- Currently a work in progress with missing functionality
- Some runtime overhead from reflection

## License

MIT License
