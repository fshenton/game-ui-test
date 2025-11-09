import type {
    AppState,
    FilterId
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

export function setActiveFilter(state: AppState, filterId: FilterId): AppState {
    return {
        ...state,
        activeFilterId: filterId,
    }
}

export function setActiveCharacter(state: AppState, characterId : string): AppState {
    return {
        ...state,
        activeCharacterId: characterId,
    }
}

export function setShowLocked(state: AppState, isChecked: boolean): AppState {
    return {
        ...state,
        showLocked: isChecked,
    }
}
