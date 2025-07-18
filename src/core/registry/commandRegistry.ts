import { LoadedCommand } from "../../types/core/loader";

/**
 * A registry for storing and resolving CLI commands by name or alias.
 * 
 * The `CommandRegistry` allows you to register hierarchical CLI commands and resolve
 * them from an array of user input tokens.
 */
export class CommandRegistry {
    private commands: LoadedCommand[] = [];

    /**
     * Registers a new top-level command.
     * 
     * `Note`: Nested subcommands should be attached to the command via its `subcommands` property prior to registration.
     * 
     * @param command - The command to register.
     */
    public register(command: LoadedCommand) {
        this.commands.push(command);
    }

    /**
     * Resolves a command from an array of input tokens.
     * 
     * Returns the deepest matching command, or `undefined` if any part of the path fails to resolve.
     * 
     * `Note`: Matching is case-sensitive by default.
     * 
     * @param inputParts - The user input tokens (e.g., `["config", "set"]` or `["cfg", "set"]`).
     * @returns The matched `LoadedCommand`, or `undefined` if no match was found.
     */
    public getCommand(inputParts: string[]) {
        let currentLevel = this.commands;
        let found: LoadedCommand | undefined;

        // Starting with all registered commands (level), we traverse the input parts by resolving each segment to a command.
        // At each resolved command, we set its subcommands as the new level.
        // Stops if no command is found or all input parts were resolved.
        for (const input of inputParts) {
            found = currentLevel.find(
                cmd => cmd.name === input || cmd.aliases.includes(input)
            );

            if (!found) return;
            currentLevel = found.subcommands ?? [];
        }

        return found;
    }
}