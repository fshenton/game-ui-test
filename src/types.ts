export type CharacterClass = "Assassin" | "Brawler" | "Support" | "Tank";
export type FilterName = "All" | CharacterClass;

export interface Filter {
    id: string,
    name: FilterName,
}

export interface Character {
    id: string,
    name: string,
    class: CharacterClass,
    level: number,
}

export interface AppState {
    showLocked: boolean;
    filters: Filter[];
    activeFilterId: string;
    characters: Character[];
    lockedCharacterIds: string[];
    activeCharacterId: string;
}

// TODO Any argument typing I need for functions etc.
