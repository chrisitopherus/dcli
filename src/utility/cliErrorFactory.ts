import { CLIError } from "../core/cliError";
import { ErrorCode } from "./errorCode";

export class CLIErrorFactory {
    private constructor() { }

    // Syntax/structure
    public static invalidPrefix(prefix: string): CLIError {
        return new CLIError(`Invalid option prefix: '${prefix}'`, ErrorCode.ARG_INVALID_PREFIX);
    }

    public static emptyKey(): CLIError {
        return new CLIError(`Option key cannot be empty`, ErrorCode.ARG_EMPTY_KEY);
    }

    public static nonOptionKey(key: string): CLIError {
        return new CLIError(`Unexpected non-option key: '${key}'`, ErrorCode.ARG_NONOPT_KEY);
    }

    public static noNameKey(): CLIError {
        return new CLIError(`Expected option name after prefix`, ErrorCode.ARG_NONAME_KEY);
    }

    public static shortOptionTooLong(option: string): CLIError {
        return new CLIError(`Invalid short option: '${option}'. Short options must be a single character`, ErrorCode.ARG_SHORTOPT_TOOLONG);
    }

    // Lookup/validation
    
    public static unknownOption(flag: string): CLIError {
        return new CLIError(`Unknown option: '${flag}'`, ErrorCode.ARG_UNKNOWN_OPTION);
    }

    public static unknownCommand(command: string): CLIError {
        return new CLIError(`Unknown command: '${command}'`, ErrorCode.ARG_UNKNOWN_COMMAND);
    }

    public static duplicateOption(flag: string): CLIError {
        return new CLIError(`Duplicate option: '${flag}'`, ErrorCode.ARG_DUPLICATE_OPTION);
    }

    // Required or missing data

    public static missingArgument(arg: string): CLIError {
        return new CLIError(`Missing required argument: '${arg}'`, ErrorCode.ARG_MISSING_REQUIRED);
    }

    public static missingValueFor(flag: string): CLIError {
        return new CLIError(`Missing value for option: '${flag}'`, ErrorCode.ARG_MISSING_VALUE);
    }

    public static unexpectedValueFor(flag: string): CLIError {
        return new CLIError(`Unexpected value for option: '${flag}'`, ErrorCode.ARG_ENCOUNTERED_UNEXPECTED_VALUE);
    }

    // Type/constraint issues

    public static invalidType(flag: string, expectedType: string): CLIError {
        return new CLIError(`Invalid value for '${flag}'. Expected type: ${expectedType}`, ErrorCode.ARG_INVALID_TYPE);
    }

    public static conflictingOptions(flagA: string, flagB: string): CLIError {
        return new CLIError(`Conflicting options: '${flagA}' and '${flagB}' cannot be used together`, ErrorCode.ARG_CONFLICTING_OPTIONS);
    }

    public static tooManyPositionals(received: number, expected: number): CLIError {
        return new CLIError(`Too many positional arguments: expected ${expected}, but got ${received}`, ErrorCode.ARG_TOO_MANY_POSITIONALS);
    }

    public static incompleteOptionGroup(groupName: string): CLIError {
        return new CLIError(`Incomplete option group '${groupName}': some required options are missing`, ErrorCode.ARG_INCOMPLETE_OPTION_GROUP);
    }

    // UX-related

    public static deprecatedOption(flag: string): CLIError {
        return new CLIError(`Option '${flag}' is deprecated and should not be used`, ErrorCode.ARG_DEPRECATED_OPTION);
    }
}