import { Maybe } from "../utility";
import { LoadedCommand } from "./loader";

export interface CommandFindResult {
    command: Maybe<LoadedCommand>;
    matchedCount: number;
}