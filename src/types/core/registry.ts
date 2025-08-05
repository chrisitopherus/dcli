import { Maybe } from "../utility";
import { LoadedCommand } from "./loader";

export interface CommandFindResult {
    matchedCount: number;
    command?: LoadedCommand;
}