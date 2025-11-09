export type CharacterClassId = "assassin" | "brawler" | "support" | "tank";
export type FilterId = "all" | CharacterClassId;
export interface Filter {
    id: FilterId,
    name: string,
}

export interface Character {
    id: string,
    name: string,
    class: CharacterClassId,
    level: number,
}

export interface AppState {
    showLocked: boolean;
    filters: Filter[];
    activeFilterId: FilterId;
    characters: Character[];
    lockedCharacterIds: string[];
    activeCharacterId: string;
}

// TODO Any argument typing I need for functions etc.
