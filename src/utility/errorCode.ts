export enum ErrorCode {
    // Syntax/structure issues

    /**
     * Option key must start with the defined prefix.
     */
    ARG_INVALID_PREFIX,
    /**
     * Option key is empty
     */
    ARG_EMPTY_KEY,
    /**
     * Found a non-option in option context.
     */
    ARG_NONOPT_KEY,
    /**
     * Found 'prefix' with no name.
     */
    ARG_NONAME_KEY,
    /**
     * Invalid shortopt like -foobar.
     */
    ARG_SHORTOPT_TOOLONG,

    // Lookup/validation failures

    /**
     * Option not recognized.
     */
    ARG_UNKNOWN_OPTION,
    /**
     * Subcommand doesn't exist.
     */
    ARG_UNKNOWN_COMMAND,
    /**
     * Same option repeated where not allowed.
     */
    ARG_DUPLICATE_OPTION,

    // Required or missing data

    /**
     * Required arg not set.
     */
    ARG_MISSING_REQUIRED,
    /**
     * Option expected value, got none.
     */
    ARG_MISSING_VALUE,
    /**
     * Got value when it shouldn't have.
     */
    ARG_ENCOUNTERED_UNEXPECTED_VALUE,

    // Type/constraint issues

    /**
     * Parsing to expected type failed.
     */
    ARG_INVALID_TYPE,
    /**
     * Options used together that shouldn't be.
     */
    ARG_CONFLICTING_OPTIONS,
    /**
     * More args than expected.
     */
    ARG_TOO_MANY_POSITIONALS,
    /**
     * Part of a group was missing.
     */
    ARG_INCOMPLETE_OPTION_GROUP,

    // UX-related

    /**
     * Deprecated flag used.
     */
    ARG_DEPRECATED_OPTION
}