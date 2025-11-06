import type {
    AppState
} from "./types";

import { CHARACTERS } from "./data/characters";
import { FILTERS } from "./data/filters";

export function initialiseState(): AppState {
    return {
        filters: FILTERS,
        activeFilterId: "all",
        showLocked: true,
        characters: CHARACTERS,
        lockedCharacterIds: ["djura", "maria", "oldhunter"],
        activeCharacterId: "adrian"
    };
}

// TODO state functionality (toggling locked, referencing and updating active ids)
